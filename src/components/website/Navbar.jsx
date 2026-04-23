import { Suspense, lazy, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import NavbarLink from "./NavbarLink";

const SidebarCart = lazy(() => import("./SidebarCart"));
const SidebarMenu = lazy(() => import("./SidebarMenu"));
const SearchItem = lazy(() => import("./SearchItem"));
const Login = lazy(() => import("./Login"));

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [showInteractiveTools, setShowInteractiveTools] = useState(false);

  const handleCartClick = () => {
    const tempCart = JSON.parse(localStorage.getItem("tempCart")) || [];
    setTotalItems(tempCart.length);
    setCartVisible(!isCartVisible);
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Đồng bộ số lượng giỏ hàng từ localStorage theo sự kiện thay vì poll liên tục.
  useEffect(() => {
    const syncCartCount = () => {
      const tempCart = JSON.parse(localStorage.getItem("tempCart")) || [];
      setTotalItems(tempCart.length);
    };
    const handleVisibility = () => {
      if (!document.hidden) {
        syncCartCount();
      }
    };

    syncCartCount();
    window.addEventListener("storage", syncCartCount);
    window.addEventListener("focus", syncCartCount);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("storage", syncCartCount);
      window.removeEventListener("focus", syncCartCount);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    const run = () => setShowInteractiveTools(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(run, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(run, 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-20 flex h-[80px] items-center justify-between bg-white px-4 py-4 shadow-lg sm:px-8 md:px-16 lg:px-32">
      <a href="/home" className="pl-1 text-2xl font-bold sm:pl-0 sm:text-4xl">
        <span className="text-black">Bamos</span>
        <span className="text-[#c63402]">Coffee</span>
      </a>
      <div className="hidden space-x-6 sm:flex">
        <NavbarLink />
      </div>
      <div className="flex items-center space-x-4">
        {showInteractiveTools ? (
          <Suspense fallback={null}>
            <SearchItem />
            <Login />
          </Suspense>
        ) : null}
        <button
          type="button"
          aria-label="Mở giỏ hàng"
          className="relative cursor-pointer text-2xl text-[#333] transition-all duration-300 hover:text-[#d88453]"
          onClick={handleCartClick}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {totalItems > 0 && (
            <div className="absolute right-[-6px] top-[-6px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#ed4321] text-xs text-white">
              {totalItems}
            </div>
          )}
        </button>
      </div>
      <div className="item flex">
        <div className="flex items-end pl-3 text-[27px] sm:hidden">
          <button
            type="button"
            aria-label="Mở menu điều hướng"
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <Suspense fallback={null}>
          <SidebarMenu
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </Suspense>
      )}
      {isCartVisible && (
        <div
          className="fixed left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50"
          onClick={handleCartClick}
        ></div>
      )}
      {isCartVisible && (
        <Suspense fallback={null}>
          <SidebarCart
            cartItems={cartItems}
            removeItem={removeItem}
            totalPrice={totalPrice}
            handleCartClick={handleCartClick}
          />
        </Suspense>
      )}
    </nav>
  );
};

export default Navbar;
