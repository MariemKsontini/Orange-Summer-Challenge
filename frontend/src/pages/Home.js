import React, { useEffect, useState } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import ProductDetails from '../components/ProductDetails';
import ProductForm from '../components/ProductForm';

const Home = () => {
  const { products, dispatch } = useProductsContext();
  const { user } = useAuthContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ field: 'price', order: 'asc' });
  const limit = 4;

  useEffect(() => {
    if (user) {
      fetchProducts(currentPage, limit, sortConfig);
    }
  }, [user, currentPage, dispatch, sortConfig]);

  const fetchProducts = async (page, limit, sortConfig) => {
    const { field, order } = sortConfig;
    console.log('Sort Config:', sortConfig); // Log the sortConfig
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/products?page=${page}&limit=${limit}&sortField=${field}&sortOrder=${order}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    console.log('Fetched Products:', json); // Log the fetched data

    if (response.ok) {
      dispatch({ type: 'SET_PRODUCTS', payload: json });
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toggleSortOrder = (field) => {
    setSortConfig((prevConfig) => ({
      field,
      order: prevConfig.order === 'asc' && prevConfig.field === field ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="home">
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))}
      </div>
      <ProductForm />

      <div className="sorting-buttons">
        <button className="sort-button" onClick={() => toggleSortOrder('title')}>
          Sort by Name
        </button>
      </div>

      <div className="pagination">
        {currentPage > 1 && <button onClick={handlePreviousPage}>Previous</button>}
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Home;
