import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./components/website/Navbar";
import Home from "./components/Home";

const BlogMain = lazy(() => import("./components/BlogMain"));
const Footer = lazy(() => import("./components/Footer"));
const Newsletter = lazy(() => import("./components/Newsletter"));
const Menu = lazy(() => import("./components/Menu"));
const Address = lazy(() => import("./components/Address"));
const DetailFood = lazy(() => import("./components/DetailFood"));
const DetailBlog = lazy(() => import("./components/DetailBlog"));
const News = lazy(() => import("./components/News"));
const PaymentPage = lazy(() => import("./components/PaymentPage"));
const Admin = lazy(() => import("./components/admin/Admin"));
const OrderFail = lazy(() => import("./components/website/OrderFail"));
const OrderSuccess = lazy(() => import("./components/website/OrderSuccess"));
const ModalLogin = lazy(() => import("./components/website/ModalLogin"));
const ModalForgotPassword = lazy(
  () => import("./components/website/ModalForgotPassword"),
);
const CustomerProfile = lazy(
  () => import("./components/website/ProfileCustomer/CustomerProfile"),
);
const AuthenticationCode = lazy(
  () => import("./components/website/AuthenticationCode"),
);
const ResetPassword = lazy(() => import("./components/website/ResetPassword"));

const RouteFallback = () => <div className="h-[320px] w-full" />;
const DeferredLayoutExtras = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    const onUserActive = () => run();
    const events = ["scroll", "touchstart", "keydown", "mousemove"];

    events.forEach((eventName) =>
      window.addEventListener(eventName, onUserActive, { once: true, passive: true }),
    );
    const timeoutId = window.setTimeout(run, 2200);

    return () => {
      events.forEach((eventName) =>
        window.removeEventListener(eventName, onUserActive),
      );
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Newsletter />
      <Footer />
    </Suspense>
  );
};

// Layout chung có Navbar và Footer
const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main id="main-content">{children}</main>
      <DeferredLayoutExtras />
    </div>
  );
};

// Layout dành riêng cho Admin không có Navbar và Footer
const AdminLayout = ({ children }) => {
  return <div className="admin-container">{children}</div>;
};

const DetailLayout = ({ children }) => {
  return (
    <div className="detail-container">
      <Navbar />
      <main id="main-content">{children}</main>
      <DeferredLayoutExtras />
    </div>
  );
};

const DetailBlogLayout = ({ children }) => {
  return (
    <div className="detail-container">
      <Navbar />
      <main id="main-content">{children}</main>
      <DeferredLayoutExtras />
    </div>
  );
};

const PaymentLayout = ({ children }) => {
  return (
    <div className="payment-container">
      <Navbar />
      <main id="main-content">{children}</main>
      <DeferredLayoutExtras />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route cho các trang chung có Navbar và Footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/home"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/menu"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <Menu />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <News />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/address"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <Address />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/detailfood/:id"
          element={
            <DetailLayout>
              <Suspense fallback={<RouteFallback />}>
                <DetailFood />
              </Suspense>
            </DetailLayout>
          }
        />
        <Route
          path="/blogs"
          element={
            <MainLayout>
              <Suspense fallback={<div className="h-[400px] w-full" />}>
                <BlogMain />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <DetailBlogLayout>
              <Suspense fallback={<RouteFallback />}>
                <DetailBlog />
              </Suspense>
            </DetailBlogLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <PaymentLayout>
              <Suspense fallback={<RouteFallback />}>
                <PaymentPage />
              </Suspense>
            </PaymentLayout>
          }
        />
        <Route
          path="/order-success"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <OrderSuccess />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/order-fail"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <OrderFail />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <ModalLogin />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <ModalForgotPassword />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/authenticationcode"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <AuthenticationCode />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/resetpassword"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <ResetPassword />
              </Suspense>
            </MainLayout>
          }
        />
        <Route
          path="/customerprofile"
          element={
            <MainLayout>
              <Suspense fallback={<RouteFallback />}>
                <CustomerProfile />
              </Suspense>
            </MainLayout>
          }
        />

        {/* Route cho Admin, không có Navbar và Footer */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Suspense fallback={<RouteFallback />}>
                <Admin />
              </Suspense>
            </AdminLayout>
          }
        />

        {/* Route cho các trang khác */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
