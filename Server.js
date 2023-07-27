import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cors from 'cors';
import nodemailer from 'nodemailer'
import live_cats from "./Models/live_cats.js";
import lives from "./Models/live.js";
import movies_cat from "./Models/movies_cat.js";
import movies from "./Models/movies.js";
import movie_details from "./Models/movie_detail.js";
import Users from "./Models/users.js";
dotenv.config({path: './config/.env'});
import generator from 'generate-password';
import bodyParser from "body-parser";



const uri = process.env.URI
const port = process.env.PORT
const app=express()
app.use(cors({
    origin: "*"
}));


    app.get('/', function(req, res){  res.end('Hello World');  });

    mongoose.connect(uri, {
        dbName:"imed",
    }).then(
        () => {
            
          console.log("Connected To DB");

          app.listen(port,function(req,res){

            console.log(`Server is started on port :${port}`)
            
            });
        
        })
        // Middleware to parse incoming request bodies as JSON
        app.use(express.json());
        app.use(bodyParser.json());

        app.get("/livecats", async (req, res) => {
            const allcats = await live_cats.find();
            return res.status(200).json(allcats);
            });

        app.get("/livechannels", async (req, res) => {
            const allchannels = await lives.find();
            return res.status(200).json(allchannels);
            });
        app.get("/moviescats", async (req, res) => {
            const allmoviescats = await movies_cat.find();
            return res.status(200).json(allmoviescats);
            });
        app.get("/movies", async (req, res) => {
            const allmovies = await movies.find();
            return res.status(200).json(allmovies);
            });
            app.get("/moviedetail", async (req, res) => {
                const moviedet = await movie_details.find();
                return res.status(200).json(moviedet);
                });

// register endpoint
app.post("/adduser", (req, res) => {
const { firstname, lastname, email, password } = req.body;
    
        // create a new user instance and collect the data
        
        const user = new Users({
            first_name: req.body.firstname,
            last_name: req.body.lastname,  
            email: req.body.email,
            password: generator.generate({
                length: 16,
                numbers: true
            })
            ,
        });
  
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result) => {
            res.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // Find All Users
      app.get("/allusers", async (req, res) => {
        const allusers = await Users.find();
        return res.status(200).json(allusers);
        });
// Login endpoint
app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const userlog = await Users.findOne({email:email, password:password});
    if(!userlog)
        return res.status(401).json({ message: 'Invalid credentials' });

    else
        return res.status(200).json(userlog)
    });
      
  //Delete User Endpoint

  app.delete("/userdelete/:email", async (req, res) => {
    const userToDelete = req.params.email;
    const userdet = await Users.findOneAndDelete({email: userToDelete})
     if(userdet)
        return res.status(200).json({message: 'User Deleted'})
        
    else
        return res.status(404).json({message: 'User Not Found'})
    });

    //Email send Endpoint
    app.post("/emailsend/:email", async (req, res) => {
        const userToSendmail = req.params.email;
        const userdet = await Users.findOne({email: userToSendmail})
         if(userdet)
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 25,
            ssl: false,
            tls: true,
           auth: {
         
             user: 'imayeb@gmail.com',
             pass: 'dxhjlwucmepzbiic'
           }
         });
         
         var mailOptions = {
           from: 'imayeb@gmail.com',
           to: userdet.email,
           subject: 'Password',
           text: `Please use this information to login : \nLogin : ${userdet.email} \nPassword : ${userdet.password}`
            
         };
         
         transporter.sendMail(mailOptions, function(error, info){
           if (error) {
             console.log(error);
           } else {
             console.log('Email sent: ' + info.response);
           }
         });
            
        
        });
    





  
  