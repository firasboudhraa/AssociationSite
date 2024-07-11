// components/molecules/user/cardForm/cardForm.tsx

import React, { useState } from 'react';

interface CreditCard {
  card_number: string;
  card_holder: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

interface CardFormProps {
  creditCard: CreditCard;
  onUpdateCreditCard: (name: keyof CreditCard, value: string) => void;
  setIsCardFlipped: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void; // This function will handle the form submission
}

const monthsArr = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const currentYear = new Date().getFullYear();
const yearsArr = Array.from({ length: 10 }, (_, i) => currentYear + i);

export default function CardForm({
  creditCard,
  onUpdateCreditCard,
  setIsCardFlipped,
  handleSubmit,
}: CardFormProps) {
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    cardMonth: '',
    cardYear: '',
    cardCvv: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    onUpdateCreditCard(name as keyof CreditCard, value);
  };

  const handleCvvFocus = () => setIsCardFlipped(true);
  const handleCvvBlur = () => setIsCardFlipped(false);

  const handleConfirm = () => {
    if (!validateForm()) {
      handleSubmit(); // Trigger the handleSubmit function passed from AddCard component
      clearForm(); // Optionally, clear the form fields after submission
    }
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    };
    let hasError = false;

    if (!creditCard.card_number) {
      newErrors.cardNumber = 'Card number is required';
      hasError = true;
    } else if (creditCard.card_number.length !== 16) {
      newErrors.cardNumber = 'Card number should be 16 digits';
      hasError = true;
    }

    if (!creditCard.card_holder) {
      newErrors.cardHolder = 'Card holder name is required';
      hasError = true;
    }

    if (!creditCard.expiry_month) {
      newErrors.cardMonth = 'Expiration month is required';
      hasError = true;
    }

    if (!creditCard.expiry_year) {
      newErrors.cardYear = 'Expiration year is required';
      hasError = true;
    }

    if (!creditCard.cvv) {
      newErrors.cardCvv = 'CVV is required';
      hasError = true;
    } else if (creditCard.cvv.length !== 3) {
      newErrors.cardCvv = 'CVV should be 3 digits';
      hasError = true;
    }

    setErrors(newErrors);
    return hasError;
  };

  const clearForm = () => {
    onUpdateCreditCard('card_number', '');
    onUpdateCreditCard('card_holder', '');
    onUpdateCreditCard('expiry_month', '');
    onUpdateCreditCard('expiry_year', '');
    onUpdateCreditCard('cvv', '');
    setErrors({
      cardNumber: '',
      cardHolder: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    });
  };

  return (
    <div className="card-form">
      <div className="card-input">
        <label htmlFor="card_number" className="card-input__label">
          Card Number
        </label>
        <input
          type="text"
          name="card_number"
          className="card-input__input"
          value={creditCard.card_number}
          onChange={handleInputChange}
          maxLength={16}
          autoComplete="off"
        />
        <div className="invalid-feedback">{errors.cardNumber}</div>
      </div>

      <div className="card-input">
        <label htmlFor="card_holder" className="card-input__label">
          Card Holder Name
        </label>
        <input
          type="text"
          name="card_holder"
          className="card-input__input"
          value={creditCard.card_holder}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <div className="invalid-feedback">{errors.cardHolder}</div>
      </div>

      <div className="card-form__group">
        <label htmlFor="expiry_month" className="card-input__label">
          Expiration Month
        </label>
        <select
          name="expiry_month"
          className="card-input__input"
          value={creditCard.expiry_month}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Month
          </option>
          {monthsArr.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors.cardMonth}</div>
      </div>

      <div className="card-form__group">
        <label htmlFor="expiry_year" className="card-input__label">
          Expiration Year
        </label>
        <select
          name="expiry_year"
          className="card-input__input"
          value={creditCard.expiry_year}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Year
          </option>
          {yearsArr.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors.cardYear}</div>
      </div>

      <div className="card-input">
        <label htmlFor="cvv" className="card-input__label">
          CVV (Security Code)
        </label>
        <input
          type="text"
          name="cvv"
          className="card-input__input"
          value={creditCard.cvv}
          onChange={handleInputChange}
          onFocus={handleCvvFocus}
          onBlur={handleCvvBlur}
          maxLength={3}
          autoComplete="off"
        />
        <div className="invalid-feedback">{errors.cardCvv}</div>
      </div>

      <div className="card-form__row">
        <div className="card-form__col">
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-primary" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
