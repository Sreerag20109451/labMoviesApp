import { SignInType, LoginResp, ReviewAdd } from "../types/interfaces";

export const signIn = async (formdata: SignInType): Promise<LoginResp> => {
  try {
    const response = await fetch("https://ae0qdpiue6.execute-api.eu-west-1.amazonaws.com/dev/auth/login", {
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

export const postReview = async (review: ReviewAdd): Promise<any> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please login.");

  const response = await fetch("https://ae0qdpiue6.execute-api.eu-west-1.amazonaws.com/dev/movies/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to post review: ${error}`);
  }

  return response.json();
};


