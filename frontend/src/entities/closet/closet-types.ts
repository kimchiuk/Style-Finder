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
  image: string;
  part: string;
  category: string[];
  details: string[];
  textures: string[];
}

export interface RecommendCloth {
  image: string;
  imageUrl: string;
  style: string;
  category: string;
  color: string;
  part: string;
}
