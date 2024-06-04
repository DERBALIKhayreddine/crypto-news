const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentification');

router.post("/addNewArticle", auth.authentificateToken, (req, res, next) => {
    let article = req.body;
    let query = "INSERT INTO article (title, content, category_id, publication_date, status) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [article.title, article.content, article.category_id, article.publication_date, article.status], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Article added successfully" });
        } else {
            console.error("Error adding article:", err);  // Detailed error logging
            return res.status(500).json({ message: "Error adding article", error: err.message });
        }
    });
});


router.get("/getAllArticles", auth.authentificateToken, (req, res, next) => {
    let query = "SELECT * FROM article ORDER BY publication_date DESC";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ message: "Error fetching articles" });
        }
    });
});



router.post("/updateArticle", auth.authentificateToken, (req, res, next) => {
    let article = req.body;
    let query = "UPDATE article SET title = ?, content = ?, category_id = ?, publication_date = ?, status = ? WHERE id = ?";
    connection.query(query, [article.title, article.content, article.category_id, article.publication_date, article.status, article.id], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Article updated successfully" });
        } else {
            return res.status(500).json({ message: "Error updating article" });
        }
    });
});

router.post("/deleteArticle", auth.authentificateToken, (req, res, next) => {
    let article = req.body;
    let query = "DELETE FROM article WHERE id = ?";
    connection.query(query, [article.id], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Article deleted successfully" });
        } else {
            return res.status(500).json({ message: "Error deleting article" });
        }
    });
});

router.post("/getArticleById", auth.authentificateToken, (req, res, next) => {
    let article = req.body;
    let query = "SELECT * FROM article WHERE id = ?";
    connection.query(query, [article.id], (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ message: "Error fetching article" });
        }
    });
});

router.get("/getAllPublishedArticles", (req, res, next) => {
    let query = "SELECT * FROM article WHERE status = 'published' ORDER BY publication_date DESC";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ message: "Error fetching published articles" });
        }
    });
});


router.post("/updateArticleStatus", auth.authentificateToken, (req, res, next) => {
    let article = req.body;
    let query = "UPDATE article SET status = ? WHERE id = ?";
    connection.query(query, [article.status, article.id], (err, result) => {
        if (!err) {
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Article status updated successfully" });
            } else {
                return res.status(404).json({ message: "Article not found" });
            }
        } else {
            return res.status(500).json({ message: "Error updating article status" });
        }
    });
});


module.exports = router;
