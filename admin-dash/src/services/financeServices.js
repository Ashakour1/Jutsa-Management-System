export const fetchFinanceDetailsFromAPI = async () => {
  const response = await fetch("http://localhost:5000/api/finances");

  if (!response.ok) {
    throw new Error("Something went wrong from fetch");
  }

  const data = await response.json();
  // console.log(data.data); // Log the data to inspect its structure
  return data.data;
};

export const deleteFinanceDetails = async (id) => {
  const response = await fetch(`http://localhost:5000/api/finances/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong from delete");
  }

  const data = await response.json();
  return data.data;
};

export const createFinance = async (data) => {
  const response = await fetch(
    `http://localhost:5000/api/finances/reg`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      body: JSON.stringify(data), // Convert the data to a JSON string
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const result = response.json();

  // console.log("result" + result);
  return result.data;
};
