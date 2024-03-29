from typing import Optional
from fastapi import FastAPI
from routers import color_recommend, item_recommend, style_recommend, test
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import pandas as pd

app = FastAPI()


spark = SparkSession.builder \
    .appName("FastAPISparkIntegration") \
    .master("yarn") \
    .getOrCreate()


app.include_router(color_recommend.router, prefix="/")
app.include_router(item_recommend.router, prefix="/")
app.include_router(style_recommend.router, prefix="/")
app.include_router(test.router, prefix="/")



@app.on_event("shutdown")
def shutdown_event():
    """애플리케이션 종료 시 SparkSession 종료"""
    spark.stop()
