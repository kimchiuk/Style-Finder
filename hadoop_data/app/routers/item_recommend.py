from fastapi import APIRouter
from typing import Optional
from app.main import spark


router = APIRouter()


def item_query_data(df, item, category):
    if item == "상의":
        filter_condition = (
            (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_카테고리"] == category)
        )
    if item == "하의":
        filter_condition = (
            (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_카테고리"] == category)
        )
    if item == "아우터":
        filter_condition = (
            (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_카테고리"] == category)
        )
    if item == "원피스":
        filter_condition = (
            (df["데이터셋 정보_데이터셋 상세설명_라벨링_원피스_0_카테고리"] == category)
        )
    
    filtered_condition = df.filter(filter_condition)
    return filtered_condition


@router.get("/get_category_items/")
async def get_category_items(
    item: str,
    category: Optional[str] = None
):
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    result_pd_df = item_query_data(df, item, category)
    return result_pd_df.to_dict(orient="records")