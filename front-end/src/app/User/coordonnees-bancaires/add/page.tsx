'use client';

import React, { Fragment, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Card from '@/components/molecules/user/card/Card';
import CardForm from '@/components/molecules/user/cardForm/cardForm';

interface CreditCard {
  card_number: string;
  card_holder: string;
  expiry_month: number;  
  expiry_year: number; 
  cvv: string;
}

const initialState: CreditCard = {
  card_number: '',
  card_holder: '',
  expiry_month: 1,
  expiry_year: 2024,
  cvv: '',
};

export default function AddCard() {
  const [creditCard, setCreditCard] = useState<CreditCard>(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [error, setError] = useState<string>(''); 
  const [success, setSuccess] = useState<string>(''); 
  const router = useRouter(); 

  const updateCreditCard = useCallback(
    (name: keyof CreditCard, value: string) => {
      setCreditCard(prevCard => ({
        ...prevCard,
        [name]: name === 'expiry_month' || name === 'expiry_year' ? parseInt(value, 10) : value,
      }));
    },
    []
  );

  const validateCardNumber = (cardNumber: string): boolean => {
    const reversedDigits = cardNumber.replace(/\D/g, '').split('').reverse().map(digit => parseInt(digit, 10));
    const sum = reversedDigits.reduce((acc, digit, idx) => {
      if (idx % 2 !== 0) {
        const doubled = digit * 2;
        return acc + (doubled > 9 ? doubled - 9 : doubled);
      } else {
        return acc + digit;
      }
    }, 0);

    return sum % 10 === 0;
  };

  const validateCvv = (cvv: string, cardNumber: string): boolean => {
    const cardType = cardNumber.startsWith('3') ? 'amex' : 'other';
    const cvvLength = cardType === 'amex' ? 4 : 3;
    return cvv.length === cvvLength;
  };

  const validateCardHolder = (cardHolder: string): boolean => {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(cardHolder) && cardHolder.trim().length > 0;
  };

  const handleSubmit = async () => {
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
  
      if (!validateCardNumber(creditCard.card_number)) {
        throw new Error('Invalid credit card number');
      }

      if (!validateCvv(creditCard.cvv, creditCard.card_number)) {
        throw new Error('Invalid CVV');
      }

      if (!validateCardHolder(creditCard.card_holder)) {
        throw new Error('Invalid card holder name');
      }

      const payload = {
        card_number: creditCard.card_number,
        card_holder: creditCard.card_holder,
        expiry_month: creditCard.expiry_month,
        expiry_year: creditCard.expiry_year,
        cvv: creditCard.cvv,
        user_id: userId
      };
  
      const response = await axios.post('http://localhost:8000/api/createCard', payload);
  
      router.push('/User/coordonnees-bancaires');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error adding credit card:', error);
    }
  };  

  return (
    <Fragment>
      <div className="add-card-content">
        <div className="wrapper">
          {/* Display the card component */}
          <Card
            cardNumber={creditCard.card_number}
            cardHolder={creditCard.card_holder}
            cardMonth={creditCard.expiry_month}
            cardYear={creditCard.expiry_year}
            cardCvv={creditCard.cvv}
            isCardFlipped={isCardFlipped}
          />
          <CardForm
            creditCard={creditCard}
            onUpdateCreditCard={updateCreditCard}
            setIsCardFlipped={setIsCardFlipped}
            handleSubmit={handleSubmit} 
          />
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
      </div>
    </Fragment>
  );
}
