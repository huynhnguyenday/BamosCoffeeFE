const MainSlider = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-center gap-x-0 lg:flex-row">
      <div className="content mb-8 mt-8 min-h-[210px] px-4 text-[#633c02] lg:ml-32 lg:mt-8 lg:min-h-0">
        <h1 className="animated-title mb-3 text-4xl font-bold lg:text-5xl">
          ĐÔNG ĐẾN GIẢM 30%
        </h1>
        <h2 className="mb-6 font-josefin text-2xl">
          Áp dụng cho học sinh sinh viên
        </h2>
        <a
          href="/menu"
          className="btn-buy rounded-lg bg-[#8f451a] px-6 py-3 font-josefin text-2xl text-white hover:rounded-3xl hover:bg-[#633c02] "
        >
          Mua ngay
        </a>
      </div>
      <div className="image-container mt-4 w-full max-w-[721px] lg:mt-0">
        <picture>
          <source
            type="image/webp"
            srcSet="/hero-bg-540.webp 540w, /hero-bg-768.webp 768w"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 708px"
          />
          <img
            src="/hero-bg-768.webp"
            alt="Background"
            width="768"
            height="576"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 708px"
            className="background-image h-auto w-full"
          />
        </picture>
      </div>
    </div>
  );
};

export default MainSlider;
