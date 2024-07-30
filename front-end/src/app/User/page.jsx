"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";
import Image from "next/image";

const DashboardUser = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    photo: "",
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
        email: user.email || "",
        password: user.password || "",
        photo: user.photo || "",
      });
    }
  }, []);

  const handleMesCoordonneesClick = () => {
    router.push("/User/mes-informations");
  };

  const handleMesInformationsClick = () => {
    router.push("/User/mot-de-passe");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* User Profile Card */}
      <div className="card bg-[var(--bgSoft)] text-white rounded-lg p-6 flex flex-col items-center shadow-lg">
        <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-green-500 mt-10">
          <Image
            src={userData.photo || "/noavatar.jpg"}
            alt="Profile Photo"
            width={96}
            height={96}
            className="object-cover w-full h-full"
          />
        </div>
        <button
          className="border-2 border-green-500 text-green-500 rounded-full px-4 py-2 font-semibold hover:bg-green-500 hover:text-white transition-all duration-150 ease-linear"
          onClick={handleMesCoordonneesClick}
        >
          Modifier
        </button>
      </div>

      {/* Information Cards */}
      <div className="flex flex-col gap-6 lg:flex-row lg:w-full lg:gap-6">
        {/* Coordonnées */}
        <div className="card bg-[var(--bgSoft)] text-white rounded-lg p-6 flex-1 shadow-lg">
          <h2 className="text-3xl font-extrabold text-gradient mb-4">Mes Coordonnées</h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold text-lg text-green-400 w-32">Nom : </span>
              <span>{userData.name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-lg text-green-400 w-32">Adresse : </span>
              <span>{userData.address}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-lg text-green-400 w-32">Téléphone : </span>
              <span>{userData.phone}</span>
            </div>
          </div>
          <button
            className="border-2 border-green-500 text-green-500 rounded-full px-4 py-2 font-semibold hover:bg-green-500 hover:text-white transition-all duration-150 ease-linear mt-4"
            onClick={handleMesCoordonneesClick}
          >
            Modifier
          </button>
        </div>

        {/* Informations */}
        <div className="card bg-[var(--bgSoft)] text-white rounded-lg p-6 flex-1 shadow-lg">
          <h2 className="text-3xl font-extrabold text-gradient mb-4">Mes Informations</h2>
          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold text-lg text-green-400 w-32">Email : </span>
              <span>{userData.email}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-lg text-green-400 w-32">Mot de passe : </span>
              <span className="ml-10">**************</span> 
            </div>
            <div className="flex">
              <span className="font-semibold text-lg text-green-400 w-32">Comptes associés : </span>
              <div className="flex gap-3 mt-2 ml-10">
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 hover:border-blue-600 transition-all duration-150 ease-linear"
                >
                  <FaFacebookF className="text-blue-600 text-xl" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 hover:border-red-500 transition-all duration-150 ease-linear"
                >
                  <FaGoogle className="text-red-500 text-xl" />
                </a>
              </div>
            </div>
          </div>
          <button
            className="border-2 border-green-500 text-green-500 rounded-full px-4 py-2 font-semibold hover:bg-green-500 hover:text-white transition-all duration-150 ease-linear mt-4"
            onClick={handleMesInformationsClick}
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
