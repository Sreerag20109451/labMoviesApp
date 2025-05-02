import { SignInType, LoginResp } from "../types/interfaces";

export const signIn = async (formdata: SignInType): Promise<LoginResp> => {
  try {
    const response = await fetch("https://60u6cyumw3.execute-api.eu-west-1.amazonaws.com/dev/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formdata.email,
        password: formdata.password
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LoginResp = await response.json();
    console.log("Login successful:", data);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Important: rethrow so the calling function can catch it
  }
};
