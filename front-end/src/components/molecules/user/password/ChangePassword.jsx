"use client"
import React, { useState } from 'react';
import styles from '@/styles//changePassword.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const togglePasswordVisibility = (type) => {
    switch (type) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex-[5] bg-[var(--bgSoft)] rounded-2xl font-bold text-[var(--textSoft)] h-max shadow-2xl flex w-full max-w-6xl justify-center">
        <div className="w-3/5 p-5">
          <div className="py-10">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">
              Changer Mot de passe
            </h2>
            <div className="border-2 w-10 border-green-500 mx-auto mb-3"></div>
            <div className="flex flex-col items-center">
              <div className="bg-[var(--bgSoft)] w-72 p-2 flex flex-col mb-2">
                <label htmlFor="currentPassword" className="text-sm font-bold">
                  Mot de passe actuel *
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Mot de passe actuel"
                    className="bg-gray-100 outline-none text-sm p-3 border border-gray-300 rounded mt-1 w-full"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    <i className={`far ${showCurrentPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
              </div>
              <div className="bg-[var(--bgSoft)] w-72 p-2 flex flex-col mb-2">
                <label htmlFor="nouveauPassword" className="text-sm font-bold">
                  Nouveau mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="nouveauPassword"
                    name="nouveauPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nouveau mot de passe"
                    className="bg-gray-100 outline-none text-sm p-3 border border-gray-300 rounded mt-1 w-full"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    <i className={`far ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
              </div>
              <div className="bg-[var(--bgSoft)] w-72 p-2 flex flex-col mb-2">
                <label htmlFor="ConfirmNouveauPassword" className="text-sm font-bold">
                  Retapez votre nouveau mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    id="ConfirmNouveauPassword"
                    name="ConfirmNouveauPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirmer mot de passe"
                    className="bg-gray-100 outline-none text-sm p-3 border border-gray-300 rounded mt-1 w-full"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    <i className={`far ${showConfirmNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
              </div>
              <button className="border-2 border-green-500 text-green-500 rounded-full px-12 py-3 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4">
                Modifier le mot de passe
              </button>
            </div>
          </div>
        </div>
        <div className="w-3/5 bg-[var(--bgSoft)] text-white rounded-tr-2xl rounded-br-2xl py-32 px-12">
          <h2 className="text-3xl font-bold mb-2 text-center">
            LIEZ MON COMPTE SUR LES RÉSEAUX SOCIAUX
          </h2>
          <div className="border-2 w-10 border-green-500 mx-auto mb-4"></div>
          <div className="flex flex-col space-y-4">
            <button className="flex items-center justify-center w-full py-3 text-lg font-bold text-white bg-blue-700 rounded hover:bg-blue-800">
              <i className="fab fa-facebook-f mr-2"></i> Se connecter avec Facebook
            </button>
            <button className="flex items-center justify-center w-full py-3 text-lg font-bold text-white bg-red-600 rounded hover:bg-red-700">
              <i className="fab fa-google mr-2"></i> Liez avec Google
            </button>
            <button className="flex items-center justify-center w-full py-3 text-lg font-bold text-white bg-blue-400 rounded hover:bg-blue-500">
              <i className="fab fa-twitter mr-2"></i> Liez avec Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
