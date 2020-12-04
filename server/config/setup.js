let mysql = require("mysql");
const config = require("../config/config");
//connection to mysql database
let connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password
});

// Connexion erreurs handling
connection.connect(function (err) {
  if (err) throw err;
  console.log("Mysql Connected! Ready to Setup database");
});

// Database Creator

connection.query("CREATE DATABASE IF NOT EXISTS matcha_db");
console.log("Database matcha_db created");

// fotok the created database

connection.query("USE matcha_db");
console.log("Database fotoked");

// Creating users table

connection.query(
  "CREATE TABLE IF NOT EXISTS users (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, registrationDate DATETIME DEFAULT (CURRENT_DATE), age INT(3), gender VARCHAR(25), lookingfor VARCHAR(25), city VARCHAR(255), bio VARCHAR(10000), mainFoto VARCHAR(255), foto1 VARCHAR(255), foto2 VARCHAR(255), foto3 VARCHAR(255), foto4 VARCHAR(255), online BOOLEAN DEFAULT FALSE, latitude FLOAT, longitude FLOAT, token VARCHAR(255), connect DATETIME, valid BOOLEAN DEFAULT FALSE, fill BOOLEAN DEFAULT FALSE, fame INT(10) DEFAULT 1000)",
  function (err) {
    if (err) throw err;
    else {
      console.log("Users table created successfully");
    }
  }
);

//		Creating tags table
connection.query(
  "CREATE TABLE IF NOT EXISTS tags (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, tag VARCHAR(20))",
  function (err) {
    if (err) throw err;
    else {
      console.log("Tags table created successfully");
    }
  }
);

// Creating popularity table

connection.query(
  "CREATE TABLE IF NOT EXISTS popularity (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, fame INT(10) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("Popularity table created successfully");
    }
  }
);

// Creating likes table

connection.query(
  "CREATE TABLE IF NOT EXISTS liked (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, liked VARCHAR(100) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("likes table created successfully");
    }
  }
);

// Creating matches table
connection.query(
  "CREATE TABLE IF NOT EXISTS matched (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, matched VARCHAR(255) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("matches table created successfully");
    }
  }
);

//	Creating notifications table
connection.query(
  "CREATE TABLE IF NOT EXISTS notification (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, sendTime DATETIME, type VARCHAR(20), message VARCHAR(50), seen INT(1))",
  function (err) {
    if (err) throw err;
    else {
      console.log("notifications table created successfully");
    }
  }
);

//		Creating messages table
connection.query(
  "CREATE TABLE IF NOT EXISTS message (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, sendTime DATETIME, user VARCHAR(100) NOT NULL, message VARCHAR(160) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("messages table created successfully");
    }
  }
);

//		Creating block table
connection.query(
  "CREATE TABLE IF NOT EXISTS blocked (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, user VARCHAR(100) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("blocking table created successfully");
    }
  }
);

// CREATING trigger for liked notification
connection.query(
  "delimiter #\
  CREATE OR REPLACE TRIGGER after_liked\
  AFTER INSERT ON liked\
  FOR EACH ROW\
  BEGIN\
  insert into notification (login, sendTime, type, message, seen) values (new.liked, now(), 'liked you !', new.login, 0);\
  UPDATE users set fame = (fame + 100) WHERE login = NEW.liked;\
  END#",
  function (err) {
    if (err) throw err;
    else {
      console.log("TRIGGER after_liked created successfully");
    }
  }
);

connection.query(
  "CREATE TRIGGER after_del_like AFTER DELETE ON liked FOR EACH ROW BEGIN insert into notification (login, sendTime, type, message, seen) values (OLD.liked, now(), 'Unliked you !', OLD.login, 0); UPDATE users set fame = (fame - 100) WHERE login = OLD.liked; END#",
  function (err) {
    if (err) throw err;
    else {
      console.log("TRIGGER after_liked created successfully");
    }
  }
);

//  End of connection
connection.end();
