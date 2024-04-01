from pyspark.sql import SparkSession
from pyspark.ml.feature import RegexTokenizer, CountVectorizer, IDF
from pyspark.ml.linalg import SparseVector
from pyspark.sql.functions import col, concat_ws, array, udf

# Spark 세션 초기화
spark = SparkSession.builder.appName("tfidf-example").getOrCreate()

# 예시 데이터 생성
data = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)


data = data.withColumn("상의_특성", concat_ws(" ", col("데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_카테고리"), col("데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_색상"), col("데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_핏")))
data = data.withColumn("하의_특성", concat_ws(" ", col("데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_카테고리"), col("데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_색상"), col("데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_핏")))
data = data.withColumn("아우터_특성", concat_ws(" ", col("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_카테고리"), col("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상"), col("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_핏")))

data = data.select("데이터셋 정보_파일 번호", "상의_특성", "하의_특성", "아우터_특성")


# inputDF = spark.createDataFrame(data, ["input"])

# RegexTokenizer를 사용하여 문장을 단어로 분리
tokenizer = RegexTokenizer(inputCol="input", outputCol="output", pattern="\\W")
wordsData = tokenizer.transform(data)

# TF 계산
cv = CountVectorizer(inputCol="words", outputCol="rawFeatures")
cvModel = cv.fit(wordsData)
featurizedData = cvModel.transform(wordsData)

# IDF 계산
idf = IDF(inputCol="rawFeatures", outputCol="features")
idfModel = idf.fit(featurizedData)
rescaledData = idfModel.transform(featurizedData)

# 최종 결과 출력
rescaledData.select("features").show(truncate=False)

# 단어와 빈도수 매칭하여 출력
for row in rescaledData.collect():
    vector = row['features']
    if isinstance(vector, SparseVector):
        vector = vector.toDense()
    for idx, value in enumerate(vector):
        if value > 0.0:  # 많이 등장하는 단어 필터링
            print(f"{cvModel.vocabulary[idx]}: {value}")
    print("-----------------")