import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"))
const MoviePage = lazy(() => import("./pages/MoviePage"))
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage"))


function App() {
  return (
    <>
     <Suspense fallback={<></>}>
     <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<>
            <Banner></Banner>
            <HomePage></HomePage>
          </>}></Route>
          <Route path="/:movie_type" element={<MoviePage></MoviePage>}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>
        </Route>
      </Routes>
     </Suspense>
    </>
  );
}

export default App;
