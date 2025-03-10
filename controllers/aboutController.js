import { Profile } from '../models/index.js';
import aboutView from '../views/about.js';

export const getAboutPage = async (req, res) => {
  try {
    const aboutProfile = await Profile.findOne({ type: 'about' });

    if (req.query.format === 'json') {
      return res.json(aboutProfile);
    }
    const bio = aboutProfile ? aboutProfile.bio : 'About me information coming soon.';
    res.send(aboutView('About Me', bio));
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).send('Server Error');
  }
};
