import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductPage.css';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/products?populate=image');
                console.log('Full API Response:', response); // Log full response to check structure

                if (response.data && response.data.data) {
                    setProducts(response.data.data); // Set products to the correct array
                } else {
                    console.error('No data found in response');
                    setError('No products available');
                }
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Check if the products are empty
    if (products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div className="product-page">
            <h1>Products</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-price">Price: ${product.price}</p>
                        <p className="product-description">{product.description[0]?.children[0]?.text || 'No description available'}</p>
                        {/* Safely access the image URL */}
                        {product.image?.url ? (
                            <img 
                                src={`http://localhost:1337${product.image.url}`} 
                                alt={product.name} 
                                className="product-image" // Added class for styling
                            />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
