import React from 'react';

const ContactForm = () => {
  return (
    <>
      <form
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="John Doe"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="john@gmail.com"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="message">Your Message</label>
          <textarea
            className="h-32 w-full p-2 border rounded"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button className="bg-green-700 p-3 text-white font-bold rounded" type="submit">
          Send
        </button>
      </form>
    </>
  );
}

export default ContactForm;
