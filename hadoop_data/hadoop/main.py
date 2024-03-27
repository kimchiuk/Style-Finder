from typing import Optional
from fastapi import FastAPI
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import pandas as pd

app = FastAPI()


spark = SparkSession.builder \
    .appName("FastAPISparkIntegration") \
    .master("yarn") \
    .getOrCreate()

def outer_query_data(
        outer_category: str,
        outer_color: Optional[str] = None,
        outer_sub_color: Optional[str] = None,
        outer_material: Optional[str] = None,
        outer_detail: Optional[str] = None,
        outer_print: Optional[str] = None,
        outer_length: Optional[str] = None,
        outer_neck_line: Optional[str] = None,
        outer_collar: Optional[str] = None,
        outer_fit: Optional[str] = None,
    ):

    """데이터 조회 함수"""
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    # 소재, 디테일, 프린트 3가지는 for문으로 순회를 해야함 
    filter_condition = (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_카테고리"] == outer_category) 
        
    if outer_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상"] == outer_color) 
    if outer_sub_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_서브색상"] == outer_sub_color) 
    if outer_length:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_기장"] == outer_length) 
    if outer_neck_line:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_넥라인"] == outer_neck_line) 
    if outer_collar:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_옷깃"] == outer_collar) 
    if outer_fit:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_핏"] == outer_fit) 
    
    for attr, user_input in [("소재", outer_material), ("디테일", outer_detail), ("프린트", outer_print)]:
        if user_input:  # 사용자 입력값이 있는 경우
            match_found = False  # 매칭되는 데이터가 있는지 추적
            for i in range(11):  # 가능한 필드 이름 순회
                field_name = f"데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_{attr}_{i}"
                if field_name in df.columns:
                    # 해당 필드가 존재하며 사용자 입력값과 일치하는지 확인
                    filter_condition = filter_condition | (df[field_name] == user_input)
                    match_found = True
            if not match_found:
                return pd.DataFrame()  # 매칭되는 데이터가 없으면 빈 DataFrame 반환

    # 최종 필터링 조건을 적용하여 데이터 필터링
    filtered_df = df.filter(filter_condition).select("데이터셋 정보_파일 번호")

    return filtered_df.toPandas()
    

@app.get("/get_outer_items/")
async def process_and_get_data(category: str):
    """FastAPI 엔드포인트 함수"""
    result_pd_df = outer_query_data(category)
    return result_pd_df.to_dict(orient="records")


def top_query_data(
        top_category: str,
        top_color: Optional[str] = None,
        top_sub_color: Optional[str] = None,
        top_material: Optional[str] = None,
        top_detail: Optional[str] = None,
        top_print: Optional[str] = None,
        top_length: Optional[str] = None,
        top_neck_line: Optional[str] = None,
        top_collar: Optional[str] = None,
        top_fit: Optional[str] = None,
    ):

    """데이터 조회 함수"""
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    # 소재, 디테일, 프린트 3가지는 for문으로 순회를 해야함 
    filter_condition = (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_카테고리"] == top_category) 
        
    if top_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_색상"] == top_color) 
    if top_sub_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_서브색상"] == top_sub_color) 
    if top_length:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_기장"] == top_length) 
    if top_neck_line:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_넥라인"] == top_neck_line) 
    if top_collar:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_옷깃"] == top_collar) 
    if top_fit:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_핏"] == top_fit) 

    for attr, user_input in [("소재", top_material), ("디테일", top_detail), ("프린트", top_print)]:
        if user_input:  # 사용자 입력값이 있는 경우
            match_found = False  # 매칭되는 데이터가 있는지 추적
            for i in range(11):  # 가능한 필드 이름 순회
                field_name = f"데이터셋 정보_데이터셋 상세설명_상의_아우터_0_{attr}_{i}"
                if field_name in df.columns:
                    # 해당 필드가 존재하며 사용자 입력값과 일치하는지 확인
                    filter_condition = filter_condition | (df[field_name] == user_input)
                    match_found = True
            if not match_found:
                return pd.DataFrame()  # 매칭되는 데이터가 없으면 빈 DataFrame 반환

    # 최종 필터링 조건을 적용하여 데이터 필터링
    filtered_df = df.filter(filter_condition).select("데이터셋 정보_파일 번호")

    return filtered_df.toPandas()


@app.get("/get_bottom_items/")
async def process_and_get_data(category: str):
    """FastAPI 엔드포인트 함수"""
    result_pd_df = bottom_query_data(category)
    return result_pd_df.to_dict(orient="records")



def bottom_query_data(
        bottom_category: str,
        bottom_color: Optional[str] = None,
        bottom_sub_color: Optional[str] = None,
        bottom_material: Optional[str] = None,
        bottom_detail: Optional[str] = None,
        bottom_print: Optional[str] = None,
        bottom_length: Optional[str] = None,
        bottom_fit: Optional[str] = None,
    ):

    """데이터 조회 함수"""
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    # 소재, 디테일, 프린트 3가지는 for문으로 순회를 해야함 
    filter_condition = (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_카테고리"] == bottom_category) 
        
    if bottom_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_색상"] == bottom_color) 
    if bottom_sub_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_서브색상"] == bottom_sub_color) 
    if bottom_length:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_기장"] == bottom_length) 
    if bottom_fit:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_핏"] == bottom_fit) 

    for attr, user_input in [("소재", bottom_material), ("디테일", bottom_detail), ("프린트", bottom_print)]:
        if user_input:  # 사용자 입력값이 있는 경우
            match_found = False  # 매칭되는 데이터가 있는지 추적
            for i in range(11):  # 가능한 필드 이름 순회
                field_name = f"데이터셋 정보_데이터셋 상세설명_하의_아우터_0_{attr}_{i}"
                if field_name in df.columns:
                    # 해당 필드가 존재하며 사용자 입력값과 일치하는지 확인
                    filter_condition = filter_condition | (df[field_name] == user_input)
                    match_found = True
            if not match_found:
                return pd.DataFrame()  # 매칭되는 데이터가 없으면 빈 DataFrame 반환

    # 최종 필터링 조건을 적용하여 데이터 필터링
    filtered_df = df.filter(filter_condition).select("데이터셋 정보_파일 번호")

    return filtered_df.toPandas()


@app.get("/get_dress_items/")
async def process_and_get_data(category: str):
    """FastAPI 엔드포인트 함수"""
    result_pd_df = dress_query_data(category)
    return result_pd_df.to_dict(orient="records")



def dress_query_data(
        dress_category: str,
        dress_color: Optional[str] = None,
        dress_sub_color: Optional[str] = None,
        dress_material: Optional[str] = None,
        dress_detail: Optional[str] = None,
        dress_print: Optional[str] = None,
        dress_length: Optional[str] = None,
        dress_neck_line: Optional[str] = None,
        dress_collar: Optional[str] = None,
        dress_fit: Optional[str] = None,
    ):

    """데이터 조회 함수"""
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    # 소재, 디테일, 프린트 3가지는 for문으로 순회를 해야함 
    filter_condition = (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_카테고리"] == dress_category) 
        
    if dress_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_색상"] == dress_color) 
    if dress_sub_color:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_서브색상"] == dress_sub_color) 
    if dress_length:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_기장"] == dress_length) 
    if dress_neck_line:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_넥라인"] == dress_neck_line) 
    if dress_collar:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_옷깃"] == dress_collar) 
    if dress_fit:
        filter_condition = filter_condition & (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_핏"] == dress_fit) 
    
    for attr, user_input in [("소재", dress_material), ("디테일", dress_detail), ("프린트", dress_print)]:
        if user_input:  # 사용자 입력값이 있는 경우
            match_found = False  # 매칭되는 데이터가 있는지 추적
            for i in range(11):  # 가능한 필드 이름 순회
                field_name = f"데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_{attr}_{i}"
                if field_name in df.columns:
                    # 해당 필드가 존재하며 사용자 입력값과 일치하는지 확인
                    filter_condition = filter_condition | (df[field_name] == user_input)
                    match_found = True
            if not match_found:
                return pd.DataFrame()  # 매칭되는 데이터가 없으면 빈 DataFrame 반환

    # 최종 필터링 조건을 적용하여 데이터 필터링
    filtered_df = df.filter(filter_condition).select("데이터셋 정보_파일 번호")

    return filtered_df.toPandas()


@app.on_event("shutdown")
def shutdown_event():
    """애플리케이션 종료 시 SparkSession 종료"""
    spark.stop()
