// src/components/Support.js
import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../firebase';

const Support = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firestore = getFirestore(app);
    try {
      await addDoc(collection(firestore, 'supportTickets'), {
        email,
        subject,
        message,
        createdAt: new Date(),
      });
      setSuccess('Your support ticket has been submitted!');
      setError('');
    } catch (err) {
      setError('Failed to submit support ticket. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Container>
      <h2>Support</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe your issue"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Support;
