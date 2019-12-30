const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const public_path = path.join(__dirname, "/public");
//custom path for the view engine views
const viewpath = path.join(__dirname, "template/views");
//custom path for the view engine partials
const partialPath = path.join(__dirname, "template/partials");
//import fetch
const fetch=require("node-fetch");
//registering partials
hbs.registerPartials(partialPath);

//setup template engine
app.set('view engine', 'hbs');
//using custom view engine location
app.set('views', viewpath);
//setup static directory to serve
app.use(express.static(public_path));


//index route using hbs engine
app.get('', (req, res) => {
    res.render('index', {
        name: "solomon",
        app: "Weather App",
        title: "Weather"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Solomon"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        message: "This is help Message",
        name: "solomon"
    })
})


//about route
// app.get("/about", (req, res) => {
//     res.send("<h1>This is About Page Really ok?</h1>")
// });
//
// //weather route
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "Please Provide Address term"
        })

    }
    geocode(req.query.address, (error, {
        latitude, longitude, location
    }={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // return res.send({
    //     forecast:'it is snowing',
    //     location: 'Phildalphia',
    //     address:req.query.address
    // })

});

//Json route to get json data
app.get("/json", (req, res) => {
    res.send({
        Name: "solomon",
        Grade: "A"

    })
});

//route to 404 page
app.get('*', (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "The page you are looking does't exist",
        name: "Solomon"
    })
});
//using fetch to retrive data from web
// fetch('http://localhost:3000/weather?address=Addis Ababa').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// });


app.listen(3000, () => {
    console.log("the app is running on port 3000")
});

