import axios from "axios";

const BASE_URL = "http://localhost:5000/api/finances";

export const getFinances = async (searchQuery = "") => {
  const response = await axios.get(BASE_URL, {
    params: { search: searchQuery },
  });
  return response.data;
};

export const getFinanceById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createFinance = async (financeData) => {
  const response = await axios.post(`${BASE_URL}/reg`, financeData);
  if (response.data.success) {
    return response.data;
  } else {
    throw new Error(response.data.message);
  }
};

export const updateFinance = async (id, updatedData) => {
  const response = await axios.put(`${BASE_URL}/update/${id}`, updatedData);
  return response.data;
};

export const deleteFinance = async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete/${id}`);
  return response.data;
};
