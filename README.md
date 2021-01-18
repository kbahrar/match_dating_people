# matcha
web App for dating made with node.js, vue.js and mysql


# probably a solution

https://stackoverflow.com/questions/43307307/get-http-localhost-socket-io-eio-3transport-pollingt-ljivlgu-404-not-found



# erreur :

GET http://localhost:5000/socket.io/?EIO=3&transport=polling&t=NSMZGVH&sid=_tI1ygxOgCaLTmDfAAAA net::ERR_CONNECTION_REFUSED

h.create @ vue-socketio.js?1c8d:8
h @ vue-socketio.js?1c8d:8
u.request @ vue-socketio.js?1c8d:8
u.doPoll @ vue-socketio.js?1c8d:8
h.poll @ vue-socketio.js?1c8d:8
h.onData @ vue-socketio.js?1c8d:8
eval @ vue-socketio.js?1c8d:8
n.emit @ vue-socketio.js?1c8d:1
h.onData @ vue-socketio.js?1c8d:8
h.onLoad @ vue-socketio.js?1c8d:8
hasXDR.e.onreadystatechange @ vue-socketio.js?1c8d:8
XMLHttpRequest.send (async)
h.create @ vue-socketio.js?1c8d:8
h @ vue-socketio.js?1c8d:8
u.request @ vue-socketio.js?1c8d:8
u.doPoll @ vue-socketio.js?1c8d:8
h.poll @ vue-socketio.js?1c8d:8
h.doOpen @ vue-socketio.js?1c8d:8
i.open @ vue-socketio.js?1c8d:8
h.open @ vue-socketio.js?1c8d:8
h @ vue-socketio.js?1c8d:8
h @ vue-socketio.js?1c8d:8
l.open.l.connect @ vue-socketio.js?1c8d:8
eval @ vue-socketio.js?1c8d:8
setTimeout (async)
l.reconnect @ vue-socketio.js?1c8d:8
l.onclose @ vue-socketio.js?1c8d:8
eval @ vue-socketio.js?1c8d:8
n.emit @ vue-socketio.js?1c8d:1
h.onClose @ vue-socketio.js?1c8d:8
eval @ vue-socketio.js?1c8d:8
n.emit @ vue-socketio.js?1c8d:1
i.onClose @ vue-socketio.js?1c8d:8
p.onClose @ vue-socketio.js?1c8d:10
ws.onclose @ vue-socketio.js?1c8d:10


