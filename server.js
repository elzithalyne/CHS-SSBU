const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());


// Serve static files from the project folder
app.use(express.static(__dirname));

// Path to the JSON file
const dataFilePath = path.join(__dirname, 'competitors.json');

function capitalizeName(name) {
    return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

// Endpoint to check in a competitor
app.post('/checkin', (req, res) => {
    const { name } = req.body;

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        return res.status(400).send('Invalid name format.');
    }

    // Read the JSON file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading data file.');
        }

        let competitors = JSON.parse(data);
        let competitor = competitors.find(c => c.name.toLowerCase() === name.toLowerCase());

        if (competitor) {
            const formattedName = capitalizeName(name);
            if (competitor.checkedIn) {
                console.log(`${formattedName} is already checked in`)
                return res.send(`${formattedName} is already checked in.`);
            } else {
                competitor.checkedIn = true;
                fs.writeFile(dataFilePath, JSON.stringify(competitors, null, 2), err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error updating data file.');
                    }
                    res.send(`Checked In, Welcome ${formattedName}! Your bracket spot is ${competitor.bracketSpot}!`);
                    console.log(`Checked In: ${formattedName}, ${competitor.bracketSpot}`)
                });
            }
        } else {
            res.send('This is for competitor check-ins only. See host for spectator/substitute sign-in.');
            
        }
    
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
