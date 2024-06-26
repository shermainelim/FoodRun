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
  host: "localhost",
  user: "root",
  password: "password",
  database: "fooddash",
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "fooddash",
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


//check unique username for store owners
app.post("/checkUniqueSO", (req, res) => {
 
  const username = req.body.username;

  db.query(
    "SELECT * from fooddash.storeOwnersRL WHERE username = ?",
    [username],
    (err, result) => {
   
      if (result.length !== 0) {
       
        res.send({ message: "taken" });
      } else {
       
        res.send({ message: "unique" });
        //username not taken
      }
    }
  );
});


//check unique username for customers
app.post("/checkUnique", (req, res) => {
 
  const username = req.body.username;


  db.query(
    "SELECT * from fooddash.customerRL WHERE username = ?",
    [username],
    (err, result) => {
   
      if (result.length !== 0) {
       
        res.send({ message: "taken" });
      } else {
       
        res.send({ message: "unique" });
        //username not taken
      }
    }
  );
});

//register customers
app.post("/register", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const firstPersonName = req.body.firstPersonName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;
const address = req.body.address;
const postalCode = req.body.postalCode;

console.log(id, username,firstPersonName, firstPersonEmail,firstPersonPassword,address,postalCode);

// do validation here before insert
// because raw sql query, need validate for symbols. to prevent script insertion like <>
// sanization of data
  const hash1 = bcrypt.hashSync(firstPersonPassword, saltRounds);
  

  db.query(
    "SELECT * from fooddash.customerRL WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send({ message: "Error, account not created." });
      }
      if (result.length > 0) {
        res.send({ message: "Username taken, account not created." });
      } else {
        res.send({message: "Register successful"});
        //Username not taken
        
    db.query(
      "INSERT INTO fooddash.customerRL ( id, username, fullName, email, password, sgAddress, sgPostalCode) VALUES (?,?,?,?,?,?,?)",
      [id, username, firstPersonName, firstPersonEmail, hash1, address, postalCode]
    );
  
  } })
}
  );

  //register SO
app.post("/registerSO", async(req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const firstPersonName = req.body.firstPersonName;
  const firstPersonEmail = req.body.firstPersonEmail;
  const firstPersonPassword = req.body.firstPersonPassword;
const address = req.body.address;
const postalCode = req.body.postalCode;
const secureUrl = req.body.secureUrl;

console.log(id, username,firstPersonName, firstPersonEmail,firstPersonPassword,address,postalCode);

//transform postal code to lat and long
const axios = require('axios');

let latitude ;
let longtitude;

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMTc2Njc0ZTBjNzkyMDk0OTg4NWIyMzU5ZTlmNTY5OCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjk0MjQyNTM4LCJleHAiOjE2OTQ1MDE3MzgsIm5iZiI6MTY5NDI0MjUzOCwianRpIjoiWHRIV3BEOVlnQlh6WnBYOSIsInVzZXJfaWQiOjc0OCwiZm9yZXZlciI6ZmFsc2V9.B5ZcxwlfKTD4DaFWwXuqAx7CjtT715QEXn71sKCjqS0', 
    'Cookie': '_toffsuid=Z47nAWT8GeMLX3SgB0vaAg=='
  }
};

await axios.request(config)
.then((response) => {
  
  latitude= response.data.results[0].LATITUDE.toString()
  longtitude=response.data.results[0].LONGITUDE.toString();

  console.log("lat", latitude);
  console.log("long", longtitude);
})
.catch((error) => {
  console.log(error);
});

// do validation here before insert
// because raw sql query, need validate for symbols. to prevent script insertion like <>
// sanization of data
  const hash1 = bcrypt.hashSync(firstPersonPassword, saltRounds);

  db.query(
    "SELECT * from fooddash.storeOwnersRL WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send({ message: "Error, account not created." });
      }
      if (result.length > 0) {
        res.send({ message: "Username taken, account not created." });
      } else {
        
        //Username not taken
        
    db.query(
      "INSERT INTO fooddash.storeOwnersRL ( id, username, storeName, email, password, sgAddress, sgPostalCode, sgLatitude, sgLongtitude,imageBrand) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [id, username, firstPersonName, firstPersonEmail, hash1, address, postalCode, latitude, longtitude, secureUrl]
    );

    res.send({message: "Register successful"});
  
  } })
}
  );


    //find nearest stores
app.post("/findNearestStores", async(req, res) => {

const postalCode = req.body.postalCode;

//transform postal code to lat and long
const axios = require('axios');

let latitude ;
let longtitude;


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
  headers: { 
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhMTc2Njc0ZTBjNzkyMDk0OTg4NWIyMzU5ZTlmNTY5OCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjk0MjQyNTM4LCJleHAiOjE2OTQ1MDE3MzgsIm5iZiI6MTY5NDI0MjUzOCwianRpIjoiWHRIV3BEOVlnQlh6WnBYOSIsInVzZXJfaWQiOjc0OCwiZm9yZXZlciI6ZmFsc2V9.B5ZcxwlfKTD4DaFWwXuqAx7CjtT715QEXn71sKCjqS0', 
    'Cookie': '_toffsuid=Z47nAWT8GeMLX3SgB0vaAg=='
  }
};

await axios.request(config)
.then((response) => {
  
  
  latitude= response.data.results[0].LATITUDE.toString()
  longtitude=response.data.results[0].LONGITUDE.toString();
  

  console.log("lat", latitude);
  console.log("long", longtitude);
})
.catch((error) => {
  console.log(error);
});

// do validation here before insert
// because raw sql query, need validate for symbols. to prevent script insertion like <>
// sanization of data
  
  const sqlQuery = `
  SELECT storeName, sgLatitude, sgLongtitude, SQRT(
    POW(69.1 * (sgLatitude - ${latitude}), 2) +
    POW(69.1 * (${longtitude} - sgLongtitude) * COS(sgLatitude/ 57.3), 2)) AS distance
  FROM fooddash.storeOwnersRL HAVING distance < 25 ORDER BY distance LIMIT 0, 5;
`;

  db.query(
    sqlQuery,
    (err, result) => {
      if (err) {
        console.log("error", err);
        res.send({ message: "Error" });
      }
     else {

    
        const latit = result[0].sgLatitude;
        const longtit= result[0].sgLongtitude;
        const distance = result[0].distance;

   const postalData=[latit, longtit, distance];
    console.log("postalData", postalData);

    res.send({data: postalData,message: "Successful"});
  
  } })
}
  );



//login for customers
app.post("/loginFirstPerson", (req, res) => {
  const username = req.body.username;
  const password = req.body.firstPersonPassword;

  db.query(
    "SELECT * FROM fooddash.customerRL WHERE username = ?",
    [username],
    (err, result) => {
      if (result.length > 0) {
       

        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            //send full name
            
        const fullName = result[0].fullName;
        const sgAddress = result[0].sgAddress;
        const sgPostalCode = result[0].sgPostalCode;
        

        const firstPersonData = [fullName, sgAddress, sgPostalCode]

        console.log("Response", res);

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


//login for SO
app.post("/loginSO", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM fooddash.storeOwnersRL WHERE username = ?",
    [username],
    (err, result) => {
      if (result.length > 0) {
       

        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            //send full name
            
        const storeName = result[0].storeName;
        const sgAddress = result[0].sgAddress;
        const sgPostalCode = result[0].sgPostalCode;
        

        const secondPersonDataData = [storeName, sgAddress, sgPostalCode]

        console.log("Response", res);

        res.send({ data: secondPersonDataData, message: "Login is Successful"});
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




connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

app.listen(process.env.PORT || 3004, () => {
  console.log("Server running on port");
});
