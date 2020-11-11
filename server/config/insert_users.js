const connection = require('./database')
const faker = require("faker")

var gender = ['Male', 'Female', 'Other']
var i = 0
var qr = "INSERT INTO users (login, firstName, lastName, email, password, age, gender, lookingfor, city, bio, mainFoto, latitude, longitude, connect, fame) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
var tags = ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature']

function addTags(login) {
    var i = 0
    while (i < 8) {
        const qr = 'insert into tags (login, tag) VALUES (?, ?)'
        connection.query(qr, [login, tags[i]], function (err) {
            if (err) throw err;
            else {
              console.log('user tag Created !');
            }
        })
        i++
    }
}

while (i < 50)
{
    var g = gender[faker.random.number({min: 0, max: 2})];
    var name = ''
    if (g == 'Male') {
        name = faker.name.firstName(0)
    }
    else if (g == 'Female') {
        name = faker.name.firstName(1)
    }
    else {
        name = faker.name.firstName()
    }
    var userName = faker.internet.userName(name)
    connection.query(qr, [
        userName,
        name,
        faker.name.lastName(),
        faker.internet.email(),
        faker.internet.password(),
        faker.random.number({min: 18, max: 44}),
        g,
        gender[faker.random.number({min: 0, max: 2})],
        faker.address.city(),
        faker.lorem.paragraph(5),
        faker.random.image(),
        faker.address.latitude(),
        faker.address.longitude(),
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