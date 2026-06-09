import api from "../../../services/api";

export const changePassword = async (data) => {
  const response = await api.put("/users/change-password", data);

  return response.data;
};
