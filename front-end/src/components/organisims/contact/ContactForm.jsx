"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);
  const handleShowConfirmModal = () => setShowConfirmModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem('token');
    if (!userToken) {
      handleShowModal();
      return;
    }

    setFormData({ fullname, email, phone, subject, message });
    handleShowConfirmModal();
  };

  const handleConfirmSubmit = async () => {
    const userToken = localStorage.getItem('token');

    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        throw new Error('User data not found in local storage');
      }

      const user = JSON.parse(userData);
      const userId = user.id;

      if (!userId) {
        throw new Error('User ID not found in user data');
      }

      await axios.post('http://localhost:8000/api/createContact', {
        fullname,
        email,
        phone,
        subject,
        message,
        user_id: userId
      });

      toast.success('Your message has been sent successfully!');
      setFullname('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      handleCloseConfirmModal();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <>
      <form className="py-4 mt-4 border-t flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Votre Prénom et Nom</label>
          <input
            type="text"
            id="fullname"
            placeholder="John Doe"
            className="w-full p-2 border rounded text-black"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="john@gmail.com"
            className="w-full p-2 border rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone">Votre Téléphone</label>
          <input
            type="text"
            id="phone"
            placeholder="Votre Téléphone"
            className="w-full p-2 border rounded text-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="subject">Sélectionnez l'objet de votre demande</label>
          <select
            id="subject"
            className="w-full p-2 border rounded text-black"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Demande d'informations">Demande d'informations</option>
            <option value="Demande de partenariat">Demande de partenariat</option>
            <option value="Réclamation">Réclamation</option>
            <option value="Demande de Déblocage">Demande de Déblocage</option>
            <option value="Autre sujet">Autre sujet</option>
          </select>
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            className="h-32 w-full p-2 border rounded text-black"
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button className="bg-yellow-500 p-3 text-white font-bold rounded hover:bg-yellow-600 transition-colors duration-300" type="submit">
          Envoyer
        </button>
      </form>

      {/* Modal for authentication prompt */}
      <Modal show={showModal} onHide={handleCloseModal} centered className="modal-custom">
        <Modal.Header closeButton className="bg-yellow-500 text-white">
          <Modal.Title className="text-lg font-bold">Please Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-gray-800">
          <p>You need to be logged in to submit a message. Please log in to continue.</p>
        </Modal.Body>
        <Modal.Footer className="bg-gray-100">
          <Button variant="primary" onClick={() => window.location.href = '/Connexion'} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Log In
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered className="modal-custom">
        <Modal.Header className="bg-gray-200">
          <Modal.Title className="text-lg font-bold">Confirm Your Message</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-gray-800">
          <p><strong>Full Name:</strong> {formData.fullname}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Subject:</strong> {formData.subject}</p>
          <p><strong>Message:</strong> {formData.message}</p>
          <p>Are you sure you want to send this message?</p>
        </Modal.Body>
        <Modal.Footer className="bg-gray-100">
          <Button variant="secondary" onClick={handleCloseConfirmModal} className="bg-gray-500 hover:bg-gray-600 text-white">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSubmit} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default ContactForm;
