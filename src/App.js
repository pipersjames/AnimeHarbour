import { Route, Routes } from "react-router";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Favourites from "./components/Favourites";
// import ApiSearchList from "./components/ApiSearchList"

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          {/* <Route path="/search" element={<Outlet/>}>
            <Route index element={<ApiSearchList/>}/>
            <Route path="search/param" element={Apisearchbox + cards of search}/>
          </Route> */}
            


        </Routes>

    </div>
  )
}

export default App;
