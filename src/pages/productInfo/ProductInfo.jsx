import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../firebase/FirebaseConfig';
import { Radio, RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading, mode } = context;

    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProduct(productTemp.data());

            // Fetch similar products
            const q = query(collection(fireDB, "products"), where("category", "==", productTemp.data().category));
            const querySnapshot = await getDocs(q);
            const similarItems = [];
            querySnapshot.forEach((doc) => {
                if (doc.id !== params.id) {
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
        if (product && product.images) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
        }
    };

    const prevImage = () => {
        if (product && product.images) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
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

    if (loading) return <p>Loading...</p>; // Optionally add a loading state

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {product && (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded relative">
                                <img
                                    alt="ecommerce"
                                    className="w-full h-full object-cover object-center"
                                    src={product.images[currentImageIndex].src}
                                    onTouchStart={handleTouchStart}
                                />
                                <div className="flex justify-between mt-2">
                                    <button onClick={prevImage} className="text-gray-600 hover:text-gray-900">
                                        &lt;
                                    </button>
                                    <button onClick={nextImage} className="text-gray-600 hover:text-gray-900">
                                        &gt;
                                    </button>
                                </div>
                            </div>

                            <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className="text-3xl font-medium title-font text-gray-900">{product.name}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <span
                                                key={rating}
                                                className={classNames(
                                                    product.reviews.average > rating ? 'text-yellow-500' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0',
                                                )}
                                            />
                                        ))}
                                    </span>
                                    <span className="text-gray-600 ml-3">{product.reviews.totalCount} reviews</span>
                                </div>
                                <p className="leading-relaxed">{product.description}</p>
                                <div className="mt-6">
                                    <span className="title-font font-medium text-2xl text-gray-900">{product.price}</span>
                                </div>

                                <form className="mt-10">
                                    {/* Colors */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                        <fieldset aria-label="Choose a color" className="mt-4">
                                            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                                                {product.colors.map((color) => (
                                                    <Radio
                                                        key={color.name}
                                                        value={color}
                                                        className={classNames(
                                                            color.selectedClass,
                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                        )}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(color.class, 'h-8 w-8 rounded-full border border-black border-opacity-10')}
                                                        />
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </div>

                                    {/* Sizes */}
                                    <div className="mt-10">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                Size guide
                                            </a>
                                        </div>
                                        <fieldset aria-label="Choose a size" className="mt-4">
                                            <RadioGroup
                                                value={selectedSize}
                                                onChange={setSelectedSize}
                                                className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                            >
                                                {product.sizes.map((size) => (
                                                    <Radio
                                                        key={size.name}
                                                        value={size}
                                                        className={classNames(
                                                            size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none'
                                                        )}
                                                    >
                                                        <span>{size.name}</span>
                                                        {size.inStock ? null : (
                                                            <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                                                <svg
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 100 100"
                                                                    preserveAspectRatio="none"
                                                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                >
                                                                    <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        </fieldset>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => addCart(product)}
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Add to bag
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
}

export default ProductInfo;
