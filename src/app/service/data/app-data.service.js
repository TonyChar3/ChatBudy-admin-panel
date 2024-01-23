import axios from "axios";
const host = import.meta.env.VITE_DOMAIN;

/**
 * Authenticate User for the SSE connection
 */
export const requestSseAuthentication = async (user_token) => {
    await axios.get(`${host}/connection/auth-sse`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user_token,
        },
    });
}

/**
 * Fetch the user information
 */
export const requestUserInformation = async (user_id) => {
  try{
      const request = await axios.get(
          `${host}/user/current`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + user_id,
            },
          }
      );

      return request;
  } catch(e) {
      console.log(e);
  };
};

/**
 * Fetch the user widget information
 */
export const requestWidgetInformation = async (user_hash, user_access) => {
  try{
      const request = await axios.get(
          `${host}/code/admin-style-${user_hash}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user_access}`,
            },
          }
      );

      return request;
  } catch(e){
      console.log(e);
  };
};