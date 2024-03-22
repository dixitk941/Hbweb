import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <div>
            <section className=''>
                <div className=" container mx-auto px-5 py-10">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>What our <span className=' text-pink-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4">
                        

                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://cdn-icons-png.flaticon.com/128/2763/2763444.png" />
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="leading-relaxed">I recently purchased the Men's Slim Fit Skyblue Printed Casual Shirt and I must say, I'm thoroughly impressed! The fabric feels incredibly soft against my skin, and the fit is just perfect. I've received so many compliments whenever I wear it out. The subtle print adds a touch of uniqueness to my look without being too flashy. It's become my go-to shirt for any casual occasion. I highly recommend it to anyone looking for style and comfort combined!.</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Prachi dixit</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">customer</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://webknudocs.vercel.app/logo/react.png" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">I recently purchased the Men's Slim Fit Skyblue Printed Casual Shirt and I must say, I'm thoroughly impressed! The fabric feels incredibly soft against my skin, and the fit is just perfect. I've received so many compliments whenever I wear it out. The subtle print adds a touch of uniqueness to my look without being too flashy. It's become my go-to shirt for any casual occasion. I highly recommend it to anyone looking for style and comfort combined!</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Jhon-D</h2>
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="text-gray-500">customer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial
