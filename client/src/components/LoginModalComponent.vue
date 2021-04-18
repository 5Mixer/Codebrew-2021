<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            Sign In
          </slot>
          <button type="button" class="btn-close" @click="close">
            X
          </button>
        </header>

        <section class="modal-body">
          <slot name="body">
            <form class="form">
              <div>
                <label for="email">E-Mail Address</label>
                <input
                  id="email"
                  type="email"
                  v-model="input.email"
                  required
                  autofocus
                />
              </div>
              <div>
                <label for="password">Password</label>
                <input
                  id="password"
                  type="password"
                  v-model="input.password"
                  required
                />
              </div>
              <div>
                <button type="submit" class="btn-green" @click="submitLogin">
                  Login
                </button>
              </div>
              <div>
                <button type="submit" class="btn-green" @click="submitRegister">
                  Register
                </button>
              </div>
            </form>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "Modal",
  data() {
    return {
      input: {
        email: "",
        password: "",
      },
      userInfo: {},
      errors: [],
    };
  },
  methods: {
    async submitLogin() {
      if (this.input.email != "" && this.input.password != "") {
        try {
          const response = await axios.post(
            "http://localhost:5005/api/users/signin",
            { input: this.input },
            { headers: { "content-type": "application/json" } }
          );
          this.userInfo = response.data;

          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
          close();
          location.reload();
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("A email and password must be present");
      }
    },
    async submitRegister() {
      if (this.input.email != "" && this.input.password != "") {
        try {
          const response = await axios.post(
            "http://localhost:5005/api/users/register",
            { input: this.input },
            { headers: { "content-type": "application/json" } }
          );
          this.userInfo = response.data;
          console.log(this.userInfo)
          localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
          close();
          location.reload();
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("A email and password must be present");
      }
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  padding: 25px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  height: 43%;
  width: 30%;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
.form {
  max-width: 60rem;
  margin: 0 auto;
}

.form > div {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
