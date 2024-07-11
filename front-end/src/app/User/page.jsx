"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaGoogle } from "react-icons/fa";

const DashboardUser = () => {
  const router = useRouter();

  const handleMesCoordonneesClick = () => {
    router.push("/User/mes-informations");
  };

  const handleMesInformationsClick = () => {
    router.push("/User/mot-de-passe");
  };

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="card bg-[var(--bgSoft)] text-white rounded-box grid h-max place-items-center mb-2">
          <h2 className="text-3xl font-bold mb-2">Notifications</h2>
          <div className="border-2 w-20 border-green-500 mb-3"></div>
          <p></p>
          <button className="border-2 border-green-500 text-green-500 rounded-full px-12 py-3 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4">
            Modifier
          </button>
        </div>
        <div className="divider"></div>
        <div className="card bg-[var(--bgSoft)] text-white rounded-box grid h-max place-items-center mb-2">
          <h2 className="text-3xl font-bold mb-2">Mes Participations</h2>
          <div className="border-2 w-20 border-green-500 mb-3"></div>
          <p></p>
        </div>
        <div className="divider"></div>
      </div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-[var(--bgSoft)] text-white rounded-box grid h-max flex-grow place-items-center mr-2">
          <h2 className="text-3xl font-bold">Mes Coordonnées</h2>
          <div className="border-2 w-20 border-green-500 mb-3"></div>
          <div className="text-left mb-2">
            <div className="mb-2">
              <span className="font-bold">Nom : </span>
              <span>{}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Prénom : </span>
              <span>{}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Adresse : </span>
              <span>{}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Téléphone : </span>
              <span>{}</span>
            </div>
          </div>
          <button
            className="border-2 border-green-500 text-green-500 rounded-full px-12 py-3 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4"
            onClick={handleMesCoordonneesClick}
          >
            Modifier
          </button>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-[var(--bgSoft)] text-white rounded-box grid h-max flex-grow place-items-center">
          <h2 className="text-3xl font-bold ">Mes Informations</h2>
          <div className="border-2 w-20 border-green-500 mb-3"></div>
          <div className="text-left mb-2">
            <div className="mb-2">
              <span className="font-bold">Email : </span>
              <span>{}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Password : </span>
              <span>{}</span>
            </div>
            <div className="mb-2">
              <span className="font-bold">Comptes associés : </span>
              <div className="flex justify-center my-2">
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 mx-1"
                >
                  <FaFacebookF className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 mx-1"
                >
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a
                  href="#"
                  className="border-2 border-gray-300 rounded-full p-3 mx-1"
                >
                  <FaGoogle className="text-sm" />
                </a>
              </div>
            </div>
          </div>
          <button
            className="border-2 border-green-500 text-green-500 rounded-full px-12 py-3 inline-block font-semibold hover:bg-green-500 hover:text-white mt-4"
            onClick={handleMesInformationsClick}
          >
            Modifier
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardUser;
