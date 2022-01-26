const express = require('express');
const cors = require('cors');
const pool = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

app.listen(5000, () => {
    console.log("app listening to port 5000");
})


//VACATIONS

//Listen to "/vacations" and return all vacation rows from database
//When a client sends the backend a request, there will be a req and res object
app.get('/vacations', async(req, res) => {
    try{
        const vacations = await pool.query('SELECT * FROM vacation');
        console.log(vacations);
        res.json(vacations.rows);
    }catch(e){
        console.log(e.message);
    }
})

///Goal: Insert Vacations
//Define a url for the frontend to pass data to.
//Get the body from the frontend.  Use that body to insert data into the database

app.post('/vacations', async(req, res) => {
    try{
        const {name, description, location, comment} = req.body;
        const newVacation = await pool.query('INSERT INTO vacation (name, description, location, comment) VALUES ($1, $2, $3, $4) RETURNING *',[name, description, location, comment]);
        console.log(newVacation.rows[0]);

        res.json(newVacation.rows[0]);

    }catch(e){
        console.log(e.message);
    }
})


//get 1
app.get('/vacations/:id', async(req, res) => {
    const id = req.params.id;
    try{
        const vacation = await pool.query('SELECT * FROM vacation WHERE id = $1', [id]);
        console.log(vacation.rows[0]);
        res.json(vacation.rows[0]);

    }catch(e){
        console.log(e.message);
    }
})







//CARS
app.get('/cars', async(req, res) => {
    try{
        const cars = await pool.query('SELECT * FROM car');
        console.log(cars);
        res.json(cars.rows);
    }catch(e){
        console.log(e.message);
    }
})

//HOTELS
//backend tells us where the frontend can get data from it.  backend gets data from the database
app.get('/hotels', async(req, res) => {
    try{
        const hotels = await pool.query('SELECT * FROM hotel');
        console.log(hotels);
        res.json(hotels.rows)
    }catch(e){
        console.log(e.message);
    }
})


//RESTAURANTS
app.get('/restaurants', async(req, res) => {
    try{
        const restaurants = await pool.query('SELECT * FROM restaurant');
        console.log(restaurants.rows);
        res.json(restaurants.rows);
    }catch(e){
        console.log(e.message);
    }
})











