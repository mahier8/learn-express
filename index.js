const express = require("express")
const mongoose = require("mongoose")
const createServer = require("./server");


// mongo db connection
mongoose
// 1. need to figure out how to connect/create mongodb to connect to  
// mongoose will create the database for me
    .connect("mongodb://localhost:27017/", { useNewUrlParser: true })
    .then(() => {
        const app = createServer();
        
        app.listen(5000, () => {
            console.log("Server has started");
        });
    });
