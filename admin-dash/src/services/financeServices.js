const api = "http://localhost:5000/api/finances";
export const fetchFinanceDetailsFromAPI = async () => {
  const response = await fetch(api);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  return data.data;
};

export const addFinance = async (financeDetail) => {
  const response = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(financeDetail),
  });

  if (!response.ok) {
    throw new Error("Error adding finance detail");
  }

  const data = await response.json();
  return data;
};

export const updateFinance = async (id, updatedData) => {
  const response = await fetch(`${api}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Error updating finance detail");
  }

  const data = await response.json();
  return data;
};

export const deleteFinance = async (id) => {
  const response = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting finance detail");
  }
};
