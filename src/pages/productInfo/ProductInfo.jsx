import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [products, setProducts] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = () => {
        if (selectedSize) {
            const productWithSize = { ...products, size: selectedSize };
            dispatch(addToCart(productWithSize));
            toast.success('Added to cart');
        } else {
            toast.error('Please select a size');
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const nextImage = () => {
        if (products && products.images) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.images.length);
        }
    };

    const prevImage = () => {
        if (products && products.images) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + products.images.length) % products.images.length);
        }
    };

    const handleTouchStart = (e) => {
        const startX = e.touches[0].clientX;
        const startY = e.touches[0].clientY;

        const handleTouchMove = (e) => {
            const endX = e.touches[0].clientX;
            const endY = e.touches[0].clientY;
            const distX = endX - startX;
            const distY = endY - startY;

            if (Math.abs(distX) > Math.abs(distY)) {
                if (distX > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            }

            document.removeEventListener('touchmove', handleTouchMove);
        };

        document.addEventListener('touchmove', handleTouchMove);
    };

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products &&
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded relative">
                                <img
                                    alt="ecommerce"
                                    className="w-full"
                                    src={products.images ? products.images[currentImageIndex] : ''}
                                    onTouchStart={handleTouchStart}
                                />
                            </div>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                {/* Product details */}
                            </div>
                        </div>}
                </div>
            </section>
        </Layout>
    )
}

export default ProductInfo;
