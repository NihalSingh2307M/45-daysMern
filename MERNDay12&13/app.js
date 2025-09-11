const express = require('express');
const app = express();
const dbConnection = require('./config/db');
const workExpModel = require('./models/workExp');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Basic validation middleware
const validateWorkExp = (req, res, next) => {
    const { company, position, startDate } = req.body;
    
    if (!company || !position || !startDate) {
        return res.status(400).json({
            success: false,
            message: 'Company, position, and start date are required'
        });
    }
    
    if (req.body.endDate && new Date(req.body.endDate) < new Date(startDate)) {
        return res.status(400).json({
            success: false,
            message: 'End date cannot be before start date'
        });
    }
    
    next();
};

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// CREATE - Naya work experience add karne ke liye
app.post('/register', validateWorkExp, async (req, res) => {
    try {
        const { company, position, startDate, endDate, current, technologies, achievement } = req.body;

        const workexp = await workExpModel.create({
            company: company.trim(),
            position: position.trim(),
            startDate: startDate,
            endDate: endDate || null,
            current: current === 'true' || current === true,
            technologies: technologies,
            achievement: achievement ? achievement.trim() : ''
        });

        res.status(201).json({
            success: true,
            message: 'Work experience created successfully',
            data: workexp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating work experience',
            error: error.message
        });
    }
});

// READ - Saara work experiences get karne ke liye
app.get('/get-users', async (req, res) => {
    try {
        const { company, position, current } = req.query;
        let filter = {};
        
        if (company) filter.company = { $regex: company, $options: 'i' };
        if (position) filter.position = { $regex: position, $options: 'i' };
        if (current !== undefined) filter.current = current === 'true';
        
        const workExp = await workExpModel.find(filter).sort({ startDate: -1 });
        
        res.json({
            success: true,
            count: workExp.length,
            data: workExp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching work experiences',
            error: error.message
        });
    }
});

app.get('/get-user/:id', async (req, res) => {
    try {
        const workExp = await workExpModel.findById(req.params.id);
        
        if (!workExp) {
            return res.status(404).json({
                success: false,
                message: 'Work experience not found'
            });
        }
        
        res.json({
            success: true,
            data: workExp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching work experience',
            error: error.message
        });
    }
});

// UPDATE - Work experience update karne ke liye
app.put('/update-user/:id', async (req, res) => {
    try {
        const { company, position, startDate, endDate, current, technologies, achievement } = req.body;
        
        if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                success: false,
                message: 'End date cannot be before start date'
            });
        }
        
        const updateData = {};
        if (company) updateData.company = company.trim();
        if (position) updateData.position = position.trim();
        if (startDate) updateData.startDate = startDate;
        if (endDate !== undefined) updateData.endDate = endDate || null;
        if (current !== undefined) updateData.current = current === 'true' || current === true;
        if (technologies !== undefined) updateData.technologies = technologies;
        if (achievement !== undefined) updateData.achievement = achievement ? achievement.trim() : '';
        
        const workExp = await workExpModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!workExp) {
            return res.status(404).json({
                success: false,
                message: 'Work experience not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Work experience updated successfully',
            data: workExp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating work experience',
            error: error.message
        });
    }
});

app.put('/update-user', async (req, res) => {
    try {
        const { company, position } = req.body;
        
        if (!company || !position) {
            return res.status(400).json({
                success: false,
                message: 'Company and position are required'
            });
        }
        
        const workExp = await workExpModel.findOneAndUpdate(
            { company: company },
            { position: position },
            { new: true }
        );

        if (!workExp) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        res.json({
            success: true,
            message: 'User updated successfully',
            data: workExp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

// DELETE - Work experience delete karne ke liye
app.delete('/delete-user/:id', async (req, res) => {
    try {
        const workExp = await workExpModel.findByIdAndDelete(req.params.id);
        
        if (!workExp) {
            return res.status(404).json({
                success: false,
                message: 'Work experience not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Work experience deleted successfully',
            data: workExp
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting work experience',
            error: error.message
        });
    }
});


app.delete('/delete-user', async (req, res) => {
    try {
        const { company } = req.body;
        
        if (!company) {
            return res.status(400).json({
                success: false,
                message: 'Company is required'
            });
        }
        
        const deleted = await workExpModel.findOneAndDelete({ company: company });
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }
        
        res.json({
            success: true,
            message: 'User deleted successfully',
            data: deleted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: error.message
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});