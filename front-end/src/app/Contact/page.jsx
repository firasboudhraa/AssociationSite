import React from 'react'
import ContactForm from '../../components/organisims/contact/ContactForm'
import Footer from "@/components/molecules/Footer";
import Navbar from '@/components/molecules/nav';


const ContactPage = () => {
  return (
    <>
    <Navbar/>
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>Please fill in the form below</p>

      <ContactForm />
    </div>
    <Footer/>
    </>
  )
}

export default ContactPage
