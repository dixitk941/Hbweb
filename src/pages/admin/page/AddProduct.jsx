import React, { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import myContext from '../../../context/data/myContext';

// Firebase configuration
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
const db = getFirestore(app);

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts } = context;
    const [newImage, setNewImage] = useState(null);  // for general images
    const [newCoverImage, setNewCoverImage] = useState(null);  // for cover image
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [coverImageUploadProgress, setCoverImageUploadProgress] = useState(0);
    const [productList, setProductList] = useState([]); // Stores list of products to be submitted

    const uploadImage = (image, isCover = false) => {
        if (!image) return Promise.reject('No image selected');
        
        const storageRef = ref(storage, `products/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    if (isCover) setCoverImageUploadProgress(progress);
                    else setImageUploadProgress(progress);
                },
                (error) => reject(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => resolve(downloadURL));
                }
            );
        });
    };

    const handleImageChange = (e, isCover = false) => {
        const file = e.target.files[0];
        if (isCover) setNewCoverImage(file);
        else setNewImage(file);
    };

    const handleAddProduct = async () => {
        try {
            // Upload cover image and get URL
            const coverImageUrl = await uploadImage(newCoverImage, true);

            // Upload other images and get URLs
            const imageUrls = [];
            if (newImage) {
                const imageUrl = await uploadImage(newImage, false);
                imageUrls.push(imageUrl);
            }

            // Create product data
            const productData = {
                ...products,
                images: imageUrls,
                coverImageUrl,
            };

            // Add product to product list
            setProductList([...productList, productData]);

            // Clear inputs after adding product
            setProducts({});
            setNewCoverImage(null);
            setNewImage(null);
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    const handleSubmitProducts = async () => {
        try {
            const productCollection = collection(db, 'products');

            // Loop through productList and add each product to Firestore
            for (const product of productList) {
                await addDoc(productCollection, product);
            }

            // Clear product list after submission
            setProductList([]);
            alert("Products submitted successfully!");
        } catch (error) {
            console.error("Error submitting products", error);
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
                            onClick={handleAddProduct}
                            className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={handleSubmitProducts}
                            className='bg-green-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                            Submit All Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
