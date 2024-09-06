import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import myContext from '../../../context/data/myContext';

// Firebase configuration hardcoded directly into the component
const firebaseConfig = {
apiKey: "AIzaSyAmArcMKfNsMRIpQIT23otEAZOz5oMKqkQ",
  authDomain: "hbweb-a7934.firebaseapp.com",
  databaseURL: "https://hbweb-a7934-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hbweb-a7934",
  storageBucket: "hbweb-a7934.appspot.com",
  messagingSenderId: "318118672051",
  appId: "1:318118672051:web:5e5b5618fcbac1e89c62c6",
  measurementId: "G-8HTBH5FC5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;
    const [newImage, setNewImage] = useState(null);  // for general image
    const [newCoverImage, setNewCoverImage] = useState(null);  // for cover image
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [coverImageUploadProgress, setCoverImageUploadProgress] = useState(0);

    const uploadImage = (image, isCover = false) => {
        if (!image) return;
        
        const storageRef = ref(storage, `products/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (isCover) setCoverImageUploadProgress(progress);
                else setImageUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (isCover) {
                        setProducts({ ...products, coverImageUrl: downloadURL });
                    } else {
                        setProducts({ ...products, images: [...(products.images || []), downloadURL] });
                    }
                });
            }
        );
    };

    const handleImageChange = (e, isCover = false) => {
        const file = e.target.files[0];
        if (isCover) setNewCoverImage(file);
        else setNewImage(file);
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
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={products?.price || ''}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(e, false)}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        />
                        <button onClick={() => uploadImage(newImage, false)} className='bg-gray-600 text-white font-bold px-2 py-2 rounded-lg'>Upload Image</button>
                        <progress value={imageUploadProgress} max="100"></progress>
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(e, true)}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        />
                        <button onClick={() => uploadImage(newCoverImage, true)} className='bg-gray-600 text-white font-bold px-2 py-2 rounded-lg'>Upload Cover Image</button>
                        <progress value={coverImageUploadProgress} max="100"></progress>
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
                            placeholder='Product category'
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
                            placeholder='Product desc'
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
