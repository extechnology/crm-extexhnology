import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import ScrollToTop from "./components/common/ScrollToTop"
import MainLayout from "./components/layout/MainLayout"
import AuthLayout from "./components/layout/AuthLayout"
import SuspenseLoader from "./components/loaders/SuspenseLoader"
import ProtectedAuth from "./routes/ProtectedAuth"





// Lazy loading Pages
const Overview = lazy(() => import("./page/Overview"))
const Projects = lazy(() => import("./page/Projects"))
const Auth = lazy(() => import("./page/Auth"))
const NotFound = lazy(() => import("./page/NotFound"))




function App() {


  return (


    <Suspense fallback={<SuspenseLoader />}>


      {/* Scroll to top */}
      <ScrollToTop />


      <Routes>


        {/* Main Layout */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<ProtectedAuth ><Overview /> </ProtectedAuth>} />

          <Route path="/projects" element={<ProtectedAuth ><Projects /> </ProtectedAuth>} />

        </Route>


        {/* Auth Layout */}
        <Route element={<AuthLayout />}>

          <Route path="/auth" element={<Auth />} />

        </Route>


        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />


      </Routes>


      <Toaster />


    </Suspense>


  )


}


export default App
