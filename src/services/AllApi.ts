import { CommonApi } from "./CommonApi"


// Base URL
const Base_Url = "https://ba568fa2e4b8.ngrok-free.app/api/extechnology"



// User API Login
export const Login = async (data: FormData) => {

    return await CommonApi("POST", `${Base_Url}/api/token/`, data, {});

}