import Header from "components/Header";
import ProductShowcase from "components/ProductShowcase";
import Footer from "components/Footer";

export default function Home() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main style={{ flexGrow: 1 }}>
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
}
