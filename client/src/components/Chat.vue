<template>
  <div>
      <Chat 
       :participants="participants"
       :myself="myself"
       :messages="messages"
       :onType="onType"
       :onMessageSubmit="onMessageSubmit"
       :chatTitle="chatTitle"
       :placeholder="placeholder"
       :colors="colors"
       :borderStyle="borderStyle"
       :hideCloseButton="hideCloseButton"
       :closeButtonIconSize="closeButtonIconSize"
       :submitIconSize="submitIconSize"/>
   </div>
</template>
<!-- sabt tutorial hna a sat kin chi blan fi line 89 khasso ykoun tostring() ila 3jbak khlih https://vuejsexamples.com/a-simple-chat-component-created-with-vue-js/ -->
<script>

import { Chat } from 'vue-quick-chat'
export default {
  components: {
    Chat
  },
  data(){
    return {
      participants: [
        {
          name: 'Arnaldo',
          id: 1
        },
        {
          name: 'José',
          id: 2
        }
      ],
      myself: {
        name: 'Matheus S.',
        id: 3
      },
      messages: [
        {
          content: 'received messages', 
          myself: false,
          participantId: 1,
          timestamp: { year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123 }
        },
        {
          content: 'sent messages', 
          myself: true,
          participantId: 3,
          timestamp: { year: 2019, month: 4, day: 5, hour: 19, minute: 10, second: 3, millisecond:123 }
        },
        {
          content: 'other received messages', 
          myself: false,
          participantId: 2,
          timestamp: { year: 2019, month: 5, day: 5, hour: 10, minute: 10, second: 3, millisecond: 123 }
        }
      ],
      chatTitle: 'My chat title',
      placeholder: 'send your message',
      colors:{
        header:{
          bg: '#d30303',
          text: '#fff'
        },
        message:{
          myself: {
            bg: '#fff',
            text: '#bdb8b8'
          },
          others: {
            bg: '#fb4141',
            text: '#fff'
          }
        },
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: "20px",
      closeButtonIconSize: "20px"
    }
  },
  methods: {
    onType: function (event){
      //here you can set any behavior
    },
    onMessageSubmit: function(message){
      //here you can set any behavior
    }
  }
}
</script>
<style lang="css" scoped>
</style>