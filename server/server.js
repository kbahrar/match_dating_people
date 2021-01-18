const express = require("express");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users")
const browesRoutes = require("./routes/browes")
const notifRoutes = require("./routes/notifier")
const searchRoutes = require("./routes/search")
const chatRoutes = require("./routes/chat")
const  bodyParser = require("body-parser")
const connection = require("./config/database")
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
app.use("/search", searchRoutes);
app.use("/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);


const io = socketIo(server, {pingInterval: 10, pingTimeout: 4000})


var users = []

io.on('connection', function(socket) {
  socket.on('auth', id => {
    if (!users[id])
      users[id] = []
    users[id].push(socket.id)
    try {
			const sql = `UPDATE users SET online = true WHERE id = ?`
			connection.query(sql, [id])
		} catch (err) {
			console.log(err)
		}
		io.emit('online')
  });
  
  socket.on('notif', id => {
    const id_to = users[id]
		if (id_to) {
      for (let i = 0; i < id_to.length; i++)
        io.to(id_to[i]).emit('notif')
    }
  });

  socket.on('msg', id => {
    const id_to = users[id[0]]
		if (id_to) {
      for (let i = 0; i < id_to.length; i++)
        io.to(id_to[i]).emit('msg', id[1])
    }
  });

  socket.on("disconnect", function(){
    users.forEach((user, i) => {
      user.forEach((id, j) => {
        if (socket.id == id) {
          users[i].splice(j, 1)
          if (users[i].length <= 0) {
            try {
              const sql = `UPDATE users SET connect = NOW(), online = false WHERE id = ?`
              connection.query(sql, [i])
            } catch (err) {
              console.log(err)
            }
            io.emit('online')
          } 
        }
      });
    });
  })
})
