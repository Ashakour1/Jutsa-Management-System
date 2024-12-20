const API = "http://localhost:5000/api/users";

export const LoginUser = async (data) => {
  const response = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error(response.data?.message);
  }

  const result = await response.json();
  return result;
};
