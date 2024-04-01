from pyspark.ml.feature import HashingTF, IDF, Tokenizer
from pyspark.ml.linalg import Vectors
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf, concat_ws
from pyspark.sql.types import DoubleType, FloatType, StringType
import numpy as np
import re

spark = SparkSession.builder.master("yarn").appName("RecommendationSystem").getOrCreate()

df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)

def clean_text(text):
    text = text.lower() # 소문자 변환
    text = re.sub(r'[^\w\s]', "", text) # 특수문자 제거
    return text

# 문자열을 '문서'로 변환하는 전처리 함수
def preprocess(df):
    # 데이터 전처리 로직 (예: 컬럼 병합, 텍스트 정제 등)
    concatenated_df = df.withColumn("document", concat_ws(" ",
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_카테고리"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_색상"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_서브색상"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_기장"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_넥라인"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_옷깃"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_핏"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_소재_"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_디테일_"),
                                                          col("데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_프린트_")))
    # 텍스트 정제 UDF 등록
    clean_text_udf = udf(clean_text, StringType())
    # 텍스트 정제 적용
    processed_df = concatenated_df.withColumn("cleaned_document", clean_text_udf(col("document")))
    return processed_df

# TF-IDF 벡터를 생성하는 함수
def compute_tfidf(df):
    tokenizer = Tokenizer(inputCol="cleaned_document", outputCol="words")
    words_data = tokenizer.transform(df)

    hashing_tf = HashingTF(inputCol="words", outputCol="rawFeatures", numFeatures=20)
    featurized_data = hashing_tf.transform(words_data)

    idf = IDF(inputCol="rawFeatures", outputCol="features")
    idf_model = idf.fit(featurized_data)
    rescaled_data = idf_model.transform(featurized_data)
    return rescaled_data

# 코사인 유사도 계산 함수
def cosine_similarity(x, y):
    return np.dot(x, y) / (np.linalg.norm(x) * np.linalg.norm(y))

cosine_similarity_udf = udf(cosine_similarity, FloatType())

# 데이터 전처리
processed_df = preprocess(spark_df)

# TF-IDF 벡터 계산
tfidf_df = compute_tfidf(processed_df)

user_input_item = {
    "데이터셋 정보_데이터셋 상세설명_라벨링_원피스_카테고리": "드레스",
    "데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_색상": "화이트",
    # 나머지 필드...
}

# 사용자 입력 아이템에 대한 데이터 프레임 생성
user_input_df = spark.createDataFrame([user_input_item])

# 사용자 입력 데이터 전처리 및 TF-IDF 벡터 생성
user_processed_df = preprocess(user_input_df)
user_tfidf_df = compute_tfidf(user_processed_df)

# 사용자 입력 아이템의 벡터 추출
user_item_vector = user_tfidf_df.collect()[0]["features"]

# 모든 아이템에 대해 유사도 계산
similarity_df = tfidf_df.withColumn("cosine_similarity", cosine_similarity_udf(col("features"), Vectors.dense(user_item_vector.toArray())))

# 유사도가 높은 순으로 정렬
recommended_items = similarity_df.orderBy(col("cosine_similarity").desc())

# 상위 N개 아이템 선택
top_n_recommendations = recommended_items.limit(10)