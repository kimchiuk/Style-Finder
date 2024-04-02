export interface CoordiContainerDTO extends Coordi {
  _id: string;
}

export interface CoordiReadResponseDTO extends Coordi {
  _id: string;
  userId: string;
}

export interface FeedReadResponseDTO extends Coordi {
  id: string;
}

export interface Coordi {
  outerCloth: string;
  upperBody: string;
  lowerBody: string;
  dress: string;
}

export interface CoordiCloth {
  id: number;
  image: string;
  imageUrl: string;
  part: string;
  categories: string[];
  details: string[];
  textures: string[];
}
