const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../services/authentification'); // Destructure to avoid circular dependency

router.post('/addNewAppuser', (req, res) => {
    let user = req.body;
    let query = "select email from appuser where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into appuser (name, email, password, status, isDeletable) values (?, ?, ?, 'false', 'true')";
                connection.query(query, [user.name, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "User added successfully" });
                    } else {
                        return res.status(500).json({ error: "Database error" });
                    }
                });
            } else {
                return res.status(400).json({ message: "User already exists" });
            }
        } else {
            return res.status(500).json({ error: "Database error" });
        }
    });
});



router.post('/login', (req, res) => {
    const user = req.body;
    let query = "select email, password, status, isDeletable from appuser where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(401).json({ message: "Incorrect email or password" });
            } else if (results[0].status == 'false') {
                return res.status(401).json({ message: "User is not active" });
            } else if (results[0].password == user.password) {
                const response = { email: results[0].email, isDeletable: results[0].isDeletable };
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '9h' });
                return res.status(200).json({ email: results[0].email, accessToken });
            } else {
                return res.status(401).json({ message: "Something went wrong" });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});


router.get('/getAllAppusers', auth.authentificateToken, (req, res) => {
    const tokenPayload = res.locals;
    var query;
    if (tokenPayload.isDeletable == 'false') {
        query = "select id, name, email, status from appuser where isDeletable='true'";
    } else {
        query = "select id, name, email, status from appuser where isDeletable='true' and email != ?";
    }
    connection.query(query, [tokenPayload.email], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post('/updateUserStatus', auth.authentificateToken, (req, res) => {
    let user = req.body;
    
    if (!user.status || !user.id) {
        return res.status(400).json({ message: "Status and User ID are required" });
    }

    var query = "UPDATE `appuser` SET status=? WHERE id=? AND isDeletable='true'";
    
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User ID does not exist or cannot be updated" });
            }
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.post('/updateUser', auth.authentificateToken, (req, res) => {
    let user = req.body;

    // Check if required fields are present
    if (!user.name || !user.email || !user.id) {
        return res.status(400).json({ message: "Name, Email, and User ID are required" });
    }

    var query = "UPDATE `appuser` SET name=?, email=? WHERE id=?";

    connection.query(query, [user.name, user.email, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "User ID does not exist or cannot be updated" });
            }
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.get('/checkToken',auth.authentificateToken,(req, res) =>{
    return res.status(200).json({message:"true"})
})


module.exports = router;