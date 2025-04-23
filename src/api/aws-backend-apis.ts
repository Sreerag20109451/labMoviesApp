import { SignInType } from "../types/interfaces";

export const signIn = async(formdata : FormData) => {


    try {
        const response = await fetch("jbjh", {
          method: 'POST', // HTTP method
          body: formdata, // Send the FormData as the body
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const responseData = await response.json(); // Parse JSON response
        console.log('Response:', responseData); // Handle the response data
    
      } catch (error) {
        console.error('Error:', error); // Handle errors
      }
    };


export const signInTest = async(formdata : SignInType) => {

  console.log(formdata.email);
  
    console.log("Signed In");
}