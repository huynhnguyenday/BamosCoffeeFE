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
    const onUserActive = () => run();
    const events = ["scroll", "touchstart", "keydown", "mousemove"];

    events.forEach((eventName) =>
      window.addEventListener(eventName, onUserActive, { once: true, passive: true }),
    );
    const timeoutId = window.setTimeout(run, 1800);

    return () => {
      events.forEach((eventName) =>
        window.removeEventListener(eventName, onUserActive),
      );
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div>
      <Suspense fallback={<div className="h-[255px] w-full lg:h-[460px]" />}>
        <BannerSwiper />
      </Suspense>
      <MainSlider />
      {showDeferredSections ? (
        <>
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
