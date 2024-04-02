export interface Favor {
  likeCategories: object;
  closetCategories: object;
  feedStyles: object;
  feedCategories: object;
}

export interface HadoopCloth {
  id: string;
  image: string;
  imageUrl: string;
  style: string; // 시아준수 씨의 직감으로 단일... 하지만 배열일 가능성도 있음
  category: string[];
  color: string[];
}
