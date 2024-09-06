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
    const [newCoverImage, setNewCoverImage] = useState(null);  // Cover image
    const [newImages, setNewImages] = useState([]);  // Multiple images
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading indicator for form submission
    const [error, setError] = useState(null); // Error handling

    // Upload image to Firebase Storage
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

    // Handle file input change for multiple images
    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
    };

    // Submit product to Firestore
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);  // Clear any previous errors

        // Validate form input
        if (!products.title || !products.price || !products.category || !products.description) {
            setError('Please fill all fields');
            setIsSubmitting(false);
            return;
        }

        try {
            let coverImageUrl = '';
            let imageUrls = [];

            // Upload cover image
            if (newCoverImage) {
                coverImageUrl = await uploadImage(newCoverImage);
            }

            // Upload additional images
            for (let i = 0; i < newImages.length; i++) {
                const imageUrl = await uploadImage(newImages[i]);
                imageUrls.push(imageUrl);
            }

            // Prepare product data
            const productData = {
                ...products,
                coverImageUrl,  // Cover image URL
                images: imageUrls,  // Array of images
            };

            // Add product to Firestore
            await addDoc(collection(db, 'products'), productData);

            // Reset form after submission
            setProducts({});
            setNewCoverImage(null);
            setNewImages([]);
            setUploadProgress(0);
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            setError('Error adding product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 p-8 rounded-xl w-full max-w-lg'>
                <h1 className='text-center text-white text-2xl mb-6 font-bold'>Add Product</h1>

                {/* Error Message */}
                {error && <div className='text-red-500 text-center mb-4'>{error}</div>}

                {/* Product Title */}
                <input
                    type="text"
                    value={products?.title || ''}
                    onChange={(e) => setProducts({ ...products, title: e.target.value })}
                    name='title'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none'
                    placeholder='Product title'
                />

                {/* Product Price */}
                <input
                    type="text"
                    value={products?.price || ''}
                    onChange={(e) => setProducts({ ...products, price: e.target.value })}
                    name='price'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none'
                    placeholder='Product price'
                />

                {/* Cover Image Upload */}
                <div className='mb-4'>
                    <label className='text-white mb-2 block'>Upload Cover Image</label>
                    <input
                        type="file"
                        onChange={handleCoverImageChange}
                        className='bg-gray-600 px-3 py-2 w-full rounded-lg text-white outline-none'
                    />
                </div>

                {/* Additional Images Upload */}
                <div className='mb-4'>
                    <label className='text-white mb-2 block'>Upload Additional Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImagesChange}
                        className='bg-gray-600 px-3 py-2 w-full rounded-lg text-white outline-none'
                    />
                </div>

                {/* Product Category */}
                <input
                    type="text"
                    value={products?.category || ''}
                    onChange={(e) => setProducts({ ...products, category: e.target.value })}
                    name='category'
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none'
                    placeholder='Product category'
                />

                {/* Product Description */}
                <textarea
                    cols="30"
                    rows="5"
                    name='description'
                    value={products?.description || ''}
                    onChange={(e) => setProducts({ ...products, description: e.target.value })}
                    className='bg-gray-600 mb-4 px-3 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none'
                    placeholder='Product description'
                ></textarea>

                {/* Submit Button */}
                <div className='flex justify-center'>
                    <button
                        onClick={handleSubmit}
                        className='bg-yellow-500 w-full text-black font-bold px-4 py-3 rounded-lg'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Product'}
                    </button>
                </div>

                {/* Upload Progress */}
                {uploadProgress > 0 && (
                    <div className='text-white mt-4'>
                        Upload Progress: {Math.round(uploadProgress)}%
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
