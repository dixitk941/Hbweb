import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading, mode } = context;

    const [products, setProducts] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());

            // Fetch similar products
            const q = query(collection(fireDB, "products"), where("category", "==", productTemp.data().category));
            const querySnapshot = await getDocs(q);
            const similarItems = [];
            querySnapshot.forEach((doc) => {
                if (doc.id !== params.id) {  // Exclude the current product
                    similarItems.push({ ...doc.data(), id: doc.id });
                }
            });
            setSimilarProducts(similarItems);

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

    const addCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
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

        const handleTouchMove = (e) => {
            const endX = e.touches[0].clientX;
            const distX = endX - startX;

            if (Math.abs(distX) > 50) {
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
            <section className={`text-gray-600 body-font overflow-hidden ${mode === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="container px-5 py-10 mx-auto">
                    {products && (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded relative">
                                <img
                                    alt="ecommerce"
                                    className="w-full h-72 lg:h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                                    src={products.images ? products.images[currentImageIndex] : ''}
                                    onTouchStart={handleTouchStart}
                                />
                                <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors duration-300 ease-in-out">
                                    {"<"}
                                </button>
                                <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-colors duration-300 ease-in-out">
                                    {">"}
                                </button>
                                <div className="flex justify-center mt-4">
                                    {products.images && products.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className={`w-16 h-16 object-cover mx-2 cursor-pointer rounded-lg transition-transform duration-300 ease-in-out ${currentImageIndex === index ? 'border-2 border-indigo-500' : ''}`}
                                            onClick={() => setCurrentImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    Hitownbears
                                </h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    {products.title}
                                </h1>
                                <div className="flex mb-4">
                                    {/* Rating icons */}
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className="title-font font-medium text-2xl text-gray-900">
                                        ₹{products.price}
                                    </span>
                                    <div className="ml-auto flex">
                                        <div className="flex items-center space-x-4">
                                            <button onClick={() => setSelectedSize('M')} className={`bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 ${selectedSize === 'M' ? 'bg-gray-300' : ''}`}>
                                                M
                                            </button>
                                            <button onClick={() => setSelectedSize('L')} className={`bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 ${selectedSize === 'L' ? 'bg-gray-300' : ''}`}>
                                                L
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => addCart({ ...products, size: selectedSize })} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg transition-colors duration-300">
                                    Add To Cart
                                </button>

                                <div className="leading-relaxed border-b-2 mb-5 pb-5">
                                    {products.description.split('. ').map((point, index) => (
                                        <p key={index} className="mb-2">• {point.trim()}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Similar Products Section */}
                    {similarProducts.length > 0 && (
                        <section className="text-gray-600 body-font mt-10">
                            <div className="container px-5 py-10 mx-auto">
                                <h2 className="text-2xl font-medium text-gray-900 mb-6">Similar Products</h2>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                    {similarProducts.map((item, index) => {
                                        const { title, price, coverImageUrl, id } = item;
                                        return (
                                            <div key={index} className="p-4 border-2 hover:shadow-lg transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                                <div onClick={() => window.location.href = `/productinfo/${id}`} className="flex justify-center cursor-pointer">
                                                    <img className="rounded-2xl w-full h-60 md:h-80 p-2 hover:scale-105 transition-transform duration-300 ease-in-out object-cover" src={coverImageUrl} alt="cover" />
                                                </div>
                                                <div className="p-5 border-t-2">
                                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>Hitownbears</h2>
                                                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{title}</h1>
                                                    <p className="leading-relaxed mb-3">₹{price}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
