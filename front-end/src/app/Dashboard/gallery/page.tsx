"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';

const GalleryManager = () => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/get-gallery-images'); // Replace with your API or directory fetching logic
            setImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', selectedFile); 
    
            try {
                await axios.post('/api/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                fetchImages(); 
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setUploading(false);
            }
        }
    };
    
    

    const handleDelete = async (image: string) => {
        try {
            await axios.post('/api/delete-image', { image }); // Replace with your delete logic
            fetchImages(); 
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className="p-4">
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
