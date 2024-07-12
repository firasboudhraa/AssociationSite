"use client"
import React, { useRef, useState } from 'react';
import styles from '@/styles/changePassword.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DocumentsPage = () => {
  const fileInputRectoRef = useRef(null);
  const fileInputVersoRef = useRef(null);
  const [documentType, setDocumentType] = useState('CIN'); // Default to CIN

  const handleRectoClick = () => {
    fileInputRectoRef.current.click();
  };

  const handleVersoClick = () => {
    fileInputVersoRef.current.click();
  };

  return (
    <div className={styles.container}>
      <div className="flex flex-col items-center justify-center h-max w-full py-10 px-5 bg-[var(--bgSoft)] rounded-2xl shadow-2xl max-w-6xl text-[var(--textSoft)]">
        <h2 className="text-3xl font-bold mb-2">
          MES DOCUMENTS
        </h2>
        <div className="border-2 w-20 border-green-500 mb-3"></div>
        <div className="w-full bg-[var(--bgSoft)] p-5 rounded-lg mb-5">
          <h3 className="text-xl font-semibold mb-3">Documents d'identité</h3>
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="documentType"
                className="form-radio text-green-500"
                value="CIN"
                checked={documentType === 'CIN'}
                onChange={() => setDocumentType('CIN')}
              />
              <span>Cate d'identité tunisienne</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="documentType"
                className="form-radio text-green-500"
                value="passport"
                checked={documentType === 'passport'}
                onChange={() => setDocumentType('passport')}
              />
              <span>Passeport</span>
            </label>
          </div>
        </div>
        <div className="flex flex-row space-x-5 mb-5">
          {(documentType === 'CIN') && (
            <>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-5 rounded-lg w-60 h-40 bg-[var(--bgSoft)] cursor-pointer" onClick={handleRectoClick}>
                <i className="fas fa-camera text-3xl text-gray-400 mb-3"></i>
                <span className="text-[var(--textSoft)]">Télécharger le recto</span>
                <span className="text-gray-400 text-sm">JPG, PNG ou PDF uniquement</span>
                <input type="file" ref={fileInputRectoRef} className="hidden" accept="image/jpeg,image/png,application/pdf" />
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-5 rounded-lg w-60 h-40 bg-[var(--bgSoft)] cursor-pointer" onClick={handleVersoClick}>
                <i className="fas fa-camera text-3xl text-gray-400 mb-3"></i>
                <span className="text-[var(--textSoft)]">Télécharger le verso</span>
                <span className="text-gray-400 text-sm">JPG, PNG ou PDF uniquement</span>
                <input type="file" ref={fileInputVersoRef} className="hidden" accept="image/jpeg,image/png,application/pdf" />
              </div>
            </>
          )}
          {(documentType === 'passport') && (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-5 rounded-lg w-60 h-40 bg-[var(--bgSoft)] cursor-pointer" onClick={handleRectoClick}>
              <i className="fas fa-camera text-3xl text-gray-400 mb-3"></i>
              <span className="text-[var(--textSoft)]">Télécharger votre passeport</span>
              <span className="text-gray-400 text-sm">JPG, PNG ou PDF uniquement</span>
              <input type="file" ref={fileInputRectoRef} className="hidden" accept="image/jpeg,image/png,application/pdf" />
            </div>
          )}
        </div>
        <button className="border-2 border-green-500 text-green-500 rounded-full px-8 py-3 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4">
          Envoyer mes documents
        </button>
      </div>
    </div>
  );
}

export default DocumentsPage;
