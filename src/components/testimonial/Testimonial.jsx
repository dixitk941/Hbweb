import React, { useState } from 'react';
import './Carousel.css'; // Ensure you create and import this CSS file

function Testimonial() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            text: "I recently purchased the Men's Slim Fit Skyblue Printed Casual Shirt and I must say, I'm thoroughly impressed! The fabric feels incredibly soft against my skin, and the fit is just perfect. I've received so many compliments whenever I wear it out. The subtle print adds a touch of uniqueness to my look without being too flashy. It's become my go-to shirt for any casual occasion. I highly recommend it to anyone looking for style and comfort combined!",
            name: "Prachi Dixit",
            role: "Customer",
            image: "https://cdn-icons-png.flaticon.com/128/2763/2763444.png",
        },
        {
            id: 2,
            text: "The delivery was super fast and the packaging was excellent. I bought a pair of jeans and they fit like a glove. The material is top-notch, and I’m in love with the design. I’ll definitely be ordering more from here. Keep up the good work!",
            name: "Rohit Sharma",
            role: "Customer",
            image: "https://cdn-icons-png.flaticon.com/128/2763/2763473.png",
        },
        {
            id: 3,
            text: "I have to say, the quality of the fabric and the craftsmanship are excellent. I purchased a kurti from here and it’s absolutely beautiful. It’s comfortable and stylish, and the colors are just as vibrant as shown in the pictures. I’m beyond satisfied with my purchase!",
            name: "Sneha Verma",
            role: "Customer",
            image: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
        },
        {
            id: 4,
            text: "The quality of the shirt I bought is amazing! It’s super soft and the fit is just right. Plus, the customer service was very responsive and helpful. I’m really impressed with the overall experience. Highly recommend!",
            name: "Amit Patel",
            role: "Customer",
            image: "https://cdn-icons-png.flaticon.com/128/3135/3135755.png",
        },
        {
            id: 5,
            text: "Amazing experience! The product exceeded my expectations. The color and design are exactly as shown online, and the delivery was quicker than I anticipated. I’m so happy with my purchase and will definitely shop again!",
            name: "Neha Kapoor",
            role: "Customer",
            image: "https://cdn-icons-png.flaticon.com/128/2763/2763406.png",
        },
        {
            id: 6,
            text: "I ordered a jacket from here and it’s now my favorite piece of clothing. The quality is outstanding and it keeps me warm even on the coldest days. I appreciate the attention to detail in the stitching and the overall design. Will definitely be a repeat customer.",
            name: "Ravi Kumar",
            role: "Customer",
            image: "https://cdn-icons-png.flaticon.com/128/2763/2763342.png",
        },
    ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
        );
    };

    return (
        <div className="testimonial">
            <h1 className="text-center text-3xl font-bold">Testimonial</h1>
            <h2 className="text-center text-2xl font-semibold mb-10">
                What our <span className="text-pink-500">customers</span> are saying
            </h2>
            <div className="carousel">
                <button className="carousel-button prev" onClick={handlePrev}>
                    &lt;
                </button>
                <div className="carousel-slide">
                    <img
                        alt="testimonial"
                        className="testimonial-image"
                        src={testimonials[currentIndex].image}
                    />
                    <p className="testimonial-text">{testimonials[currentIndex].text}</p>
                    <span className="testimonial-author">{testimonials[currentIndex].name}</span>
                    <p className="testimonial-role">{testimonials[currentIndex].role}</p>
                </div>
                <button className="carousel-button next" onClick={handleNext}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default Testimonial;
