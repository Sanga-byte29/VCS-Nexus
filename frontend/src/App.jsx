import { Navigate, Route, Routes } from "react-router-dom"
import Sidebar from "./components/sidebar/Sidebar"
import SignUpPage from "./pages/sign-up/SignUpPage"
import ExplorePage from "./pages/explore-page/ExplorePage"
import LikesPage from "./pages/likes-page/LikesPage"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"



function App() {
  const  {authUser,loading} = useAuthContext();
  console.log("Authenticated User: ", authUser);


  if(loading) return null;

  return (
    <>
       <div className="flex">
        <Sidebar />
        <div className="max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate  to="/" />} />
            <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate  to="/" />} />
            <Route path="/explore" element={authUser ? <ExplorePage /> : <Navigate  to="/login" />} />
            <Route path="/likes" element={authUser ? <LikesPage /> : <Navigate  to="/login" />} />
          </Routes>
          <Toaster />
          <footer>Footer</footer>
        </div>
       </div>
    </>
  )
}

export default App
