import express from 'express';
import mongoose, { startSession } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//importing mongoose model
import Experience from './models/Experience.js';

// load env varibale from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//--------MIDDLEWARE----------

//request from frontend
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
}));

// to read jason fromat from the aquired data
app.use(express.json());

//-----------database conn ------------

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected:${conn.connection.host}`);
    } catch (error) {
        console.error(`error connecting to monogdb :${error.message}`);
        process.exit(1);
    }
};

//-------api routes crud operations ----------------

// create --post
app.post('/api/experience', async (req, res) => {
    try {
        const newExperience = await Experience.create(req.body);
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(400).json({ message: 'error creating experience', error: error.message })
    }
});


//read --get all and filter
app.get('/api/experience', async (req, res) => {
    try {
        const { jobTitle, companyName, isCurrent } = req.query;

        let filter = {}
        if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: 'i' };
        if (companyName) filter.companyName = { $regex: companyName, $options: 'i' };
        if (isCurrent) filter.isCurrent = isCurrent === 'true';

        //sort by start date (newest first)
        const experiences = await Experience.find(filter).sort({ startDate: -1 });
        res.status(200).json(experiences);
    } catch (err) {
        res.status(500).json({ message: 'error fetching experice', error: err.message });
    }
});

//read --get by id
app.get('/api/experience/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'invalid id format' });
        }
        const experience = await Experience.findById(id);
        if (!experience) {
            return res.status(404).json({ message: 'experience not found' });
        }
        res.status(200).json(experience);
    } catch (err) {
        res.status(500).json({ message: 'error fetching experience', error: err.message });
    }
});

//------update--put
app.put('/api/experience/:id', async (req, res) => {
    try {

        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const updatedExperience = await Experience.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedExperience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(200).json(updatedExperience);
    } catch (err) {
        res.status(400).json({ message: 'Error updating experience', error: err.message });
    }
});


//-------delete---
app.delete('/api/experience/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const deletedExperience = await Experience.findByIdAndDelete(id);

        if (!deletedExperience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting experience', error: err.message });
    }
});

//--------start server----------

connectDB().then(() =>{
    app.listen(PORT,() =>{
        console.log(`server runnning on http://localhost:${PORT}`);
    });
});