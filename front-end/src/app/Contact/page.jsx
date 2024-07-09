import React from 'react';
import ContactForm from '../../components/organisims/contact/ContactForm';
import Footer from '@/components/molecules/Footer';
import Navbar from '@/components/molecules/nav';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex justify-around items-center py-8">
          <div className="text-center flex flex-col items-center">
            <FaMapMarkerAlt className="text-yellow-500 text-4xl mb-2 mx-auto" />
            <h3 className="font-bold">Adresse</h3>
            <p>18 Rue Syrie, Manouba, Tunisie</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <FaPhoneAlt className="text-yellow-500 text-4xl mb-2 mx-auto" />
            <h3 className="font-bold">Tél</h3>
            <p>(+216) 28107403</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <FaEnvelope className="text-yellow-500 text-4xl mb-2 mx-auto" />
            <h3 className="font-bold">e-mail</h3>
            <p>contact@Association.tn</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactForm />
          <div>
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.9311074612075!2d10.19420801502221!3d36.86617388008269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd35a282feb6c7%3A0xa1a4e8b3d1944d34!2s8%20Rue%20Habib%20Chrita%2C%20Ariana!5e0!3m2!1sen!2stn!4v1689005097045!5m2!1sen!2stn"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
