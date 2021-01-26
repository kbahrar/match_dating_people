<template>
  <v-layout>
	<v-flex xs10 offset-xs1 class="mt-10">
	  <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4 mt-4">

		<v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
		  <v-toolbar-title>Chat !</v-toolbar-title>
		</v-toolbar>
	  <div class="container mt-5">
	  <h3 class=" text-center">Messaging</h3>
	  <div class="messaging">
	  <div class="inbox_msg">
		<div class="inbox_people">
		  <div class="headind_srch">
			<div class="recent_heading">
			  <h4>Chat list</h4>
			</div>
		  </div>
		  <div class="inbox_chat">




			
			<div :class="user.class" v-for="user in this.matched"
			:key="user.idd" @click="getCvr(user.idd)">
				<v-badge
					:value="user.count"
					color="red"
					:content="user.count"
				>
			  <div class="chat_people">
				<div class="chat_img"> <img :src="'http://localhost:5000/'+user.mainFoto" alt="sunil" style="border-radius: 50%;" height="100%" width="100%"> </div>
				<div class="chat_ib">
				  <h5>{{user.firstName}} {{user.lastName}} <span class="chat_date">{{moment(user.last_used).fromNow()}}</span></h5>
				  <p v-if="user.msgs.length > 0">{{user.msgs[user.msgs.length - 1].message}}</p>
				  <p v-else>Start Your conversation with your match !</p>
				</div>
			  </div>
				</v-badge>
			</div>

		  </div>
		</div>
		<div class="mesgs" v-if="activeUser > -1">
		  <div class="msg_history" ref="messagesContainer">
			<div v-for="msg in msgs" :key="msg.id">
				<div class="outgoing_msg" v-if="msg.login == matched[activeUser].login">
				  <div class="incoming_msg_img"> <img :src="'http://localhost:5000/'+matched[activeUser].mainFoto" alt="sunil" style="border-radius: 50%;" height="100%" width="100%"> </div>
				  <div class="received_msg">
					<div class="received_withd_msg">
					  <p>{{msg.message}}</p>
					  <span class="time_date"> {{moment(msg.sendTime).fromNow()}}</span></div>
				  </div>
				</div>
				<div class="outgoing_msg" v-else>
				  <div class="sent_msg">
					<p>{{msg.message}}</p>
					<span class="time_date"> {{moment(msg.sendTime).fromNow()}}</span></div>
				</div>
			</div>
		  </div>
		  <div class="type_msg">
			<div class="input_msg_write">
			  <input @keyup.enter="sendMsg(matched[activeUser].login, matched[activeUser].id)" type="text" class="write_msg" placeholder="Type a message" v-model="message" />
			  <button class="msg_send_btn" type="button" @click="sendMsg(matched[activeUser].login, matched[activeUser].id)"><i class="far fa-paper-plane"></i></button>
			</div>
		  </div>
		</div>
	  </div>
	  </div>
	  </div>
	</div>
	</v-flex>
  </v-layout>
</template>

<script>
import {getMatched} from "../utils/utils"
import {sendMsg} from "../utils/utils"
import {getMsg} from "../utils/utils"
import {seenMsg} from "../utils/utils"
import vue from 'vue';
export default {
  data () {
	return {
	  alert: true,
	  flag: true,
	  reg: null,
	  error: null,
	  errors: [],
	  matched: [],
	  active: "chat_list active_chat",
	  inactive: "chat_list",
	  activeUser: -1,
	  msgs: [],
	  message: ''
	}
  },
  sockets: {
		msg: async function (data) {
			await this.getMsgs(data)
		}
  },
  mounted: async function() {
	try {
	  var users = await getMatched()
	  for (let i = 0; i < users.length; i++) {
		  users[i].class = this.inactive
			users[i].idd = i
	  }
	  this.matched = users
	  this.msgs = users[0].msgs
	}
	catch (err) {
	  
	}
  },
  updated:  function(){
		this.gotoBottom()
  },
  methods: {
   getCvr: async function (id) {
	   try {
		 if (this.matched[id].class != this.active) {
		  await seenMsg(this.matched[id].login)
		  this.matched[id].count = 0
	   for (let i = 0; i < this.matched.length; i++) {
		 this.matched[i].class = this.inactive
	   }
	   this.activeUser = id
	   this.matched[id].class = this.active
	   this.msgs = this.matched[id].msgs
	   this.gotoBottom()
	 }
	   }
	   catch (err) {
		   alert('something went wrong')
	   }
   },
   sendMsg: async function (user, id) {
	   try {
		   if (this.message) {
			 await sendMsg(user, this.message, id)
			 this.message = ''
			 await this.getMsgs(user)
		   }
	   }
	   catch (err) {
		   alert('something went wrong')
	   }
   },
   getMsgs: async function (user) {
	   try {
		var res = await getMsg(user)
		var msgs = res.msgs
		var count = res.count
		for (let i = 0; i < this.matched.length; i++) {
			if (this.matched[i].login == user) {
				this.matched[i].msgs = msgs
				this.matched[i].count = count
			}
		}
		this.orderCvr(user, msgs)
		if (this.activeUser > -1)
			this.msgs = this.matched[this.activeUser].msgs
	   }
	   catch (err) {
		   alert('something went wrong')
	   }
   },
  gotoBottom: function(){
		const ele = document.getElementsByClassName('msg_history')[0]
		if (ele)
			ele.scrollTop = ele.scrollHeight
	},
	orderCvr: function(login, msgs) {
	  if (this.activeUser > -1)
	  	var alogin = this.matched[this.activeUser].login
	  for (let i = 0; i < this.matched.length; i++) {
		if (this.matched[i].login == login) {
		  this.matched[i].msgs = msgs
		  this.matched[i].last_used = this.matched[i].msgs[this.matched[i].msgs.length - 1].sendTime
		}
	  }
	  this.matched.sort(this.compareTime)
	  for (let i = 0; i < this.matched.length; i++) {
		this.matched[i].idd = i
		if (this.activeUser > -1 && alogin == this.matched[i].login)
			this.activeUser = i
	  }
	},
	compareTime (a, b) {
	 return b.last_used.localeCompare(a.last_used);
	},
  },
}
</script>

<style scoped>
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; padding: 1px;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #cc0066;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #cc0066 none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
  outline: none;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #cc0066 none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>
