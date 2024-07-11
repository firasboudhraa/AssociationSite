"use client"
import React, { Fragment, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Card from '@/components/molecules/user/card/Card';
import CardForm from '@/components/molecules/user/cardForm/cardForm';

// Define the CreditCard interface
interface CreditCard {
  card_number: string;
  card_holder: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

// Initial state for CreditCard interface
const initialState: CreditCard = {
  card_number: '',
  card_holder: '',
  expiry_month: '',
  expiry_year: '',
  cvv: '',
};

// Main AddCard component
export default function AddCard() {
  // State variables
  const [creditCard, setCreditCard] = useState<CreditCard>(initialState);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [error, setError] = useState<string>(''); // State to handle errors
  const router = useRouter(); // Next.js router instance

  // Update credit card state function
  const updateCreditCard = useCallback(
    (name: keyof CreditCard, value: string) => {
      setCreditCard(prevCard => ({
        ...prevCard,
        [name]: value,
      }));
    },
    []
  );

  // Handle form submission function
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create', {
        card_number: creditCard.card_number,
        card_holder: creditCard.card_holder,
        expiry_month: creditCard.expiry_month,
        expiry_year: creditCard.expiry_year,
        cvv: creditCard.cvv,
      });

      router.push('/User/coordonnees-bancaires');
    } catch (error) {
      // Handle error in API call
      setError('Failed to add credit card. Please try again.');
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
        </div>
      </div>
    </Fragment>
  );
}
