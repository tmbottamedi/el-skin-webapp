import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import About from "pages/About";
import NotFound from "pages/NotFound";
import Header from "components/Header";
import Footer from "components/Footer";

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
