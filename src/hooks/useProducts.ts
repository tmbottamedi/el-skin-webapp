import { useState, useEffect } from "react";
import { productService } from "service/productService";
import { IProduct } from "types/Product";
import { useSearch } from "./useSearch";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { term } = useSearch();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (term) {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(term.toLowerCase()) ||
            product.description.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([...products]);
    }
  }, [term, products]);

  return { products: filteredProducts };
};
