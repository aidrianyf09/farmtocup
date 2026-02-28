const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    // Log contact form submission (email notification can be added later with Nodemailer)
    const { name, email, phone, message, subject } = req.body;
    console.log('Contact form submission:', { name, email, phone, subject });
    res.json({ message: 'Message received! We will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
