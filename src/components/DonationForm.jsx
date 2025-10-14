// DonationForm.jsx
// Donation page and payment form for the Janasiksha Prochar Kendra website.
// Handles donation input, payment via Razorpay, and PDF receipt generation.

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

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

// Store Razorpay API Key as constant (replace with your actual key)
const API_KEY = 'rzp_test_RT3flTWZYGNAci';

// Optional org info to display on 80G receipt (fill real values when available)
const ORG_INFO = {
  PAN: 'AAATK7667F',
  EIGHTYG_NO: 'AAATK7667FE1985001',
  REG_12A: 'AAATK7667FE19850',
  PLACE: 'Kolkata',
};

export default function DonationForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', address: '', phone: '', email: '', pan: '', amount: '' });
  const [submitted, setSubmitted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [paymentId, setPaymentId] = useState('');

  // Reset state when component mounts (page navigation or refresh)
  useEffect(() => {
    setSubmitted(false);
    setPaymentSuccess(false);
    setFailureMessage('');
    setOrderId('');
    setPaymentId('');
    setForm({ name: '', address: '', phone: '', email: '', pan: '', amount: '' });
  }, []);

  // Handle input changes
  function handleChange(e) {
    let { name, value } = e.target;
    if (name === 'amount') {
      value = value.replace(/[^\d]/g, '');
    }
    if (name === 'pan') {
      value = value.toUpperCase();
    }
    setForm({ ...form, [name]: value });
  }

  const formatAmountINR = (val) => {
    const n = Number(val || 0);
    return n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  // Convert amount to words (Indian numbering system)
  function numberToWordsIndian(num) {
    num = Math.floor(Number(num) || 0);
    if (num === 0) return 'Zero';

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const inWordsUptoHundred = (n) => {
      if (n < 20) return a[n];
      const tens = Math.floor(n / 10);
      const ones = n % 10;
      return b[tens] + (ones ? ' ' + a[ones] : '');
    };

    let words = '';
    const crore = Math.floor(num / 10000000);
    num %= 10000000;
    const lakh = Math.floor(num / 100000);
    num %= 100000;
    const thousand = Math.floor(num / 1000);
    num %= 1000;
    const hundred = Math.floor(num / 100);
    const rest = num % 100;

    if (crore) words += inWordsUptoHundred(crore) + ' Crore ';
    if (lakh) words += inWordsUptoHundred(lakh) + ' Lakh ';
    if (thousand) words += inWordsUptoHundred(thousand) + ' Thousand ';
    if (hundred) words += a[hundred] + ' Hundred ';
    if (rest) words += (words ? 'and ' : '') + inWordsUptoHundred(rest) + ' ';

    return words.trim();
  }

  // Generate PDF receipt after payment (formal 80G-style layout using jsPDF primitives)
  function generatePDF() {
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    // Header (org name and contact)
    doc.setTextColor('#111827');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Janasiksha Prochar Kendra', margin, 18);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('89, Elliot Road, Kolkata - 700016, West Bengal, India', margin, 26);
    doc.text('Email: info@jpk.org • Phone: +91 33 2229 3292', margin, 32);

    // Title
    const title = 'RECEIPT U/S 80G OF INCOME TAX ACT, 1961';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(title, pageWidth / 2, 44, { align: 'center' });

    // Org compliance quick facts row under title
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const compY = 52;
    const infoLine = `Trust PAN: ${ORG_INFO.PAN || '-'}    80G Regn No: ${ORG_INFO.EIGHTYG_NO || '-'}    12A Regn No: ${ORG_INFO.REG_12A || '-'}`;
    doc.text(infoLine, margin, compY);

    // Info card box
    const boxTop = compY + 6;
    const boxLeft = margin;
    const boxWidth = pageWidth - margin * 2;
    const boxHeight = 142;
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.4);
    doc.roundedRect(boxLeft, boxTop, boxWidth, boxHeight, 2, 2, 'S');

    // Helpers
    const label = (x, y, text) => {
      doc.setTextColor('#4b5563');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(text, x, y);
    };
    const value = (x, y, text) => {
      doc.setTextColor('#111827');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11.5);
      doc.text(text, x, y);
    };

    const rupees = parseInt(form.amount || '0', 10);
    const words = numberToWordsIndian(rupees);

    let y = boxTop + 12;
    const col1 = boxLeft + 8;
    const col2 = boxLeft + boxWidth / 2 + 2;

    // Top meta
    label(col1, y, 'Receipt No');
    value(col1, y + 6, orderId || 'N/A');
    label(col2, y, 'Date');
    value(col2, y + 6, new Date().toLocaleDateString());
    y += 18;

    // Donor details
    label(col1, y, 'Name of Donor');
    value(col1, y + 6, form.name || '-');
    label(col2, y, 'PAN of Donor');
    value(col2, y + 6, form.pan || '-');
    y += 18;

    label(col1, y, 'Email');
    value(col1, y + 6, form.email || '-');
    label(col2, y, 'Phone');
    value(col2, y + 6, form.phone || '-');
    y += 18;

    label(col1, y, 'Address');
    doc.setTextColor('#111827');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11.5);
    const addrLines = doc.splitTextToSize(form.address || '-', boxWidth - 16);
    doc.text(addrLines, col1, y + 6);
    y += Math.max(18, 6 + (addrLines.length - 1) * 6 + 12);

    // Separator
    doc.setDrawColor(230, 230, 230);
    doc.line(boxLeft + 4, y - 4, boxLeft + boxWidth - 4, y - 4);

    // Amount & payment info
    label(col1, y, 'Amount (INR)');
    value(col1, y + 8, `₹ ${formatAmountINR(rupees)}`);
    label(col2, y, 'Amount (in words)');
    value(col2, y + 8, `Rupees ${words} only`);
    y += 20;

    label(col1, y, 'Purpose');
    value(col1, y + 6, 'Donation');
    label(col2, y, 'Mode of Payment');
    value(col2, y + 6, 'Online (Razorpay)');
    y += 18;

    label(col1, y, 'Transaction Ref');
    value(col1, y + 6, paymentId || '—');
    label(col2, y, 'Place');
    value(col2, y + 6, ORG_INFO.PLACE || '-');
    y += 18;

    // 80G exemption and electronic receipt note (styled box below details)
    const notesTop = boxTop + boxHeight + 10;
    const note1 = "The Donation is exempted u/s 80G of the Income Tax Act 1961 as per the Central Board of Direct Tax's notification No. SO 1337 dt. 15.04.1965.";
    const note2 = 'This is an electronically generated receipt, no signature is required.';
    const wrapped1 = doc.splitTextToSize(note1, boxWidth - 12);
    const wrapped2 = doc.splitTextToSize(note2, boxWidth - 12);
    const notesHeight = 18 + (wrapped1.length + wrapped2.length) * 6 + 4;

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(230, 230, 230);
    doc.roundedRect(boxLeft, notesTop, boxWidth, notesHeight, 3, 3, 'FD');

    doc.setTextColor('#111827');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Important Notes', boxLeft + 6, notesTop + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor('#374151');
    let ny = notesTop + 14;
    doc.text(wrapped1, boxLeft + 6, ny);
    ny += wrapped1.length * 6 + 3;
    doc.text(wrapped2, boxLeft + 6, ny);

    doc.save(`JPK_Donation_Receipt_${orderId || Date.now()}.pdf`);
    setSubmitted(true);
  }

  // Handle payment via Razorpay
  async function handlePayment(e) {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || parseInt(form.amount) < 1) return;

    // Generate a random local order id starting with jpk
    const localOrderId = `jpk_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    setOrderId(localOrderId);

    if (!API_KEY) {
      alert('Razorpay API Key is not configured.');
      return;
    }

    setLoading(true);
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load payment gateway.');
      setLoading(false);
      return;
    }
    const options = {
      key: API_KEY,
      amount: parseInt(form.amount) * 100,
      currency: 'INR',
      name: 'Janasiksha Prochar Kendra',
      description: 'Donation',
      // Use handler to show success UI (client-side)
      handler: function (response) {
        // Capture Razorpay payment id if available
        if (response && response.razorpay_payment_id) {
          setPaymentId(response.razorpay_payment_id);
        } else {
          setPaymentId('');
        }
        setPaymentSuccess(true);
        setSubmitted(true);
        setFailureMessage('');
        setLoading(false);
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        donor_name: form.name,
        donor_email: form.email,
        donor_pan: form.pan || '',
        local_order_id: localOrderId,
      },
      theme: { color: '#FF7F11' },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      setFailureMessage(response?.error?.description || 'Payment failed. Please try again.');
      setPaymentSuccess(false);
      setSubmitted(true);
      setLoading(false);
    });
    rzp.open();
  }

  const resetForm = () => {
    setSubmitted(false);
    setPaymentSuccess(false);
    setFailureMessage('');
    setOrderId('');
    setForm({ name: '', address: '', phone: '', email: '', pan: '', amount: '' });
  };

  return (
    <>
      <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 }, mb: 3, maxWidth: 400, mx: 'auto' }}>
        <Typography variant="h4" mb={2}>
          {submitted && paymentSuccess ? 'Thank You For Your Donation' : 'Make a Donation'}
        </Typography>
        {submitted && paymentSuccess ? (
          <Box textAlign="center">
            <Typography color="primary" fontWeight={600}>Thank you for your support, {form.name}!</Typography>
            {orderId && (
              <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">Order ID: {orderId}</Typography>
            )}
            <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={generatePDF}>Download Receipt (PDF)</Button>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button variant="contained" onClick={resetForm}>Donate More</Button>
              <Button variant="text" onClick={() => navigate('/')}>Go Home</Button>
            </Box>
          </Box>
        ) : submitted && !paymentSuccess ? (
          <Box textAlign="center">
            <Typography color="error" fontWeight={700}>Payment Failed</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{failureMessage || 'Your payment could not be completed.'}</Typography>
            {orderId && (
              <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">Order ID: {orderId}</Typography>
            )}
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button variant="contained" onClick={resetForm}>Donate More</Button>
              <Button variant="text" onClick={() => navigate('/')}>Go Home</Button>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={handlePayment} display="flex" flexDirection="column" gap={2}>
            <TextField name="name" label="Name" value={form.name} onChange={handleChange} required fullWidth />
            <TextField name="address" label="Address" value={form.address} onChange={handleChange} required fullWidth />
            <TextField name="phone" label="Phone" value={form.phone} onChange={handleChange} required fullWidth />
            <TextField name="email" label="Email" type="email" value={form.email} onChange={handleChange} required fullWidth />
            <TextField name="pan" label="PAN (optional)" value={form.pan} onChange={handleChange} fullWidth inputProps={{ style: { textTransform: 'uppercase' } }} />
            <TextField name="amount" label="Amount (INR)" type="number" value={form.amount} onChange={handleChange} required fullWidth inputProps={{ min: 1, step: 1, pattern: '[0-9]*' }} helperText="Enter whole rupees only (no decimals)" />
            <Button type="submit" variant="contained" color="secondary" disabled={loading} startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}>
              {loading ? 'Processing...' : 'Donate & Pay'}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}
