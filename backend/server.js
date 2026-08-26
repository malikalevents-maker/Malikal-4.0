require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Contact = require('./models/Contact')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// ── MongoDB Connection ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected to malikalDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })

// ── Health Check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Malikal backend is running')
})

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, phoneNumber, email, eventType, message } = req.body

    // Validate required fields
    if (!fullName || !phoneNumber || !eventType) {
      return res.status(400).json({
        error: 'fullName, phoneNumber, and eventType are required'
      })
    }

    const contact = new Contact({ fullName, phoneNumber, email, eventType, message })
    await contact.save()

    return res.status(201).json({
      message: 'Contact form submitted successfully!',
      contact
    })
  } catch (err) {
    console.error('POST /api/contact error:', err.message)

    if (err.name === 'ValidationError') {
      const details = Object.values(err.errors).map((e) => e.message)
      return res.status(400).json({ error: 'Validation failed', details })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
})

// ── GET /api/contact ──────────────────────────────────────────────────────────
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    return res.status(200).json({ contacts })
  } catch (err) {
    console.error('GET /api/contact error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// ── DELETE /api/contact/:id ───────────────────────────────────────────────────
app.delete('/api/contact/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' })
    }
    return res.status(200).json({ message: 'Contact deleted successfully' })
  } catch (err) {
    console.error('DELETE /api/contact/:id error:', err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Malikal backend listening on http://localhost:${PORT}`)
})
