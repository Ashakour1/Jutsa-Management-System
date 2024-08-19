import axios from "axios";

const BASE_URL = "http://localhost:7000/api/finances";

export const getFinances = async (searchQuery = "") => {
  const response = await axios.get(BASE_URL, {
    params: { search: searchQuery },
  });
  return response.data;
};

export const createFinance = async (financeData) => {
  const response = await axios.post(`${BASE_URL}/reg`, financeData);
  return response.data;
};

export const updateFinance = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteFinance = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
