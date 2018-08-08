<template>
    <div> 
        <br><br><br><br><br>
        <h2>***  CHAT  ***</h2>
        <ul class="messages">
          <li v-for="msg in msgs" :key=msg>
            {{msg}}
          </li>
        </ul>
        <form @submit.prevent="sendMsg">
            <div>Form:</div>
            <input class="chat-input" placeholder="your message" name="chatInput" autocomplete="off" />
            <button>Send</button>
        </form>
    </div>
</template>
 

<script>
export default {
  name: 'chatSocket',

  data() {
    return {
      currMsg: '',
      msgs: []
    };
  },

  mounted() {
    var nickname = prompt('Your name?');
    var str = "Hey all, I'm " + nickname + ', nice to meet you';
    this.$socket.emit('chat join', str);
  },

  sockets: {
      ['user_connected'](nickname) {
      this.msgs.unshift(nickname);
    },

    ['chat message'](msg) {
      this.msgs.unshift(msg);
    }
  },

  methods: {
    sendMsg(ev) {
      console.log(ev.target.chatInput.value);
      this.$socket.emit('chat send-message', ev.target.chatInput.value);
      ev.target.chatInput.value = '';
      // this.$socket.emit('chat send-message', this.currMsg);
      // this.currMsg = '';
    }
  },

  computed: {},

  components: {}
};
</script>




 <style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font: 13px Helvetica, Arial;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#messages li {
  padding: 5px 10px;
}

#messages li:nth-child(odd) {
  background: #eee;
}

.chat-input {
  background-color: yellow;
}
</style>


<!--
       // socket.emit('chat join', nickname);

        // socket.on('chat connected', function (nickname) {
        //     $('#messages').append($('<li>').text(nickname + ' Joined'));
        // });

        // socket.on('chat message', function (msg) {
        //     $('#messages').append($('<li>').text(msg));
        // });

        // $('form').submit(function () {
        //     socket.emit('chat send-message', nickname + ':' + $('#m').val());
        //     $('#m').val('');
        //     return false;
        // });

form {
  background: #000;
  padding: 3px;
  position: fixed;
  bottom: 0;
  width: 100%;
}

form input {
  border: 0;
  padding: 10px;
  width: 90%;
  margin-right: 0.5%;
}

form button {
  width: 9%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
}

-->


