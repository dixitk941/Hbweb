import React, { useContext, useState } from 'react';
import myContext from '../../../context/data/myContext';

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;
    const [newImageUrl, setNewImageUrl] = useState('');

    const addImageUrl = () => {
        if (newImageUrl.trim() !== '') {
            setProducts({ ...products, images: [...(products.images || []), newImageUrl] });
            setNewImageUrl('');
        }
    };

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                    <div>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products?.title || ''}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product title (Optional)'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products?.price || ''}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price (Optional)'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            name='imageurl'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Enter image URL (Optional)'
                        />
                        <button onClick={addImageUrl} className='bg-gray-600 text-white font-bold px-2 py-2 rounded-lg'>Add Image</button>
                    </div>
                    <div>
                        {products?.images?.map((image, index) => (
                            <div key={index} className="flex items-center">
                                <img src={image} alt={`Product ${index}`} className="w-16 h-16 mr-2 rounded-lg" />
                                <button onClick={() => {
                                    const updatedImages = products.images.filter((_, i) => i !== index);
                                    setProducts({ ...products, images: updatedImages });
                                }} className="bg-red-500 text-white font-bold px-2 py-1 rounded-lg">Remove</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products?.category || ''}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='category'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product category (Optional)'
                        />
                    </div>
                    <div>
                        <textarea
                            cols="30"
                            rows="10"
                            name='title'
                            value={products?.description || ''}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product desc (Optional)'
                        ></textarea>
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={addProduct}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;


