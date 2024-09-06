import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import myContext from '../../../context/data/myContext';

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct } = context;
    const [newCoverImage, setNewCoverImage] = useState(null);  // For cover image
    const [newImages, setNewImages] = useState([]);  // For additional images
    const [uploadProgress, setUploadProgress] = useState(0);

    // Upload image to Firebase Storage and return the download URL
    const uploadImage = (image) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `products/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => reject(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
                }
            );
        });
    };

    // Handle file input change for cover image
    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setNewCoverImage(file);
    };

    // Handle file input change for additional images
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
    };

    // Submit product to Firestore
    const handleSubmit = async () => {
        try {
            let coverImageUrl = '';
            let imageUrls = [];

            if (newCoverImage) {
                coverImageUrl = await uploadImage(newCoverImage);
            }

            for (let i = 0; i < newImages.length; i++) {
                const imageUrl = await uploadImage(newImages[i]);
                imageUrls.push(imageUrl);
            }

            const productData = {
                ...products,
                coverImageUrl,
                images: imageUrls,
            };

            // Submit product to Firestore
            const docRef = await addDoc(collection(db, 'products'), productData);
            console.log('Document written with ID: ', docRef.id);

            // Clear form
            setProducts({});
            setNewCoverImage(null);
            setNewImages([]);
            setUploadProgress(0);
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
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
                            onChange={handleCoverImageChange}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        />
                        <label className='text-white mb-2'>Upload Cover Image</label>
                    </div>
                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={handleImagesChange}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        />
                        <label className='text-white mb-2'>Upload Additional Images</label>
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
                            name='description'
                            value={products?.description || ''}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'
                        ></textarea>
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={handleSubmit}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                    <div className='text-white'>
                        Upload Progress: {uploadProgress}%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
