import { useEffect, useState } from "react";
import { IProduct, productService } from "service/productService";
import ProductCard from "components/ProductCard";
import "./ProductShowcase.css";
import { useSearchContext } from "context/SearchContext";
import { useCartContext } from "context/CartContext";
import CartModal from "components/CartModal";

function ProductShowcase() {
  const title = "nossos queridinhos estão aqui";
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const { search } = useSearchContext();
  const { items, addItem, getItemQuantity, isCartOpen, handleCartToggle } =
    useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await productService.getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([...products]);
    }
  }, [search, products]);

  const handleProductClick = (productId: string) => {
    console.log(`Produto clicado: ${productId}`);
  };

  const handleBuyClick = (product: IProduct, event: React.MouseEvent) => {
    event.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: getItemQuantity(product.id) + 1,
    });
    handleCartToggle();
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <h2 className="product-grid-title">{title}</h2>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onBuyClick={handleBuyClick}
            />
          ))}
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartToggle} items={items} />
    </section>
  );
}

export default ProductShowcase;
