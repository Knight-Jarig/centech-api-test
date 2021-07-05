interface ProductRecommendationByUserData {
  item: string[];
}

export interface ProductRecommendationByUserResponse {
  id: number;
  data: ProductRecommendationByUserData[];
}

interface ProductRecommendationBySkuData {
  item: string[];
  code: string;
}

export interface ProductRecommendationBySkuResponse {
  id: number;
  name: string;
  data: ProductRecommendationBySkuData[];
  filler: string[];
}

export interface ProductSimilarBySkuResponse {
  id: number;
  name: string;
  data: ProductRecommendationBySkuData[];
  filler: string[];
}

export interface ProductAssociationViewBySkuResponse {
  id: number;
  name: string;
  data: ProductRecommendationBySkuData[];
  filler: string[];
}
