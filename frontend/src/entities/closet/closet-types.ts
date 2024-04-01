export interface ClosetUploadResponseDTO {
  category: string[];
  detail: string[];
  texture: string[];
}

export interface ClosetListReadResponseDTO {
  image: string[];
  part: string[];

  categories: string[];
  details: string[];
  textures: string[];
}

export interface Closet {
  id: number;

  image: string;
  category: string;
  details: string;
  textures: string;

  part: string;

  userId: number;
}

export interface Cloth {
  id: number;
  image: string;
  category: string[];
  details: string[];
  textures: string[];
  part: string;
}

export interface HadoopCloth {
  id: string;
  image: string;
  imageUrl: string;
  style: string; // 시아준수 씨의 직감으로 단일... 하지만 배열일 가능성도 있음
  category: string[];
  color: string[];
}
