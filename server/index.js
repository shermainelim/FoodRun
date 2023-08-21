const express = require("express"); //express dependency/middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const sendEmail = require("./utils/sendEmail");
const dotenv = require("dotenv").config();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b2ce4a45c067ae",
  password: "2e2f1c52",
  database: "heroku_4762ecdc0006081",
});

const triggerEmail = async (email, username) => {
  const sendTo = email;
  const sentFrom = process.env.EMAIL_USER;
  const replyTo = email;
  const subject = "Sign Up Message From Couple Goals Official";
  const message = `
      <p>Hello ${username}</p>
      <p>Thank for signing up with Couple Goals ! </p>
      <p>Enjoy,</p>
      <p>Couple Goals Official</p>
  `;
  
  return await sendEmail(subject, message, sendTo, sentFrom, replyTo);
}


const triggerResetEmail = async (email, randNo) => {
  const sendTo = email;
  const sentFrom = process.env.EMAIL_USER;
  const replyTo = email;
  const subject = "Reset Email Message From Couple Goals Official";
  const message = `
      <p>Hello User</p>
      <p>You have requested to reset your password. </p>
      <p>Your temporary password is ${randNo}. </p>
      <p>Please login and change password. </p>
      <p>Enjoy,</p>
      <p>Couple Goals Official</p>
  `;
  
  return await sendEmail(subject, message, sendTo, sentFrom, replyTo);
}


const triggerChangePwEmail = async (email) => {
  const sendTo = email;
  const sentFrom = process.env.EMAIL_USER;
  const replyTo = email;
  const subject = "Change Password Message From Couple Goals Official";
  const message = `
      <p>Hello User</p>
      <p>You have changed your password. </p>
      <p>Enjoy,</p>
      <p>Couple Goals Official</p>
  `;
  
  return await sendEmail(subject, message, sendTo, sentFrom, replyTo);
}


const triggerDeleteEmail = async (email, spaceName) => {
  const sendTo = email;
  const sentFrom = process.env.EMAIL_USER;
  const replyTo = email;
  const subject = "Delete Message From Couple Goals Official";
  const message = `
      <p>Hello User</p>
      <p>You have requested to delete your couple space account. </p>
      <p>Couple space name ${spaceName} and both associated accounts have been deleted. </p>
      <p>Enjoy,</p>
      <p>Couple Goals Official</p>
  `;
  
  return await sendEmail(subject, message, sendTo, sentFrom, replyTo);
}


//send email

app.post("/api/sendemail", async (req, res) => {
  const email = req.body.firstPersonEmail;
  const username = req.body.firstPersonName;

  try {
    await triggerEmail(email, username);
    res.status(200).json({ success: true, message: "Email First Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/api/sendEmailSecond", async (req, res) => {
  const email = req.body.secondPersonEmail;
  const username = req.body.secondPersonName;

  const delay = ms => new Promise(res => setTimeout(res, ms));

 
  try {
    await delay(5000);
    await triggerEmail(email, username);
    res.status(200).json({ success: true, message: "Email Second Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//dashboard done goal tracker todo
app.post("/goalDone", (req, res) => {
  const spaceName = req.body.spaceName;
 const id = req.body.id;
 const status = req.body.status;

  db.query(
    "UPDATE heroku_4762ecdc0006081.goals SET status = ? WHERE spaceName = ? AND id = ?",
    [status, spaceName, id],
  );
  res.send({message: "Goal done"});

});


//change password  second
app.post("/changePasswordSecond",async (req, res) => {
  const confirmPassword = req.body.confirmPassword;
  const secondPersonEmail= req.body.secondPersonEmail;
 
  const hash1Change = bcrypt.hashSync(confirmPassword, saltRounds);

  db.query(
    "UPDATE heroku_4762ecdc0006081.space SET secondPersonPassword = ? WHERE secondPersonEmail = ?",
    [hash1Change, secondPersonEmail],
  );

  try {
    await triggerChangePwEmail(secondPersonEmail);
    res.status(200).json({ success: true, message: "Password changed. Email sent." });
  } catch (error) {
    res.status(500).json(error.message);
  }


});


//change password
app.post("/changePassword",async (req, res) => {
  const confirmPassword = req.body.confirmPassword;
  const firstPersonEmail= req.body.firstPersonEmail;
  
  const hash1Change = bcrypt.hashSync(confirmPassword, saltRounds);

  db.query(
    "UPDATE heroku_4762ecdc0006081.space SET firstPersonPassword = ? WHERE firstPersonEmail = ?",
    [hash1Change, firstPersonEmail],
  );

  try {
    await triggerChangePwEmail(firstPersonEmail);
    res.status(200).json({ success: true, message: "Password changed. Email sent." });
  } catch (error) {
    res.status(500).json(error.message);
  }


});

//forget password second
app.post("/forgetPasswordSecond",async (req, res) => {
  const firstPersonEmail = req.body.firstPersonEmail;

  const randNo = req.body.randNo;
  const randNoString = randNo.toString();
  const saltRoundsNew = 10;
  const hash1Change = bcrypt.hashSync(randNoString, saltRoundsNew);

  db.query(
    "UPDATE heroku_4762ecdc0006081.space SET secondPersonPassword = ? WHERE secondPersonEmail = ?",
    [hash1Change, firstPersonEmail],
  );

  try {
    await triggerResetEmail(firstPersonEmail, randNo);
    res.status(200).json({ success: true, message: "Email sent if user exist" });
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }


});

//forget password
app.post("/forgetPassword",async (req, res) => {
  const firstPersonEmail = req.body.firstPersonEmail;
  const randNo = req.body.randNo;
  const randNoString = randNo.toString();
  const saltRoundsNew = 10;


  const hashChangeForget = bcrypt.hashSync(randNoString,  saltRoundsNew);

  db.query(
    "UPDATE heroku_4762ecdc0006081.space SET firstPersonPassword = ? WHERE firstPersonEmail = ?",
    [hashChangeForget, firstPersonEmail],
  );

  try {
    await triggerResetEmail(firstPersonEmail, randNo);
    res.status(200).json({ success: true, message: "Email sent if user exist" });
  } catch (error) {
    res.status(500).json(error.message);
  }


});

//dashboard delete couple space
app.post("/spaceDelete", async (req, res) => {
  const spaceName = req.body.spaceName;
  const email = req.body.secondPersonEmail;

  console.log("spacenAME", spaceName);
  console.log("email", email);

  db.query(
    "DELETE FROM heroku_4762ecdc0006081.space WHERE spaceName = ?",
    [spaceName],
  );

  try {
    await triggerDeleteEmail(email, spaceName);
    res.status(200).json({ success: true, message: "Couple Space deleted" });
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
  
  console.log("Error space delete");

});

//dashboard delete finance tracker todo
app.post("/financeDelete", (req, res) => {
  const spaceName = req.body.spaceName;
 const id = req.body.id;


  db.query(
    "DELETE FROM heroku_4762ecdc0006081.finance WHERE spaceName = ? AND id = ?",
    [spaceName, id ],
  );
  res.send({message: "Finance tracker deleted"});

});


//dashboard delete goal tracker todo
app.post("/goalDelete", (req, res) => {
  const spaceName = req.body.spaceName;
 const id = req.body.id;


  db.query(
    "DELETE FROM heroku_4762ecdc0006081.goals WHERE spaceName = ? AND id = ?",
    [spaceName, id ],
  );
  res.send({message: "Goal deleted"});
});


//finance post 
app.post("/financePost", (req, res) => {
  const spaceName = req.body.spaceName;
 const id = req.body.id;
 const title = req.body.title;
 const desc = req.body.desc;

 const startGoal = req.body.startGoal;
 const currentSaved = req.body.currentSaved;
 const endGoal = req.body.endGoal;

  db.query(
    "INSERT INTO heroku_4762ecdc0006081.finance ( spaceName, id , title, description, startGoal, currentSaved, endGoal) VALUES (?,?,?,?,?,?,?)",
    [spaceName, id , title, desc, startGoal, currentSaved, endGoal],
  );
  res.send({message: "Finance tracker posted"});
});


//finance post 
app.post("/contributionBackPost", (req, res) => {
  const spaceName = req.body.spaceName;
 const id = req.body.id;
 const current = req.body.currentSaved

  db.query(
    "UPDATE heroku_4762ecdc0006081.finance SET currentSaved = ? WHERE spaceName = ? AND id = ?",
    [current, spaceName, id],
  );
  res.send({message: "Financial savings updated"});
});


//dashboard post goal tracker todo
app.post("/goalPost", (req, res) => {
  const spaceName = req.body.spaceName;
 const id = req.body.id;
 const title = req.body.title;
 const status = req.body.status;

  db.query(
    "INSERT INTO heroku_4762ecdc0006081.goals ( spaceName, id, title, status) VALUES (?,?,?,?)",
    [spaceName, id , title, status],
  );
  res.send({message: "Goal posted"});
});


//dashboard fetch finance tracker 
app.post("/fetchFinance", (req, res) => {
  const spaceName = req.body.spaceName;

  db.query(
    "SELECT spaceName, id, title, description, startGoal, currentSaved, endGoal FROM heroku_4762ecdc0006081.finance WHERE spaceName = ?",
    [spaceName],
    (err, result) => {

        const goalsData = [result]
        res.send({ data: goalsData, message: "Finance Data Fetch is Successful"});
      
    }
  );
});


//dashboard fetch goal tracker todo
app.post("/fetchGoal", (req, res) => {
  const spaceName = req.body.spaceName;

  db.query(
    "SELECT * FROM heroku_4762ecdc0006081.goals WHERE spaceName = ?",
    [spaceName],
    (err, result) => {
      
        const goalsData = [spaceName, result]
        res.send({ data: goalsData, message: "Goal Data Fetch is Successful"});
      
    }
  );
});

//check unique name 
app.post("/checkUnique", (req, res) => {
 
  const spaceName = req.body.spaceName;


  db.query(
    "SELECT * from heroku_4762ecdc0006081.space WHERE spaceName = ?",
    [spaceName],
    (err, result) => {
   
      if (result.length !== 0) {
       
        res.send({ message: "taken" });
      } else {
       
        res.send({ message: "unique" });
        //space name not taken
      }
    }
  );
});

//register couples
app.post("/register", (req, res) => {
  const id = req.body.id;
  const spaceName = req.body.spaceName;
  const firstPersonName = req.body.firstPersonName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;
  const firstPersonBirthday = req.body.firstPersonBirthday;

  const secondPersonName = req.body.secondPersonName;
  const secondPersonEmail = req.body.secondPersonEmail;
  const secondPersonPassword = req.body.secondPersonPassword;
  const secondPersonBirthday = req.body.secondPersonBirthday;
  const anniDate = req.body.anniDate;

// do validation here before insert
// because raw sql query, need validate for symbols. to prevent script insertion like <>
// sanization of data
  const hash1 = bcrypt.hashSync(firstPersonPassword, saltRounds);
  const hash2 = bcrypt.hashSync(secondPersonPassword, saltRounds);

  db.query(
    "SELECT * from heroku_4762ecdc0006081.space WHERE spaceName = ?",
    [spaceName],
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send({ message: "Error, space not created." });
      }
      if (result.length > 0) {
        res.send({ message: "Space name taken, space not created." });
      } else {
        res.send({ message: "Space name is unique, space created successfully" });
        //space name not taken
        
    db.query(
      "INSERT INTO heroku_4762ecdc0006081.space ( id, spaceName, firstPersonName, firstPersonEmail, firstPersonPassword, firstPersonBirthday,secondPersonName, secondPersonEmail, secondPersonPassword , secondPersonBirthday, anniDate) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        id, spaceName, firstPersonName, firstPersonEmail, hash1, firstPersonBirthday,secondPersonName, secondPersonEmail, hash2 , secondPersonBirthday, anniDate
      ]
    );
      }
    }
  );
});


//first person login
app.post("/loginFirstPerson", (req, res) => {
  const spaceName = req.body.spaceName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;

  db.query(
    "SELECT * FROM heroku_4762ecdc0006081.space WHERE spaceName = ? and firstPersonEmail = ?",
    [spaceName, firstPersonEmail],
    (err, result) => {
      if (result.length > 0) {
       

        bcrypt.compare(firstPersonPassword, result[0].firstPersonPassword, (error, response) => {
          if (response) {
            //send full name
            const spaceName = result[0].spaceName;
        const firstPersonNameUser = result[0].firstPersonName;
        const firstPersonBirthdayUser = result[0].firstPersonBirthday;
        const secondPersonName = result[0].secondPersonName;
        const secondPersonBirthday = result[0].secondPersonBirthday;

        const anniDate = result[0].anniDate;

        const firstPersonData = [spaceName, firstPersonNameUser, firstPersonBirthdayUser, secondPersonName, secondPersonBirthday, anniDate, firstPersonEmail]

        res.send({ data: firstPersonData, message: "Login is Successful"});
          } else {
            res.send({ message: "Wrong combination!" });
          }
        });
       
      } else {
       
        res.send({ message: "User not found" });
      }
    }
  );
});


//second person login
app.post("/loginSecondPerson", (req, res) => {
  const spaceName = req.body.spaceName;
  const secondPersonEmail = req.body.secondPersonEmail;
  const secondPersonPassword = req.body.secondPersonPassword;


  db.query(
    "SELECT * FROM heroku_4762ecdc0006081.space WHERE spaceName = ? and secondPersonEmail = ?",
    [spaceName, secondPersonEmail],
    (err, result) => {
   
      if (result.length > 0) {

        bcrypt.compare(secondPersonPassword, result[0].secondPersonPassword, (error, response) => {
          if (response) {
            const spaceName = result[0].spaceName;
        const firstPersonNameUser = result[0].firstPersonName;
        const firstPersonBirthdayUser = result[0].firstPersonBirthday;
        const secondPersonName = result[0].secondPersonName;
        const secondPersonBirthday = result[0].secondPersonBirthday;

        const anniDate = result[0].anniDate;

        const secondPersonData = [spaceName, firstPersonNameUser, firstPersonBirthdayUser, secondPersonName, secondPersonBirthday, anniDate, secondPersonEmail]

        res.send({ data: secondPersonData, message: "Login is Successful"});
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
       
      } else {
     
        res.send({ message: "User not found" });
      }
    }
  );
});


app.listen(process.env.PORT || 3004, () => {
  console.log("Server running on port");
});
