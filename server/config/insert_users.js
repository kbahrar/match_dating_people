const connection = require('./database')
const faker = require("faker")
var names = require('arabic-personal-names')
const fs = require('fs');
var Chance = require('chance')

var chance = new Chance()

let rawdata = fs.readFileSync(__dirname + '/ma.json');
let cities = JSON.parse(rawdata)

var gender = ['Male', 'Female', 'Other']
var i = 0
var qr = "INSERT INTO users (login, firstName, lastName, email, password, age, gender, lookingfor, city, bio, mainFoto, latitude, longitude, connect, fame) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
var tags = ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature']

function addTags(login) {
    var i = 0
    while (i < 5) {
        const qr = 'insert into tags (login, tag) VALUES (?, ?)'
        connection.query(qr, [login, tags[faker.random.number({min: 0, max: 8})]], function (err) {
            if (err) throw err;
            else {
              console.log('user tag Created !');
            }
        })
        i++
    }
}

i = 0
while (i < 500)
{
    var city = faker.random.number({min: 0, max: 57})
    var g = gender[faker.random.number({min: 0, max: 2})];
    var name = ''
    if (g == 'Male') {
        name = chance.pick(names.male)
    }
    else if (g == 'Female') {
        name = chance.pick(names.female)
    }
    else {
        name = chance.pick(names.male)
    }
    var userName = faker.internet.userName()
    connection.query(qr, [
        userName,
        name,
        chance.pick(names.last),
        faker.internet.email(),
        faker.internet.password(),
        faker.random.number({min: 18, max: 44}),
        g,
        gender[faker.random.number({min: 0, max: 2})],
        cities[city].city,
        faker.lorem.paragraph(5),
        faker.random.image(),
        cities[city].lat,
        cities[city].lng,
        faker.date.past(),
        faker.random.number({min: 500, max: 5000})
    ], function (err) {
        if (err) throw err;
        else {
          console.log('user Created !');
        }
    })
    addTags(userName)
    i++
}

connection.end()