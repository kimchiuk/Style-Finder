from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("FastAPISparkIntegration") \
    .master("yarn") \
    .getOrCreate()