import { Outlet } from "react-router-dom"




export default function AuthLayout() {


    return (

        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-700 w-full relative overflow-hidden">
            
            <div className="w-full shadow-md rounded-xl">
                <Outlet />
            </div>

        </main>

    )

}
