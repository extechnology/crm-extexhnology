import { useMutation } from "@tanstack/react-query";
import { Login } from "../AllApi";




// User Login
export const useLogin = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {

            return await Login(data);

        },

        onError: (error) => {

            console.log("Login Error", error);

        }

    })

};