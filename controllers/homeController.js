import { Profile } from '../models/index.js';
import homeView from '../views/home.js';

export const getHomePage = async (req, res) => {
  try {

    const homeProfile  = await Profile.findOne({ type: 'home' });

    if (req.query.format === 'json') {
      return res.json(homeProfile);
    }

    const bio = homeProfile ? homeProfile.bio : 'Welcome to my portfolio website.';
    res.send(homeView('Welcome to My Node.js Portfolio', bio));
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).send('Server Error');
  }
};
