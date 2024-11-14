import { RouterProvider } from "react-router-dom"
import router from "./router"
import { useEffect } from "react";

function App() {

  window.addEventListener("online",()=>{console.log("online");})
  window.addEventListener("offline",()=>{console.log("offline");})

  useEffect(()=>{
    console.log(navigator.onLine);
  },[])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
