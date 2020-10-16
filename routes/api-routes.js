// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    // setCookie(req.user.id,"Valid",30); // Adjustments
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    console.log(req.body)
    db.user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client sided
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/report_data", (req, res) => {
    res.json({
      user_id: req.body.user_id,
      event_id: req.body.event_id,
      address: req.body.address,
      location_id: req.body.location_id,
      start_time: req.body.start_time,
      notes: req.body.notes
    })
  })

  app.post("/api/reports"), (req,res)=> {
    console.log(req.body)
    db.report.create({
      user_id: req.body.user_id,
      event_id: req.body.event_id,
      address: req.body.address,
      location_id: req.body.location_id,
      start_time: req.body.start_time,
      notes: req.body.notes
    })
      .then(() => {
        console.log("Report Created")
      })
      .catch(err => {
        console.log(err)
        res.status(401).json(err);
      });
  }

  //run this route only ONCE to seed database!;
  app.get("/api/seeder", (req,res)=> {
    const locations = ["Public Park", "Food/Dining", "Bar/Brewery", "Lounge/Nightclub", "Indoor Activity Spot", "Outdoor Activity Spot", "Other"];
    const events = ["Adult Party", "Children's Party", "Holiday Party", "Wedding Ceremony/Party"];
    // console.log(db)
     locations.forEach( async location => {
        try {
          await db.location.create({location_type: location})
        }catch(err){
          console.log(err)
        }
      })
      events.forEach( async event => {
        try {
          await db.event.create({event_name: event})
        }catch(err){
          console.log(err)
        }
      })
      res.json("SEEDED!")
  })
};
