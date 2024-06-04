const express = require('express');
const connection =require('../connection')
const router= express.Router();
var auth = require('../services/authentification');

router.post("/addNewCategory", auth.authentificateToken, (req, res, next) => {
    let category = req.body;
    let query = "INSERT INTO category (name) VALUES (?)";
    connection.query(query, [category.name], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Category added successfully" });
        } else {
            return res.status(500).json({ message: "Error adding category" });
        }
    });
});

router.get("/getAllCategories",auth.authentificateToken,(req,res,next)=>{
    let query = "SELECT * FROM category order by name";
    connection.query(query,(err,result)=>{
        if (!err) {
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json({message:"Error fetching categories"});
        }
    })
})

router.post("/updateCategory",auth.authentificateToken,(req,res,next)=>{
    let category = req.body;
    let query = "UPDATE category SET name = ? WHERE id = ?";
    connection.query(query,[category.name,category.id],(err,result)=>{
        if (!err) {
            return res.status(200).json({message:"Category updated successfully"});
        }
        else{
            return res.status(500).json({message:"Error updating category"});
        }
    })
})

router.post("/deleteCategory",auth.authentificateToken,(req,res,next)=>{
    let category = req.body;
    let query = "DELETE FROM category WHERE id = ?";
    connection.query(query,[category.id],(err,result)=>{
        if (!err) {
            return res.status(200).json({message:"Category deleted successfully"});
        }
        else{
            return res.status(500).json({message:"Error deleting category"});
        }
    })
})

router.post("/getCategoryById",auth.authentificateToken,(req,res,next)=>{
    let category = req.body;
    let query = "SELECT * FROM category WHERE id = ?";
    connection.query(query,[category.id],(err,result)=>{
        if (!err) {
            return res.status(200).json(result);
        }
        else{
            return res.status(500).json({message:"Error fetching category"});
        }
    })
})


module.exports=router;

