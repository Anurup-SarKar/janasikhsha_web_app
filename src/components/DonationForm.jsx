// DonationForm.jsx
// Donation page and payment form for the Janasiksha Prochar Kendra website.
// Handles donation input, payment via Razorpay, and PDF receipt generation.

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import jsPDF from 'jspdf';

// Dynamically load Razorpay script
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * DonationForm component.
 * Handles donation form, payment, and PDF receipt.
 * - Only allows integer INR amounts
 * - Integrates Razorpay for payment
 * - Generates PDF receipt after payment
 * - Resets state on navigation/refresh
 */
export default function DonationForm() {
  const [form, setForm] = useState({ name: '', address: '', phone: '', email: '', amount: '' });
  const [submitted, setSubmitted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset state when component mounts (page navigation or refresh)
  useEffect(() => {
    setSubmitted(false);
    setPaymentSuccess(false);
    setForm({ name: '', address: '', phone: '', email: '', amount: '' });
  }, []);

  // Handle input changes
  function handleChange(e) {
    let { name, value } = e.target;
    if (name === 'amount') {
      value = value.replace(/[^\d]/g, '');
    }
    setForm({ ...form, [name]: value });
  }

  // Generate PDF receipt after payment
  function generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Donation Receipt', 70, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${form.name}`, 20, 40);
    doc.text(`Address: ${form.address}`, 20, 50);
    doc.text(`Phone: ${form.phone}`, 20, 60);
    doc.text(`Email: ${form.email}`, 20, 70);
    doc.text(`Amount: ₹${form.amount}`, 20, 80);
    doc.text('Thank you for your generous support!', 20, 100);
    doc.save('Donation_Receipt.pdf');
    // Change heading after PDF download
    setSubmitted(true);
  }

  // Handle payment via Razorpay
  async function handlePayment(e) {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || parseInt(form.amount) < 1) return;
    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load payment gateway.');
      setLoading(false);
      return;
    }
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: parseInt(form.amount) * 100,
      currency: 'INR',
      name: 'Janasiksha Prochar Kendra',
      description: 'Donation',
      handler: function () {
        setPaymentSuccess(true);
        setSubmitted(true);
        setLoading(false);
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: '#FF7F11' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  }

  return (
    <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" mb={2}>
        {submitted && paymentSuccess ? 'Thank You For Your Donation' : 'Make a Donation'}
      </Typography>
      {submitted && paymentSuccess ? (
        <Box textAlign="center">
          <Typography color="primary" fontWeight={600}>Thank you for your support, {form.name}!</Typography>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={generatePDF}>Download Receipt (PDF)</Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handlePayment} display="flex" flexDirection="column" gap={2}>
          <TextField name="name" label="Name" value={form.name} onChange={handleChange} required fullWidth />
          <TextField name="address" label="Address" value={form.address} onChange={handleChange} required fullWidth />
          <TextField name="phone" label="Phone" value={form.phone} onChange={handleChange} required fullWidth />
          <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required fullWidth />
          <TextField name="amount" label="Amount (INR)" type="number" value={form.amount} onChange={handleChange} required fullWidth inputProps={{ min: 1, step: 1, pattern: '[0-9]*' }} helperText="Enter whole rupees only (no decimals)" />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? 'Processing...' : 'Donate & Pay'}</Button>
        </Box>
      )}
    </Box>
  );
}
