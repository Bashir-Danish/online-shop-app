<script setup lang="ts">
import SignUP from "./auth/signup.vue";
import Login from "./auth/login.vue";
import SearchBar from "./searchBar.vue";
import { RouterLink } from "vue-router";
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const showSingUPModal = ref(false);
const showLoginModal = ref(false);

watch(
  () => authStore.isLoggedIn,
  () => {
    if (authStore.isLoggedIn == true) {
      setTimeout(() => {
        showSingUPModal.value = false;
        showLoginModal.value = false;
      }, 1500);
    }
  }
);
</script>

<template>
  <header>
    <div class="container" v-if="showLoginModal || showSingUPModal" @click="
      showLoginModal = false;
    showSingUPModal = false;
    "></div>
    <TransitionGroup name="modals" mode="out-in">
      <SignUP v-if="showSingUPModal" @closeSignUPModal="showSingUPModal = false" @gotoLogin="
        () => {
          showSingUPModal = false;
          showLoginModal = true;
        }
      " />
      <Login v-if="showLoginModal" @closeLoginModal="showLoginModal = false" @gotoSignup="
        () => {
          showLoginModal = false;
          showSingUPModal = true;
        }
      " />
    </TransitionGroup>
    <div class="header-center">
      <div class="social-links">
        <ul class="social-list">
          <li>
            <a href=""><vue-feather type="mail" size="1.4em" fill="#ececec" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="facebook" size="0.8em" fill="#159347" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="linkedin" size="0.8em" fill="#159347" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="instagram" size="0.8em" fill="#159347" stroke="#ececec"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="twitter" size="0.8em" fill="#159347" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
        </ul>
        <div class="account-info">
          <a href=""><vue-feather type="mail" size="1em" fill="#159347" stroke="#ececec"
              stroke-width="2"></vue-feather></a>
          <span>contact@gmail.com </span>
        </div>
      </div>
      <div class="right-section">
        <RouterLink to="/"><vue-feather type="map-pin" size="1em" fill="#159347" stroke="#ececec"
            stroke-width="2"></vue-feather>
          Malad West</RouterLink>
        <RouterLink to="/"><vue-feather type="truck" size="1em" fill="#159347" stroke="#ececec"
            stroke-width="2"></vue-feather>
          Track Order</RouterLink>
        <div class="signup-login" v-if="!authStore.isLoggedIn">
          <span @click="showLoginModal = true"><vue-feather type="user" size="1em" fill="#159347" stroke="#ececec"
              stroke-width="2"></vue-feather>
            Log In</span>
          <span>|</span>
          <span @click="showSingUPModal = true">Sign Up</span>
        </div>
        <div v-else>
          <span @click="showLoginModal = true"><vue-feather type="user" size="1em" fill="#159347" stroke="#ececec"
              stroke-width="2"></vue-feather>
            Account</span>
        </div>
      </div>
    </div>
  </header>
  <SearchBar />
</template>

<style scoped>
header {
  width: 100%;
  height: 30px;
  background-color: #159347;
}

.header-center {
  max-width: 1366px;
  width: 100%;
  color: #ececec;
  margin: 0;

  height: 30px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  background-color: #159347;
}

ul {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #ececec;
}

.social-list li {
  display: flex;
  align-items: center;
  width: 1.2em;
  height: 1.2em;

  margin: 0 0.3em;
}

.social-links {
  margin: 1em;
  display: flex;
  align-items: center;
}

.account-info {
  display: flex;
  font-size: 16px;
  align-items: center;
  margin: 0 2.5em;
}

.account-info a {
  display: inline-flex;
  margin: 0 1em;
}

.social-item {
  background-color: #ececec;
  width: 1.3em;
  height: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 100%;
}

.right-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 32%;
  margin: 0 1.5em;
}

.right-section a {
  display: flex;
  align-items: center;
}

.signup-login {
  display: flex;
}

.signup-login span {
  margin: 0 0.5em;
  padding: 0;
  font-size: 1.1em;
  font-weight: 100;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* /////////////////// */

.container {
  animation: 0.5s ease-in-out 0s 1 FadeIn;
}

@keyframes FadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 31, 0.733);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modals-enter-from {
  opacity: 0;
  transform: scale(0);
  transform: translateY(-200px);
}

.modals-enter-to {
  opacity: 1;
  transform: scale(1);
  transform: translateY(0);
}

.modals-enter-active {
  transition: all 0.5s ease-in-out;
}

.modals-leave-from {
  opacity: 1;
  transform: scale(1);
  transform: translateY(0);
}

.modals-leave-to {
  opacity: 0;
  transform: scale(0);
  transform: translateY(50px);
}

.modals-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}

.modals-move {
  transition: all 0.5s ease;
}
</style>
