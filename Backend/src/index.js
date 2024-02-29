// second approch to connect to the database
// require('dotenv').config({path:'./env'})

import dotenv from "dotenv";  // go to package.json to check experimental features
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
});

connectDB();




/*
First Approch to connect to the database

import mongoose from 'mongoose';
import {DB_NAME} from './constants/';
import express from 'express'

const app = express();

;( async () => { 
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error", (error) => {
        console.log("Error: ", error);
        throw error;
        })
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on ${process.env.PORT}`);
        })
        
    } catch (error) {
        console.log("Error : " + error);
        throw error;
    }
 })()
*/