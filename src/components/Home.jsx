import { Suspense, lazy, useEffect, useState } from "react";
import MainSlider from "../components/MainSlider";

const ProductSlider = lazy(() => import("../components/ProductSlider"));
const Benefit = lazy(() => import("../components/Benefit"));
const BlogMain = lazy(() => import("../components/BlogMain"));
const BannerSwiper = lazy(() => import("./website/BannerSwiper"));

const Home = () => {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    const run = () => setShowDeferredSections(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(run, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(run, 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <MainSlider />
      {showDeferredSections ? (
        <>
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
        </>
      ) : null}
    </div>
  );
};

export default Home;
