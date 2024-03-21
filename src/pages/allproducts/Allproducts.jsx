import React, { useContext, useEffect } from 'react';
import Filter from '../../components/filter/Filter';
import ProductCard from '../../components/productCard/ProductCard'
import Layout from '../../components/layout/Layout';
import myContext from '../../context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

// productData 
const productData = [
  {
    id: 1,
    image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
    title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
    desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
    price: 150,
    trendingProductName: 'Featured',
    quantity: 1,
  },
  // Add more product data here...
];

function Allproducts() {
  const context = useContext(myContext);
  const { mode, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('add to cart');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems])
useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  const navigate = useNavigate();

  return (
    <Layout>
        <Filter/>
      <div className="py-8">
        {/* Heading  */}
        <div className="">
          <h1 className="text-center mb-5 text-2xl font-semibold">All Products</h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {productData.map((item, index) => {
                const { image, title, price } = item;
                return (
                  <div key={index} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate('/productinfo')}
                        className="lg:h-80 h-96 w-full"
                        src={image}
                        alt="blog"
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          Hitownbears
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          ₹{price}
                        </h1>

                        <div className="flex justify-center ">
                          <button className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Allproducts;
