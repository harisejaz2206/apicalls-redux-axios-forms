import axios from "axios";

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      "https:localhost:8081/api/v1/auth/logout"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
