const API = "http://localhost:5000/api/positions";

export const fetchPositionDetailsFromAPI = async () => {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  // console.log(data.data); // Log the data to inspect its structure
  return data.data;
};

export const registerPosition = async (formData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to register position");
  }

  return response.json();
};
