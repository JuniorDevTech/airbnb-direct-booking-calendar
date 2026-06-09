import api from "../../../services/api";

export const syncProperty = async (id) => {
  const response = await api.post(`/sync/${id}`);

  return response.data;
};

export const syncAll = async () => {
  const response = await api.post("/sync/all");

  return response.data;
};
