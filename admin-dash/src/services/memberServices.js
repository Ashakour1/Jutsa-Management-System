const API = "http://localhost:5000/api/members";

export const fetchMemberDetailsFromAPI = async () => {
    const response = await fetch(API);
  
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  
    const data = await response.json();
    // console.log(data.data); // Log the data to inspect its structure
    return data.data;
  };