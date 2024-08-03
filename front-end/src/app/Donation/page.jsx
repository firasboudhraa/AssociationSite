"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCreditCard, FaPaypal, FaCheckCircle } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import Navbar from '@/components/molecules/nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/DonationPage.module.css';

const DonationPage = () => {
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('one-time');
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [cardInfo, setCardInfo] = useState({
        card_number: '',
        card_holder: '',
        expiry_month: '',
        expiry_year: '',
        cvv: '',
        paypal_email: '' // for PayPal, if applicable
    });

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            setShowModal(true);
        } else {
            const userData = localStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                const userId = user.id;

                if (userId) {
                    axios.get(`http://localhost:8000/api/userCards/${userId}`, {
                        headers: { Authorization: `Bearer ${userToken}` }
                    })
                    .then(response => {
                        if (response.data) {
                            setCardInfo({
                                card_number: response.data.card_number || '',
                                card_holder: response.data.card_holder || '',
                                expiry_month: response.data.expiry_month || '',
                                expiry_year: response.data.expiry_year || '',
                                cvv: response.data.cvv || '',
                                paypal_email: response.data.paypal_email || ''
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching card data:', error);
                    });
                }
            }
        }
    }, []);

    const handleDonate = () => {
        const donationData = {
            amount,
            frequency,
            paymentMethod,
            message,
            cardInfo
        };

        axios.post('http://localhost:8000/api/donate', donationData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log('Donation successful:', response.data);
            // Handle success, e.g., show a success message or redirect
        })
        .catch(error => {
            console.error('Error processing donation:', error);
            // Handle error, e.g., show an error message
        });
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Navbar />
            <div className={styles.donationPage}>
                <header className={styles.header}>
                    <h1>Make a Difference: Donate Today</h1>
                    <p>Your support helps us change lives. Every contribution counts!</p>
                </header>

                <section className={styles.donationFormContainer}>
                    <div className={styles.donationForm}>
                        <h2>Donation Form</h2>
                        <div className={styles.card}>
                            <label className={styles.label}>
                                Donation Amount:
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="$100"
                                    className={styles.input}
                                />
                            </label>
                            <label className={styles.label}>
                                Frequency:
                                <select
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    className={styles.select}
                                >
                                    <option value="one-time">One-Time</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="annually">Annually</option>
                                </select>
                            </label>
                            <label className={styles.label}>
                                Payment Method:
                                <div className={styles.paymentOptions}>
                                    <button
                                        className={`${styles.paymentButton} ${paymentMethod === 'credit-card' ? styles.selected : ''}`}
                                        onClick={() => setPaymentMethod('credit-card')}
                                    >
                                        <FaCreditCard /> Credit Card
                                    </button>
                                    <button
                                        className={`${styles.paymentButton} ${paymentMethod === 'paypal' ? styles.selected : ''}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                    >
                                        <FaPaypal /> PayPal
                                    </button>
                                </div>
                            </label>

                            {paymentMethod === 'credit-card' && (
                                <div className={styles.cardDetails}>
                                    <label className={styles.label}>
                                        Card Number:
                                        <input
                                            type="text"
                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                            value={cardInfo.card_number}
                                            onChange={(e) => setCardInfo({ ...cardInfo, card_number: e.target.value })}
                                            className={styles.input}
                                        />
                                    </label>
                                    <label className={styles.label}>
                                        Card Holder:
                                        <input
                                            type="text"
                                            placeholder="Name on Card"
                                            value={cardInfo.card_holder}
                                            onChange={(e) => setCardInfo({ ...cardInfo, card_holder: e.target.value })}
                                            className={styles.input}
                                        />
                                    </label>
                                    <label className={styles.label}>
                                        Expiry Date:
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={`${cardInfo.expiry_month}/${cardInfo.expiry_year}`}
                                            onChange={(e) => {
                                                const [month, year] = e.target.value.split('/');
                                                setCardInfo({ ...cardInfo, expiry_month: month, expiry_year: year });
                                            }}
                                            className={styles.input}
                                        />
                                    </label>
                                    <label className={styles.label}>
                                        CVV:
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            value={cardInfo.cvv}
                                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                                            className={styles.input}
                                        />
                                    </label>
                                </div>
                            )}

                            {paymentMethod === 'paypal' && (
                                <div className={styles.paypalDetails}>
                                    <label className={styles.label}>
                                        PayPal Email:
                                        <input
                                            type="email"
                                            placeholder="your-email@example.com"
                                            value={cardInfo.paypal_email}
                                            onChange={(e) => setCardInfo({ ...cardInfo, paypal_email: e.target.value })}
                                            className={styles.input}
                                        />
                                    </label>
                                </div>
                            )}

                            <label className={styles.label}>
                                Message (Optional):
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Leave a personal message..."
                                    className={styles.textarea}
                                />
                            </label>
                            <button className={styles.donateButton} onClick={handleDonate}>
                                Donate Now
                            </button>
                        </div>
                    </div>
                </section>

                <section className={styles.impactInfo}>
                    <h2>What Your Donation Achieves</h2>
                    <p>Every dollar you donate helps us fund essential programs and services. Here’s how your donation will make a difference:</p>
                    <ul>
                        <li><FaCheckCircle className={styles.checkIcon} /> $25 provides essential supplies to a family in need.</li>
                        <li><FaCheckCircle className={styles.checkIcon} /> $50 supports educational programs for underprivileged children.</li>
                        <li><FaCheckCircle className={styles.checkIcon} /> $100 helps us expand our outreach efforts and impact more lives.</li>
                    </ul>
                </section>

                <section className={styles.successStories}>
                    <h2>Success Stories</h2>
                    <p>Read about the real-life impact of your donations and see how your support changes lives:</p>
                    <div className={styles.stories}>
                        {/* Add testimonials or stories here */}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <p>Contact us: support@example.com | 123-456-7890</p>
                    <div className={styles.socialLinks}>
                        {/* Add social media links here */}
                    </div>
                </footer>

                {/* Modal for authentication prompt */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-gray-800">Please Log In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-gray-600">
                        <p>You need to be logged in to donate. Please log in to continue.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={() => window.location.href = '/Connexion'}>Log In</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default DonationPage;
