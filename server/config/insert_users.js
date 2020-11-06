const connection = require('./database')
const faker = require("faker")

var gender = ['Male', 'Female', 'Other']
var i = 0
var qr = "INSERT INTO users (login, firstName, lastName, email, password, age, gender, lookingfor, city, bio, mainFoto, latitude, longitude, connect) Values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

while (i < 10)
{
    connection.query(qr, [
        faker.internet.userName(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        faker.internet.password(),
        faker.random.number({min: 18, max: 100}),
        gender[faker.random.number({min: 0, max: 2})],
        gender[faker.random.number({min: 0, max: 2})],
        faker.address.city(),
        faker.lorem.paragraph(100),
        faker.random.image(),
        faker.address.latitude(),
        faker.address.longitude(),
        faker.date.past()
    ], function (err) {
        if (err) throw err;
        else {
          console.log('user Created');
        }
    })
    i++
}

connection.end()