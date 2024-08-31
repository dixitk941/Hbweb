import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div>
            <section>
                <div className="container mx-auto px-5 py-10">
                    <h1 className="text-center text-3xl font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Testimonial
                    </h1>
                    <h2 className="text-center text-2xl font-semibold mb-10" style={{ color: mode === 'dark' ? 'white' : '' }}>
                        What our <span className="text-pink-500">customers</span> are saying
                    </h2>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="testimonial-slider"
                    >
                        <SwiperSlide>
                            <div className="text-center p-4">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png"
                                />
                                <p className="leading-relaxed" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    "I recently purchased the Men's Slim Fit Skyblue Printed Casual Shirt and I must say, I'm thoroughly impressed! The fabric feels incredibly soft against my skin, and the fit is just perfect. I've received so many compliments whenever I wear it out. The subtle print adds a touch of uniqueness to my look without being too flashy. It's become my go-to shirt for any casual occasion. I highly recommend it to anyone looking for style and comfort combined!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={{ color: mode === 'dark' ? '#ff4162' : '' }}>
                                    Prachi Dixit
                                </h2>
                                <p className="text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="text-center p-4">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://cdn-icons-png.flaticon.com/128/2763/2763473.png"
                                />
                                <p className="leading-relaxed" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    "The delivery was super fast and the packaging was excellent. I bought a pair of jeans and they fit like a glove. The material is top-notch, and I’m in love with the design. I’ll definitely be ordering more from here. Keep up the good work!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={{ color: mode === 'dark' ? '#ff4162' : '' }}>
                                    Rohit Sharma
                                </h2>
                                <p className="text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="text-center p-4">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                                />
                                <p className="leading-relaxed" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    "I have to say, the quality of the fabric and the craftsmanship are excellent. I purchased a kurti from here and it’s absolutely beautiful. It’s comfortable and stylish, and the colors are just as vibrant as shown in the pictures. I’m beyond satisfied with my purchase!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={{ color: mode === 'dark' ? '#ff4162' : '' }}>
                                    Sneha Verma
                                </h2>
                                <p className="text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="text-center p-4">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://cdn-icons-png.flaticon.com/128/3135/3135755.png"
                                />
                                <p className="leading-relaxed" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    "The quality of the shirt I bought is amazing! It’s super soft and the fit is just right. Plus, the customer service was very responsive and helpful. I’m really impressed with the overall experience. Highly recommend!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={{ color: mode === 'dark' ? '#ff4162' : '' }}>
                                    Amit Patel
                                </h2>
                                <p className="text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="text-center p-4">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://cdn-icons-png.flaticon.com/128/2763/2763406.png"
                                />
                                <p className="leading-relaxed" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    "Amazing experience! The product exceeded my expectations. The color and design are exactly as shown online, and the delivery was quicker than I anticipated. I’m so happy with my purchase and will definitely shop again!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={{ color: mode === 'dark' ? '#ff4162' : '' }}>
                                    Neha Kapoor
                                </h2>
                                <p className="text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="text-center p-4">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://cdn-icons-png.flaticon.com/128/2763/2763342.png"
                                />
                                <p className="leading-relaxed" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    "I ordered a jacket from here and it’s now my favorite piece of clothing. The quality is outstanding and it keeps me warm even on the coldest days. I appreciate the attention to detail in the stitching and the overall design. Will definitely be a repeat customer."
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase" style={{ color: mode === 'dark' ? '#ff4162' : '' }}>
                                    Ravi Kumar
                                </h2>
                                <p className="text-gray-500" style={{ color: mode === 'dark' ? 'white' : '' }}>Customer</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;
