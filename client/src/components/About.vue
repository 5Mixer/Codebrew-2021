<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            About The Application
          </slot>
          <button type="button" class="btn-close" @click="close">
            X
          </button>
        </header>

        <section class="modal-body">
          <slot name="body">
            <form class="form">
              <div>
                <label for="discordToken">Blot is a new visual programming environment that we have developed on top of the blockly programming environment. 
                    It combines the simplicity of visual programming tools, which have historically only been used to make games, with the APIs of slack, discord, 
                    and any other public facing JSON API. This completely advances the possibilities of visual programming. Now, external services can be interfaced 
                    with and programmed by non-programmers. Whilst we’ve established integration with discord, slack and have created a JSON HTTP request block, many 
                    possibilities exist for combining services in a manner that is more intelligent than ‘if this, then that’.</label>
              </div>
            </form>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>



<script>

export default {
  name: "Modal",
  methods: {
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
.btn-red {
  color: white;
  background: red;
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