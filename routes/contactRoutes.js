import express from 'express';
import { getContactPage, submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

router.get('/', getContactPage);
router.post('/', submitContactForm);

export default router;
