import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

//configuration for request
app.use(express.json({limit: "16kb"}));  //configure json limit 

app.use(express.urlencoded({extended: true, limit: "16kb"})); //configure url because when we write shivam vashishtha it becomes shivam+vashistha or shivam%20vashishtha to handle this we use urlencoded. In url encode function we give object with extended true to give extra configuration.

app.use(express.static("public")); //configure static to store file or pdf and public is just folder name

app.use(express.cookieParser()); //configure cookie to perform safe crud cookies operation on the cient browser. it also have options like static.




export default app;