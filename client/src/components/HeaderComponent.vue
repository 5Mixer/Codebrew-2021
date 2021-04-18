<template>
  <div class="header">
    <a href="/" class="logo">Bot blockly</a>
    <a v-if="isLoggedIn"> {{`Welcome ${this.userInfo.email}`}} </a>
    <div class="header-right">
      <button v-if="isLoggedIn" @click="handleLogout">Logout</button>
      <button v-else id ="show-modal" @click="showLoginModal">Login</button>
      <!-- use the modal component -->
      <LoginModal v-show="isLoginModalVisible" @close="closeLoginModal" />
      <button id="show-modal" @click="showTokenModal">Edit Bot Tokens</button>
      <!-- use the modal component -->
      <TokenModal v-show="isTokenModalVisible" @close="closeTokenModal" />
      <button id="show-modal" @click="showAboutModal">About</button>
      <About v-show="isAboutModalVisible" @close="closeAboutModal" />
    </div>
  </div>
</template>

<script>
import LoginModal from "./LoginModalComponent.vue";
import TokenModal from "./TokenModalComponent.vue";
import About from "./About.vue";


export default {
  name: "HeaderComponent",
  computed : {
      isLoggedIn : function(){ return  this.userInfo != null}
    },
  components: {
    LoginModal,
    TokenModal,
    About,
  },
  data() {
    return {
      isLoginModalVisible: false,
      isTokenModalVisible: false,
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      isAboutModalVisible: false,
    };
  },
  methods: {
    showLoginModal() {
      this.isLoginModalVisible = true;
    },
    closeLoginModal() {
      this.isLoginModalVisible = false;
    },
    showTokenModal() {
      this.isTokenModalVisible = true;
    },
    closeTokenModal() {
      this.isTokenModalVisible = false;
    },
    handleLogout() {
        localStorage.removeItem("userInfo");
        this.userInfo = {};
        },
    showAboutModal() {
      this.isAboutModalVisible = true;
    },
    closeAboutModal() {
      this.isAboutModalVisible = false;
    }
  },
};
</script>

<style>
.header {
  overflow: hidden;
  background-color: #f1f1f1;
}

/* Style the header links */
.header button {
  float: left;
  color: black;
  border-style: none;
  text-align: center;
  cursor: pointer;
  padding: 12px 25px 12px 25px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header a.logo {
  font-size: 25px;
  font-weight: bold;
}

/* Change the background color on mouse-over */
.header a:hover {
  background-color: #ddd;
  color: black;
}

/* Change the background color on mouse-over */
.header button:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header button.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}
</style>
