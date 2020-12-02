const express = require("express");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users")
const browesRoutes = require("./routes/browes")
const notifRoutes = require("./routes/notifier")
const  bodyParser = require("body-parser");
const socketIo = require('socket.io')
const cors = require("cors");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors());

app.use("/", authRoutes);
app.use("/users", usersRoutes);
app.use("/browes", browesRoutes);
app.use("/notifier", notifRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

// socketid => userid
// id => sockets
const io = socketIo(server, {pingInterval: 10, pingTimeout: 4000})


var users = []
// const users = [];
// const addUser = (id, socketId) => {
//     const user = {
//       id: ,
//       socketList: []
//     }
// }
io.on('connection', function(socket) {
  // console.log(socket.id)
  socket.on('auth', id => {
    if (!users[id])
      users[id] = []
    users[id].push(socket.id)
    console.log(users[id])
		// io.emit('online', Object.keys(users))
  });
  
  socket.on('notif', id => {
    const id_to = users[id]
    console.log('hi')
		if (id) {
      for (let i = 0; i < id_to.length; i++)
        io.to(id_to[i]).emit('notif')
    }
  });

  socket.on("disconnect", function(){
    users.forEach((user, i) => {
      // console.log(socket.id)
      user.forEach((id, j) => {
        if (socket.id == id)
          users[i].splice(j, 1)
          // console.log(socket.id, " ", i)
          // users[54].remove()
      });
    });

  })
  console.log(users)
})
