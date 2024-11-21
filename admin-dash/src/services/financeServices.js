export const fetchFinanceDetailsFromAPI = async () => {
  const response = await fetch("http://localhost:5000/api/finances");

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  // console.log(data.data); // Log the data to inspect its structure
  return data.data;
};
