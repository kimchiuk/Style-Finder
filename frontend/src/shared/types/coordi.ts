export interface Coordi {
  id: number;
  color: string;

  hair: Cloth;
  top: Cloth;
  bottom: Cloth;
  shoes: Cloth;
}

export interface Coordis {
  coordis: Coordi[];
}

export interface Cloth {
  id: number;
  image: string;
  value: string;
  link: string;
}

export interface Clothes {
  clothes: Cloth[];
}

export interface ClothesList {
  coordi: Coordi;
  clothesList: Clothes[];
}

export interface Keywords {
  keyword: string[];
}
