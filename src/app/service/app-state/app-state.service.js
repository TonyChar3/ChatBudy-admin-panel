import axios from "axios";

/**
 * Save the widget new custom style
 */
export const requestSaveWidgetCustomization = async (new_style_obj, user_access) => {
    try{
        await axios.post(
            "https://chatbudy-api.onrender.com/code/save",
            {
              customization_obj: new_style_obj,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_access}`,
              },
            }
        );
    } catch(e){
        console.log(e);
    };
};

/**
 * Remove a visitor from the user list
 */
export const requestVisitorDelete = async (user_hash, visitor_id, user_acess) => {
  try{
    await axios.delete(
      "https://chatbudy-api.onrender.com/visitor/delete-visitor",
      {
        data: {
          user_hash: user_hash,
          visitor_id: visitor_id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_acess}`,
        },
      }
    );
  } catch(e){
    console.log(e);
  };
};

/**
 * Remove the user account
 */
export const requestAccountDelete = async (user_access) => {
  try{
    await axios.delete(
      "https://chatbudy-api.onrender.com/user/remove-profile",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_access}`,
        },
      }
    );
  } catch(e) {
    console.log(e);
  };
};
