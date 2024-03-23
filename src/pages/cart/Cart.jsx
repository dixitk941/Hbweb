import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Sizeofproduct, setSizeofproduct] = useState("");

  const buyNow = async () => {
    // Implement buyNow function
  }

  return (
    <Layout>
      <div className="h-screen bg-gray-100 pt-5 mb-[60%]" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              const { title, price, description, coverImageUrl } = item; // Change imageUrl to coverImageUrl
              return (
                <div key={index} className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={coverImageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" /> {/* Change imageUrl to coverImageUrl */}
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                      <h2 className="text-sm text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                    </div>
                    <div onClick={() => deleteCart(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer text-gray-500 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
              </div>
            </div>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              Sizeofproduct={Sizeofproduct}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              setSizeofproduct={setSizeofproduct}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;


