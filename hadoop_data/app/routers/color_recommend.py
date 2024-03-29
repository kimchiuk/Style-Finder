from fastapi import APIRouter
from typing import Optional
from app.main import spark


router = APIRouter()


def color_query_data(df, color, sub_color):
    filter_condition = (
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상"] == color) |
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_색상"] == color) |
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_색상"] == color) |
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_드레스_0_색상"] == color)
    )

    if sub_color:
        filter_condition = filter_condition & (
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_아우터_0_색상"] == color) |
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_상의_0_색상"] == color) |
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_하의_0_색상"] == color) |
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_드레스_0_색상"] == color)
    )
    
    filtered_condition = df.filter(filter_condition)
    return filtered_condition


@router.get("/get_color_items/")
async def get_color_items(
    color: str,
    sub_color: Optional[str] = None,
):  
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    result_pd_df = color_query_data(df, color, sub_color)
    return result_pd_df.to_dict(orient="records")

