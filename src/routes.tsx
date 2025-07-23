import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Header from "components/Header";
import Footer from "components/Footer";

const Home = React.lazy(() => import("pages/Home"));
const About = React.lazy(() => import("pages/About"));
const NotFound = React.lazy(() => import("pages/NotFound"));

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}
