import axios from "axios";

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: {
    thumb: string;
    original: string;
  }[];
}

interface Camper extends CamperListItem {
  form: "fullyIntegrated" | "alcove" |"panelTruck";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  reviews: Review[];
}

interface CampersHttpResponse {
  items: CamperListItem[];
  total: number;
}

interface FetchCampersParams {
  page: number;
  limit: number;
  search?: string;
  form?: "fullyIntegrated" | "alcove" |"panelTruck";
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCampers = async ({
  page,
  limit,
  search,
  form,
}: FetchCampersParams): Promise<CampersHttpResponse> => {
  const params: FetchCampersParams = {
    page,
    limit,
    search,
    form,
  };
  if (form) {
    params.form = form;
  }

  const response = await axios.get<CampersHttpResponse>(`${baseURL}/campers`, {
    params,
  });
  const data = response.data;

  return data;
};

export const fetchCampersById = async (id: string): Promise<Camper> => {
  const response = await axios.get<Camper>(`${baseURL}/campers/${id}`);
  const data = response.data;
  return data;
};
