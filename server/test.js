const faker = require("faker")
const { fake } = require("faker")

for (let o = 0; o < 20; o++)
{
    var gender = ['Male', 'Female', 'Other']
    var choose = gender[faker.random.number({min: 0, max: 2})]
    var name = ''
    var email = ''
    if (choose == 'Male') {
        name = faker.name.firstName(0)
        email = faker.internet.email(name)
    }
    else if (choose == 'Female') {
        name = faker.name.firstName(1)
        email = faker.internet.email(name)
    }
    else {
        name = faker.name.firstName()
        email = faker.internet.email(name)
    }

    faker.internet.email()
    console.log(name + '  ' + choose + '  ' + email);
}