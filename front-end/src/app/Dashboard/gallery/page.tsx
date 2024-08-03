"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

const GalleryManager = () => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/get-gallery-images'); // Replace with your API or directory fetching logic
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
            setError('Error fetching images');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setError('File size exceeds 5MB');
                return;
            }
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setUploading(true);
            setError(null);
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                await axios.post('/api/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setSuccessMessage('File uploaded successfully');
                fetchImages();
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('Error uploading image');
            } finally {
                setUploading(false);
                setSelectedFile(null);
            }
        }
    };

    const handleDelete = async (image: string) => {
        setError(null);
        try {
            await axios.post('/api/delete-image', { image });
            setSuccessMessage('Image deleted successfully');
            fetchImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Error deleting image');
        }
    };

    return (
        <div className="p-4">
            {error && <div className="mb-4 text-red-500">{error}</div>}
            {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
            <div className="mb-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded p-2"
                />
                <button
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {uploading ? <BiLoaderCircle className="animate-spin" /> : 'Upload'}
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {loading ? (
                    <div className="col-span-full text-center">
                        <BiLoaderCircle className="animate-spin text-4xl" />
                    </div>
                ) : images.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">No images available</div>
                ) : (
                    images.map((image) => (
                        <div key={image} className="relative">
                            <img
                                src={`/gallery/${image}`}
                                alt={image}
                                className="w-full h-40 object-cover rounded shadow-lg"
                            />
                            <button
                                onClick={() => handleDelete(image)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default GalleryManager;
