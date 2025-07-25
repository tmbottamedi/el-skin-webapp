import { useState, useEffect } from "react";
import { productService } from "service/productService";
import { IProduct } from "types/Product";
import { useSearchContext } from "context/SearchContext";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const { search } = useSearchContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
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

  return { products: filteredProducts };
};
