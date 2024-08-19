import axios from "axios";

const BASE_URL = "http://localhost:7000/api/sports";

export const getSports = async (searchQuery = "") => {
  const response = await axios.get(BASE_URL, {
    params: { search: searchQuery },
  });
  return response.data;
};

export const createSport = async (sportData) => {
  const response = await axios.post(`${BASE_URL}/reg`, sportData);
  return response.data;
};

export const updateSport = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteSport = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
