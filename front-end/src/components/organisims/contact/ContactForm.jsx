import React from 'react';

const ContactForm = () => {
  return (
    <>
      <form className="py-4 mt-4 border-t flex flex-col gap-5">
        <div>
          <label htmlFor="fullname">Votre Prénom et Nom</label>
          <input
            type="text"
            id="fullname"
            placeholder="John Doe"
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label htmlFor="email">Votre e-mail</label>
          <input
            type="email"
            id="email"
            placeholder="john@gmail.com"
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label htmlFor="phone">Votre Téléphone</label>
          <input
            type="text"
            id="phone"
            placeholder="Votre Téléphone"
            className="w-full p-2 border rounded text-black"
          />
        </div>

        <div>
          <label htmlFor="subject"  placeholder="Sélectionnez l'objet de votre demande">Sélectionnez l'objet de votre demande</label>
          <select id="subject" className="w-full p-2 border rounded text-black">
            <option>Demamnde d'informations</option>
            <option>Demande de partenariat</option>
            <option>Reclamation</option>
            <option>Demande de Déblocage</option>
            <option>Autre sujet</option>
          </select>
        </div>

        <div>
          <label htmlFor="message">Votre message</label>
          <textarea
            className="h-32 w-full p-2 border rounded text-black"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button className="bg-yellow-500 p-3 text-white font-bold rounded" type="submit">
          Envoyer
        </button>
      </form>
    </>
  );
};

export default ContactForm;
