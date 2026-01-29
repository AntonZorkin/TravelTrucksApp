import { Camper, CamperListItem } from "@/types/trucks";
import axios from "axios";

interface CampersHttpResponse {
  items: CamperListItem[];
  total: number;
}

interface FetchCampersParams {
  page: number;
  limit: number;
  search?: string;
  form?: string;
  [key: string]: string | number | boolean | undefined;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCampers = async (
  params: FetchCampersParams,
): Promise<CampersHttpResponse> => {

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
