export const fetchFinanceDetailsFromAPI = async () => {
  const response = await fetch("http://localhost:5000/api/finances");

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  return data.data; 
};

export const fetchFinanceByIdAPI = async (id) => {
  const response = await fetch(`http://localhost:5000/api/finances/${id}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch finance record by ID");
  }

  const data = await response.json();
  return data.data || data; 
};

export const addFinance = async (financeData) => {
  const response = await fetch("http://localhost:5000/api/finances/reg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(financeData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add finance record");
  }

  return await response.json();
};

export const updateFinance = async (id, financeData) => {
  const response = await fetch(`http://localhost:5000/api/finances/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(financeData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update finance record");
  }

  return await response.json();
};

export const deleteFinance = async (id) => {
  const response = await fetch(`http://localhost:5000/api/finances/delete/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete finance record");
  }

  return await response.json();
};