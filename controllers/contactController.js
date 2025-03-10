import { Contact, Profile } from '../models/index.js';
import { contact as contactView, postContact as postContactView } from '../views/contact.js';

export const getContactPage = async (req, res) => {
  try {
    const contactProfile = await Profile.findOne({ type: 'contact' });

    if (req.query.format === 'json') {
      return res.json(contactProfile);
    }

    res.send(contactView('Contact Me'));
  } catch (error) {
    console.error('Error fetching contact data:', error);
    res.status(500).send('Server Error');
  }
};

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).send('All fields are required');
    }

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    res.send(
      postContactView('Contact Me', `<h1>Thank you for reaching out, ${name}!</h1><p>We'll get back to you soon at ${email}.</p>`)
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).send('Server Error');
  }
};
