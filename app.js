const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup.html'));
});

app.post('/', (req, res) => {
    const data = {
        members: [
            {
                email_address: req.body.email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: req.body.fName,
                    LNAME: req.body.lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        url: 'https://us20.api.mailchimp.com/3.0/lists/67ae6f3d03',
        method: 'POST',
        headers: {
            "Authorization": 'john1 0465dc031fd5334ceb6b1a4c54b6713e-us20'
        },
        // body: jsonData
    };
    request(options, (error, response, body) => {
        if (error) {
            res.sendFile(path.join(__dirname, '/failures.html'));
        } else {
            if (response.statusCode === 200) {
                res.sendFile(path.join(__dirname, '/success.html'));
            } else {
                res.sendFile(path.join(__dirname, '/failure.html'));
            }
            
        }
    });

});

app.post('/failure', (req, res) => {
    res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`app currently listening @ http://localhost:${PORT}`);
});

// api_key = 0465dc031fd5334ceb6b1a4c54b6713e-us20
// listid = 67ae6f3d03