'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Button, Container, Row, Col } from 'react-bootstrap';
import CardForm from '@/components/molecules/user/cardForm/cardForm'; // Adjust the import path accordingly
import Card from '@/components/molecules/user/card/Card';

interface CreditCard {
  id: number;
  card_number: string;
  card_holder: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

const EditCard = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [cardData, setCardData] = useState<CreditCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCardFlipped, setIsCardFlipped] = useState(false); // State to control card flip

  useEffect(() => {
    if (id) {
      fetchCardDetails(id);
    }
  }, [id]);

  async function fetchCardDetails(cardId: string) {
    try {
      const response = await axios.get<CreditCard>(`http://localhost:8000/api/cards/${cardId}`);
      setCardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching card details:', error);
      setLoading(false);
    }
  }

  async function updateCard(updatedCard: CreditCard) {
    try {
      await axios.put(`http://localhost:8000/api/cards/${updatedCard.id}`, updatedCard);
      router.push('/User/coordonnees-bancaires'); // Redirect to cards list after updating
    } catch (error) {
      console.error('Error updating card:', error);
    }
  }

  function handleUpdateCreditCard(name: keyof CreditCard, value: string) {
    if (cardData) {
      setCardData({ ...cardData, [name]: value });
    }
  }

  function handleFormSubmit() {
    if (cardData) {
      updateCard(cardData);
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cardData) {
    return <p>Card not found</p>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card
            cardHolder={cardData.card_holder}
            cardNumber={cardData.card_number}
            cardMonth={cardData.expiry_month}
            cardYear={cardData.expiry_year}
            cardCvv={cardData.cvv}
            isCardFlipped={isCardFlipped} 
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md={6}>
          <CardForm
            creditCard={cardData}
            onUpdateCreditCard={handleUpdateCreditCard}
            setIsCardFlipped={setIsCardFlipped}
            handleSubmit={handleFormSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EditCard;
