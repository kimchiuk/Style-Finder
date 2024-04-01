from fastapi import APIRouter
from typing import Optional
from data.spark_name import spark



router = APIRouter()


def style_query_data(df, style, sub_style):
    filter_condition = (
        (df["데이터셋 정보_데이터셋 상세설명_라벨링_스타일_0_스타일"] == style)
    )

    if sub_style:
        filter_condition = filter_condition & (
            (df["데이터셋 정보_데이터셋 상세설명_라벨링_스타일_0_서브스타일"] == sub_style)
        )

    filter_condition = df.filter(filter_condition)
    return filter_condition

@router.get("/get_style_recommend/")
async def get_style_item(
    style: str,
    sub_style: Optional[str] = None
):
    df = spark.read.csv("hdfs://localhost:9000/user/ubuntu/fashion/output2.csv", header=True, inferSchema=True)
    result_pd_df = style_query_data(df, style, sub_style)
    return result_pd_df.to_dict(orient="records")
