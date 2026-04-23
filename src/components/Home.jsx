import { Suspense, lazy } from "react";
import MainSlider from "../components/MainSlider";

const ProductSlider = lazy(() => import("../components/ProductSlider"));
const Benefit = lazy(() => import("../components/Benefit"));
const BlogMain = lazy(() => import("../components/BlogMain"));
const BannerSwiper = lazy(() => import("./website/BannerSwiper"));

const Home = () => {
  return (
    <div>
      <MainSlider />
      <Suspense fallback={<div className="h-[255px] w-full lg:h-[460px]" />}>
        <BannerSwiper />
      </Suspense>
      <Suspense fallback={<div className="h-[350px] w-full" />}>
        <ProductSlider />
      </Suspense>
      <Suspense fallback={<div className="h-[100px] w-full" />}>
        <Benefit />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] w-full" />}>
        <BlogMain />
      </Suspense>
    </div>
  );
};

export default Home;
