
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Profile from '../models/Profile.js';
import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const profilesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'your_db.profiles.json'), 'utf-8')
);
const projectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'your_db.projects.json'), 'utf-8')
);


const importData = async () => {
  try {

    await connectDB();

    await Profile.deleteMany({});
    await Project.deleteMany({});
    
    console.log('🗑️ Existing data cleared');

    const profilesToInsert = profilesData.map(profile => {
      const { _id, ...profileData } = profile;
      return profileData;
    });
    
    const projectsToInsert = projectsData.map(project => {
      const { _id, ...projectData } = project;
      return projectData;
    });

    await Profile.insertMany(profilesToInsert);
    console.log('✅ Profiles data imported successfully');
    
    await Project.insertMany(projectsToInsert);
    console.log('✅ Projects data imported successfully');
    
    console.log('🚀 Data import completed');
    

    process.exit();
  } catch (error) {
    console.error(`❌ Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await connectDB();

    await Profile.deleteMany({});
    await Project.deleteMany({});
    
    console.log('🗑️ All data deleted successfully');

    process.exit();
  } catch (error) {
    console.error(`❌ Error deleting data: ${error.message}`);
    process.exit(1);
  }
};


if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
