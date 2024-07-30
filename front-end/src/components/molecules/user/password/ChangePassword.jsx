"use client";
import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/changePassword.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/change-password',
        {
          current_password: currentPassword,
          new_password: newPassword,
          new_password_confirmation: confirmNewPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex flex-col lg:flex-row bg-[var(--bgSoft)] rounded-2xl font-bold text-[var(--textSoft)] shadow-2xl max-w-6xl mx-auto p-6 lg:p-12">
        {/* Password Change Form */}
        <div className="flex-1 bg-[var(--bgSoft)] rounded-xl p-6 lg:p-12 mb-6 lg:mb-0">
          <h2 className="text-3xl font-bold text-white mb-6 text-center text-gradient">
            Changer Mot de passe
          </h2>
          {message && <div className="text-red-500 mb-4 text-center">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {['current', 'new', 'confirm'].map((type) => (
                <div key={type} className="relative">
                  <label
                    htmlFor={`${type}Password`}
                    className="block text-sm font-bold mb-2"
                  >
                    {type === 'current' ? 'Mot de passe actuel *' :
                      type === 'new' ? 'Nouveau mot de passe *' :
                      'Retapez votre nouveau mot de passe *'}
                  </label>
                  <input
                    type={type === 'current' ? (showCurrentPassword ? 'text' : 'password') :
                      type === 'new' ? (showNewPassword ? 'text' : 'password') :
                      showConfirmNewPassword ? 'text' : 'password'}
                    id={`${type}Password`}
                    name={`${type}Password`}
                    value={type === 'current' ? currentPassword :
                      type === 'new' ? newPassword :
                      confirmNewPassword}
                    onChange={(e) => {
                      if (type === 'current') setCurrentPassword(e.target.value);
                      if (type === 'new') setNewPassword(e.target.value);
                      if (type === 'confirm') setConfirmNewPassword(e.target.value);
                    }}
                    placeholder={type === 'current' ? 'Mot de passe actuel' :
                      type === 'new' ? 'Nouveau mot de passe' :
                      'Confirmer mot de passe'}
                    className="bg-gray-100 text-sm p-3 border border-gray-300 rounded w-full"
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility(type)}
                  >
                    <i className={`fas ${type === 'current' ? (showCurrentPassword ? 'fa-eye-slash' : 'fa-eye') :
                      type === 'new' ? (showNewPassword ? 'fa-eye-slash' : 'fa-eye') :
                      showConfirmNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
              ))}
              <button
                type="submit"
                className={`border-2 rounded-full px-8 py-3 font-semibold transition-all duration-150 ease-linear ml-20 ${loading ? 'bg-green-400' : 'bg-green-500'} text-white hover:bg-green-600`}
                disabled={loading}
              >
                {loading ? 'Chargement...' : 'Modifier le mot de passe'}
              </button>
            </div>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="flex-1 bg-[var(--bgSoft)] text-white rounded-xl p-6 lg:p-12 mt-20">
          <h2 className="text-3xl font-bold mb-6 text-center text-gradient">
            Liez Mon Compte sur les Réseaux Sociaux
          </h2>
          <div className="space-y-4">
            <button className="flex items-center justify-center w-full py-3 text-lg font-bold text-white bg-blue-700 rounded hover:bg-blue-800 transition-all duration-150 ease-linear">
              <FaFacebookF className="mr-2 text-xl" /> Se connecter avec Facebook
            </button>
            <button className="flex items-center justify-center w-full py-3 text-lg font-bold text-white bg-red-600 rounded hover:bg-red-700 transition-all duration-150 ease-linear">
              <FaGoogle className="mr-2 text-xl" /> Liez avec Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
