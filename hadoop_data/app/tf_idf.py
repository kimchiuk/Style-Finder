from pyspark.sql import SparkSession
from pyspark.ml.feature import Tokenizer, HashingTF, IDF, PCA, CountVectorizer
from pyspark.sql.functions import col, concat_ws, array, udf
from pyspark.ml.linalg import Vectors, SparseVector, DenseVector, VectorUDT
from pyspark.sql.types import StringType, DoubleType
from pyspark import Broadcast
from pyspark.sql import functions as F


# Spark 세션 초기화
spark = SparkSession.builder.appName("item-recommendation").getOrCreate()

# 데이터 로드 및 전처리
# 여기서는 'data'가 아이템의 특성을 포함한 DataFrame이라고 가정합니다.
data = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)

# 모든 특성을 하나의 문자열로 결합

data = data.withColumn("상의_특성", concat_ws(" ", col("데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_카테고리"), col("데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_색상"), col("데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_핏")))
data = data.withColumn("하의_특성", concat_ws(" ", col("데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_카테고리"), col("데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_색상"), col("데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_핏")))
data = data.withColumn("아우터_특성", concat_ws(" ", col("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_카테고리"), col("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상"), col("데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_핏")))

data = data.select("데이터셋 정보_파일 번호", "상의_특성", "하의_특성", "아우터_특성")

# TF-IDF 계산
tokenizer = Tokenizer(inputCol="상의_특성", outputCol="words")
words_data = tokenizer.transform(data)
words_data.show(truncate=False)

hashing_tf = HashingTF(inputCol="words", outputCol="rawFeatures")
featurized_data = hashing_tf.transform(words_data)
idf = IDF(inputCol="rawFeatures", outputCol="features")
idf_model = idf.fit(featurized_data)
tfidf_data = idf_model.transform(featurized_data)

tfidf_data.select("데이터셋 정보_파일 번호", "features").show(truncate=False)


