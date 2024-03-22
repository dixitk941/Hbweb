import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../fireabase/FirebaseConfig';
import Razorpay from 'razorpay'; // Import Razorpay

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [products, setProducts] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
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

    const key = "rzp_test_XXXX00000XXXX"; //Replace it with your Test Key ID generated from the Dashboard
const amount = 400000; //in paise

window.onload = function() {
const widgetConfig = {
	"key": key,
	"amount": amount,
};
const rzpAffordabilitySuite = new RazorpayAffordabilitySuite(widgetConfig);
rzpAffordabilitySuite.render();
}

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products &&
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded">
                                <img
                                    alt="ecommerce"
                                    className="w-full"
                                    src={products.imageUrl}
                                />
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
                                        {/* Size selection buttons */}
                                        <div className="flex items-center space-x-4">
                                            <button onClick={() => setSelectedSize('M')} className={`bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center ${selectedSize === 'M' ? 'bg-gray-300' : ''}`}>
                                                M
                                            </button>
                                            <button onClick={() => setSelectedSize('L')} className={`bg-gray-200 hover:bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center ${selectedSize === 'L' ? 'bg-gray-300' : ''}`}>
                                                L
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={addCart} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                    Add To Cart
                                </button>

                                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                    {/* Favorite icon */}
                                </button>

                                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                    {products.description}
                                </p>
                            </div>

                            <div id="razorpay-container"></div>
                        </div>}
                </div>
            </section>
        </Layout>
    )
}

export default ProductInfo;
