const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for appointments (for simplicity)
let appointments = [];

// Root route to serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle appointment booking
app.post('/api/book-appointment', (req, res) => {
    const appointment = req.body;
    if (appointment.name && appointment.number && appointment.email && appointment.date) {
        appointments.push(appointment);
        res.status(200).send('Appointment booked successfully,Thank You for booking an appointment');
    } else {
        res.status(400).send('Missing required fields');
    }
});

// Route to get all appointments
app.get('/api/appointments', (req, res) => {
    res.json(appointments);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
