"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { Button, Col, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

interface CreditCard {
  id: number;
  card_number: string;
  card_holder: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

export default function Cards() {
  const router = useRouter();
  const [cardsData, setCardsData] = useState<CreditCard[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get<CreditCard[]>('http://localhost:8000/api/cards'); // Fetch cards from backend API
      setCardsData(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  }

  async function deleteCard(id: number) {
    try {
      await axios.delete(`http://localhost:8000/api/cards/${id}`); // Delete card via backend API
      setCardsData(cardsData.filter(card => card.id !== id)); // Update state after deletion
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  return (
    <>
      <h1 className="home-page-heading">Your Cards</h1>
      <Container>
        <Row className="justify-content-center">
          {cardsData.length === 0 && (
            <Card style={{ width: '50%', margin: '25px' }}>
              <Card.Body>
                <Card.Title>No card exists</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Go to add card to create a new card.
                </Card.Subtitle>
                <Card.Text>
                  You can add, edit, and delete cards at any time.
                </Card.Text>
                <Link href="/User/coordonnes-bancaires/add">Add Card</Link>
              </Card.Body>
            </Card>
          )}

          {cardsData.map(card => (
            <Col md={4} key={card.id} className="mb-3">
              <Link href={`/cards/${card.id}/edit`} className="col-md-3 credit-card">
                <Card>
                  <Card.Body>
                    <Card.Title>{card.card_number}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{card.card_holder}</Card.Subtitle>
                    <Card.Text>Expires: {card.expiry_month}/{card.expiry_year}</Card.Text>
                    <Button variant="danger" onClick={() => deleteCard(card.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        <Row className="justify-content-center">
          <Col md={4} className="mt-3">
            <Button
              className="add-new-card"
              variant="primary"
              size="lg"
              onClick={() => router.push('/User/coordonnees-bancaires/add')}
            >
              Add New Card
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
