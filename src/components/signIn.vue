<template>
    <div class="user-modal-container" id="login-modal" @click="close">
        <div class="user-modal">
            <!-- <div class="form-register">
                <input type="text" name="name" placeholder="Name" v-model="registerName" @keyup="submit('register', $event)">
                <input type="email" name="email" placeholder="Email" v-model="registerEmail" @keyup="submit('register', $event)">
                <input type="password" name="password" placeholder="Password" v-model="registerPassword" @keyup=" submit('register', $event)">
                <input type="submit" @click="submit('register', $event)" v-model="registerSubmit" id="registerSubmit">
            </div> -->
            <div class="form-login">
                <input type="text" name="user" placeholder="Email or Username" v-model="loginUser" @keyup="submit('login', $event)">
                <input type="password" name="password" placeholder="Password" v-model="loginPassword" @keyup="submit('login', $event)">
                <input type="submit" @click="submit('login', $event)" v-model="loginSubmit" id="loginSubmit">
                <div class="links">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "signIn",
  data() {
    return {
      active:null,
      // registerName:'',
      // registerEmail:'',
      // registerPassword:'',
      // registerSubmit:'',
      loginUser:'',
      loginPassword:'',
      loginSubmit:''
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>



<style  scoped lang="scss">
.user-modal-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  overflow-y: auto;
  z-index: 3;
  font-family: "Lato", "Helvetica Neue", "Helvetica", "Arial", "sans-serif";
  font-size: 14px;
  background-color: rgba(17, 17, 17, 0.9);
  -webkit-transition: all 0.25s linear;
  -moz-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;
  -ms-transition: all 0.25s linear;
  transition: all 0.25s linear;
}

.user-modal-container.active {
  opacity: 1;
  visibility: visible;
}

.user-modal-container .user-modal {
  position: relative;
  margin: 50px auto;
  width: 90%;
  max-width: 500px;
  background-color: #f6f6f6;
  cursor: initial;
}

.user-modal-container .form-login,
.user-modal-container .form-register,
.user-modal-container .form-password {
  padding: 75px 25px 25px;
  // display: none;
}

.user-modal-container .form-login.active,
.user-modal-container .form-register.active,
.user-modal-container .form-password.active {
  display: block;
}

.user-modal-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #eeeeee;
}

.user-modal-container input[type="submit"] {
  color: #f6f6f6;
  border: 0;
  margin-bottom: 0;
  background-color: #3fb67b;
  cursor: pointer;
}

.user-modal-container input[type="submit"]:hover {
  background-color: #3aa771;
}

.user-modal-container input[type="submit"]:active {
  background-color: #379d6b;
}

.user-modal-container .links {
  text-align: center;
  padding-top: 25px;
}

.user-modal-container .links a {
  color: #3fb67b;
}
</style>
