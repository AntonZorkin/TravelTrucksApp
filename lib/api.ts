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
