let mysql = require("mysql");
const config = require("../config/config");


let connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Mysql Connected! Ready to Setup database");
});


connection.query("CREATE DATABASE IF NOT EXISTS matcha_db");
console.log("Database matcha_db created");


connection.query("USE matcha_db");
console.log("Database fotoked");


connection.query(
  "CREATE TABLE IF NOT EXISTS users (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, firstName VARCHAR(255) NOT NULL, lastName VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, registrationDate DATETIME DEFAULT (CURRENT_DATE), age INT(3), gender VARCHAR(25), lookingfor VARCHAR(25), city VARCHAR(255), bio VARCHAR(10000), mainFoto VARCHAR(255), foto1 VARCHAR(255), foto2 VARCHAR(255), foto3 VARCHAR(255), foto4 VARCHAR(255), online BOOLEAN DEFAULT FALSE, latitude FLOAT, longitude FLOAT, token VARCHAR(255), connect DATETIME, valid BOOLEAN DEFAULT FALSE, fill BOOLEAN DEFAULT FALSE, fame INT(10) DEFAULT 1000, access BOOLEAN DEFAULT TRUE)",
  function (err) {
    if (err) throw err;
    else {
      console.log("Users table created successfully");
    }
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS tags (id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, tag VARCHAR(20))",
  function (err) {
    if (err) throw err;
    else {
      console.log("Tags table created successfully");
    }
  }
);


connection.query(
  "CREATE TABLE IF NOT EXISTS report (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, reporter VARCHAR(100) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("report table created successfully");
    }
  }
);


connection.query(
  "CREATE TABLE IF NOT EXISTS seen (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, viewer VARCHAR(100) NOT NULL, action_date DATETIME)",
  function (err) {
    if (err) throw err;
    else {
      console.log("seen table created successfully");
    }
  }
);


connection.query(
  "CREATE TABLE IF NOT EXISTS liked (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, liked VARCHAR(100) NOT NULL, action_date DATETIME)",
  function (err) {
    if (err) throw err;
    else {
      console.log("likes table created successfully");
    }
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS matched (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(255) NOT NULL, matched VARCHAR(255) NOT NULL, last_used DATETIME)",
  function (err) {
    if (err) throw err;
    else {
      console.log("matches table created successfully");
    }
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS notification (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, sendTime DATETIME, type VARCHAR(20), message VARCHAR(50), seen INT(1))",
  function (err) {
    if (err) throw err;
    else {
      console.log("notifications table created successfully");
    }
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS message (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, sendTime DATETIME, user VARCHAR(100) NOT NULL, message VARCHAR(160) NOT NULL, seen INT(1))",
  function (err) {
    if (err) throw err;
    else {
      console.log("messages table created successfully");
    }
  }
);

connection.query(
  "CREATE TABLE IF NOT EXISTS blocked (id INT(9) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL, login VARCHAR(100) NOT NULL, user VARCHAR(100) NOT NULL)",
  function (err) {
    if (err) throw err;
    else {
      console.log("blocking table created successfully");
    }
  }
);

connection.query(
  "CREATE TRIGGER after_liked AFTER INSERT ON liked FOR EACH ROW BEGIN\
   IF EXISTS (SELECT id from liked WHERE login = NEW.liked AND liked = NEW.login) THEN\
    insert into notification (login, sendTime, type, message, seen) values (NEW.liked, now(), 'It is a match !', NEW.login, 0);\
    insert into matched (login, matched, last_used) values (NEW.login, NEW.liked, NOW());\
    UPDATE users set fame = (fame + 500) WHERE login IN (NEW.liked, NEW.login);\
  ELSE\
    insert into notification (login, sendTime, type, message, seen) values (new.liked, now(), 'liked you !', new.login, 0);\
    UPDATE users set fame = (fame + 100) WHERE login = NEW.liked;\
  END IF;\
  END",
  function (err) {
    if (err) throw err;
    else {
      console.log("TRIGGER after_liked created successfully");
    }
  }
);

connection.query(
  "CREATE TRIGGER after_seen\
  AFTER INSERT ON seen\
  FOR EACH ROW\
  BEGIN\
  insert into notification (login, sendTime, type, message, seen) values (new.login, now(), 'seen your profile !', new.viewer, 0);\
  UPDATE users set fame = (fame + 10) WHERE login = NEW.login;\
  END",
  function (err) {
    if (err) throw err;
    else {
      console.log("TRIGGER after_seen created successfully");
    }
  }
);

connection.query(
  "CREATE TRIGGER after_del_like AFTER DELETE ON liked FOR EACH ROW\
  BEGIN\
  insert into notification (login, sendTime, type, message, seen) values (OLD.liked, now(), 'Unliked you !', OLD.login, 0);\
  IF EXISTS (SELECT id from matched WHERE login IN (OLD.login, OLD.liked) AND matched IN (OLD.login, OLD.liked)) THEN\
    DELETE FROM matched WHERE login IN (OLD.login, OLD.liked) AND matched IN (OLD.login, OLD.liked);\
    UPDATE users set fame = (fame - 500) WHERE login IN (OLD.liked, OLD.liked);\
  ELSE\
    UPDATE users set fame = (fame - 100) WHERE login = OLD.liked;\
  END IF;\
  END",
  function (err) {
    if (err) throw err;
    else {
      console.log("TRIGGER after_del_liked created successfully");
    }
  }
);

connection.query(
  "CREATE TRIGGER after_block AFTER INSERT ON blocked FOR EACH ROW\
  BEGIN\
    DELETE FROM matched WHERE login IN (NEW.login, NEW.user) AND matched in (NEW.login, NEW.user);\
    DELETE FROM liked WHERE login IN (NEW.login, NEW.user) AND liked in (NEW.login, NEW.user);\
    DELETE FROM seen WHERE login IN (NEW.login, NEW.user) AND viewer in (NEW.login, NEW.user);\
  END",
  function (err) {
    if (err) throw err;
    else {
      console.log("TRIGGER after_block created successfully");
    }
  }
);

connection.end();
