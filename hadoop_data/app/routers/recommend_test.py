from typing import Optional
from pyspark.sql import SparkSession
from pyspark.ml import Pipeline
from pyspark.ml.feature import StringIndexer, OneHotEncoder
from pyspark.ml.recommendation import ALS
from pyspark.sql.types import StringType
from fastapi import APIRouter
from data.label_data import csv_top, csv_outer, csv_bottom, csv_dress

router = APIRouter()

# Spark 세션 초기화
spark = SparkSession.builder.master("yarn").appName("RecommendationSystem").getOrCreate()


@router.get("/input_top_item")
async def input_top_item(
    top: str,
    category: Optional[str] = None
):

    # 데이터 로드
    df = spark.read.csv("output2.csv", header=True, inferSchema=True)

    # 필요한 칼럼 남기기

    df = df.select([
        *csv_dress,
        *csv_top,
        *csv_bottom,
        *csv_outer
    ])

    # 문자열 칼럼을 숫자 인덱스로 변환
    indexers = [StringIndexer(inputCol=column, outputCol=column+"_index").fit(df) for column in df.columns if df.schema[column].dataType == StringType()]

    # 원-핫 인코딩 적용
    encoders = [OneHotEncoder(inputCol=indexer.getOutputCol(), outputCol=indexer.getOutputCol()+"_encoded") for indexer in indexers]

    # 파이프라인 정의
    pipeline = Pipeline(stages=indexers + encoders)

    # 파이프라인 적용
    model = pipeline.fit(df)
    encoded_df = model.transform(df)

    # 필요한 경우 데이터셋을 변환하여 'userId', 'itemId', 'rating' 열을 포함하도록 합니다.
    # 예시: 변환 로직 적용

    # 데이터셋 분할 (학습 데이터와 테스트 데이터로)
    (training_data, test_data) = encoded_df.randomSplit([0.8, 0.2])

    # ALS 모델 구성 및 학습
    als = ALS(maxIter=5, regParam=0.01, userCol="userId", itemCol="itemId", ratingCol="rating", coldStartStrategy="drop")
    als_model = als.fit(training_data)

    # 사용자 또는 아이템에 대한 추천 생성
    user_recs = als_model.recommendForAllUsers(10)  # 각 사용자에 대해 상위 10개 아이템 추천
    item_recs = als_model.recommendForAllItems(10)  # 각 아이템에 대해 상위 10개 사용자 추천

