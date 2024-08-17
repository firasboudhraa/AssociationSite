"use client"
import React, { useRef, useState, useEffect } from 'react';
import styles from '@/styles/changePassword.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { motion } from 'framer-motion'; 

const DocumentsPage = () => {
    const fileInputRectoRef = useRef(null);
    const fileInputVersoRef = useRef(null);
    const fileInputPassportRef = useRef(null);
    const [documentType, setDocumentType] = useState('CIN');
    const [userDocuments, setUserDocuments] = useState([]);
    
    useEffect(() => {
        const fetchUserDocuments = async () => {
            const userData = localStorage.getItem('user');
            if (!userData) {
                throw new Error('User data not found in local storage');
            }

            const user = JSON.parse(userData);
            const userId = user.id;

            if (!userId) {
                throw new Error('User ID not found in user data');
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/user-documents/${userId}`);
                setUserDocuments(response.data.documents);
            } catch (error) {
                console.error('There was an error fetching the documents!', error);
            }
        };

        fetchUserDocuments();
    }, []);
    
    const handleRectoClick = () => {
        fileInputRectoRef.current.click();
    };

    const handleVersoClick = () => {
        fileInputVersoRef.current.click();
    };

    const handlePassportClick = () => {
        fileInputPassportRef.current.click();
    };

    const handleSubmit = async () => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            throw new Error('User data not found in local storage');
        }

        const user = JSON.parse(userData);
        const userId = user.id;

        if (!userId) {
            throw new Error('User ID not found in user data');
        }

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('type', documentType);

        if (documentType === 'CIN') {
            if (fileInputRectoRef.current.files[0]) {
                formData.append('recto', fileInputRectoRef.current.files[0]);
            }
            if (fileInputVersoRef.current.files[0]) {
                formData.append('verso', fileInputVersoRef.current.files[0]);
            }
        } else if (documentType === 'passport') {
            if (fileInputPassportRef.current.files[0]) {
                formData.append('passport', fileInputPassportRef.current.files[0]);
            }
        }

        try {
            const response = await axios.post('http://localhost:8000/api/upload-documents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
            const res = await axios.get(`http://localhost:8000/api/user-documents/${userId}`);
            setUserDocuments(res.data.documents);
        } catch (error) {
            console.error('There was an error uploading the documents!', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className="flex flex-col items-center justify-center h-max w-full py-10 px-5 bg-[var(--bgSoft)] from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-xl max-w-6xl text-gray-800">
                <h2 className="text-4xl font-bold mb-4 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    MES DOCUMENTS
                </h2>
                <div className="border-2 w-24 border-green-600 mb-4"></div>
                <div className="w-full bg-white p-6 rounded-lg shadow-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4">Documents d'identité</h3>
                    <div className="flex flex-col space-y-4">
                        <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                            <input
                                type="radio"
                                name="documentType"
                                className="form-radio text-green-600"
                                value="CIN"
                                checked={documentType === 'CIN'}
                                onChange={() => setDocumentType('CIN')}
                            />
                            <span className="text-lg font-medium">Carte d'identité tunisienne</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2">
                            <input
                                type="radio"
                                name="documentType"
                                className="form-radio text-green-600"
                                value="passport"
                                checked={documentType === 'passport'}
                                onChange={() => setDocumentType('passport')}
                            />
                            <span className="text-lg font-medium">Passeport</span>
                        </label>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    {(documentType === 'CIN') && (
                        <>
                            <motion.div
                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg w-64 h-48 bg-white shadow-md cursor-pointer hover:border-green-600 transition duration-300"
                                onClick={handleRectoClick}
                                whileHover={{ scale: 1.05 }}
                            >
                                <i className="fas fa-camera text-4xl text-gray-500 mb-3"></i>
                                <span className="text-lg font-medium text-gray-700">Télécharger le recto</span>
                                <span className="text-sm text-gray-500">JPG, PNG ou PDF uniquement</span>
                                <input type="file" ref={fileInputRectoRef} className="hidden" accept="image/jpeg,image/png,application/pdf" />
                            </motion.div>
                            <motion.div
                                className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg w-64 h-48 bg-white shadow-md cursor-pointer hover:border-green-600 transition duration-300"
                                onClick={handleVersoClick}
                                whileHover={{ scale: 1.05 }}
                            >
                                <i className="fas fa-camera text-4xl text-gray-500 mb-3"></i>
                                <span className="text-lg font-medium text-gray-700">Télécharger le verso</span>
                                <span className="text-sm text-gray-500">JPG, PNG ou PDF uniquement</span>
                                <input type="file" ref={fileInputVersoRef} className="hidden" accept="image/jpeg,image/png,application/pdf" />
                            </motion.div>
                        </>
                    )}
                    {(documentType === 'passport') && (
                        <motion.div
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg w-64 h-48 bg-white shadow-md cursor-pointer hover:border-green-600 transition duration-300"
                            onClick={handlePassportClick}
                            whileHover={{ scale: 1.05 }}
                        >
                            <i className="fas fa-camera text-4xl text-gray-500 mb-3"></i>
                            <span className="text-lg font-medium text-gray-700">Télécharger votre passeport</span>
                            <span className="text-sm text-gray-500">JPG, PNG ou PDF uniquement</span>
                            <input type="file" ref={fileInputPassportRef} className="hidden" accept="image/jpeg,image/png,application/pdf" />
                        </motion.div>
                    )}
                </div>
                <button className="border-2 border-green-600 text-green-600 rounded-full px-8 py-3 font-semibold hover:bg-green-600 hover:text-white transition-all duration-300" onClick={handleSubmit}>
                    Envoyer mes documents
                </button>
                <div className="mt-8 w-full">
                    <h3 className="text-2xl font-semibold mb-4">Documents Uploaded</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {userDocuments.map((doc, index) => (
                            <motion.div
                                key={index}
                                className="border-2 border-gray-300 p-4 rounded-lg bg-white shadow-md"
                                whileHover={{ scale: 1.05 }}
                            >
                                {doc.type === 'CIN' && (
                                    <div className="flex flex-col space-y-4">
                                        {doc.recto && (
                                            <img src={doc.recto} alt="CIN Recto" className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105" />
                                        )}
                                        {doc.verso && (
                                            <img src={doc.verso} alt="CIN Verso" className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105" />
                                        )}
                                        <span className="block mt-2 text-sm text-gray-600">Carte d'identité</span>
                                    </div>
                                )}
                                {doc.type === 'passport' && (
                                    <div className="flex flex-col space-y-4">
                                        {doc.passport && (
                                            <img src={doc.passport} alt="Passport" className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105" />
                                        )}
                                        <span className="block mt-2 text-sm text-gray-600">Passeport</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsPage;
