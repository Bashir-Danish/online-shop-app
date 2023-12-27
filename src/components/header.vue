<script setup lang="ts">
import SearchBar from "./searchBar.vue";
import { RouterLink } from "vue-router";
import { ref, watch, defineAsyncComponent } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'

const authStore = useAuthStore();

const SignUP = defineAsyncComponent(() =>
  import('./auth/signup.vue')
)
const Login = defineAsyncComponent(() =>
  import('./auth/login.vue')
)
const showAccDropdown = ref(false);
const dropdown = ref(false);

const router = useRouter();

const closeDropdown = () => {
  setTimeout(() => {
    if (!dropdown.value) {
      showAccDropdown.value = false
    }
  }, 300);
}
const Logout = () => {
  showAccDropdown.value = false
  authStore.isLoggedIn = false
  router.push({ path: '/', name: 'home' })
  localStorage.removeItem('tokenId')
}
watch(
  () => authStore.isLoggedIn,
  () => {
    if (authStore.isLoggedIn == true) {
      setTimeout(() => {
        authStore.showSingUPModal = false;
        authStore.showLoginModal = false;
      }, 500);
    }
  }
);
</script>

<template>
  <header>
    <div class="container" v-if="authStore.showLoginModal || authStore.showSingUPModal" @click="
      authStore.showLoginModal = false;
    authStore.showSingUPModal = false;"></div>
    <TransitionGroup name="modals">
      <SignUP v-if="authStore.showSingUPModal" @closeSignUPModal="authStore.showSingUPModal = false" @gotoLogin="
        () => {
          authStore.showSingUPModal = false;
          authStore.showLoginModal = true;
        }
      " />
      <Login v-if="authStore.showLoginModal" @closeLoginModal="authStore.showLoginModal = false" @gotoSignup="
        () => {
          authStore.showLoginModal = false;
          authStore.showSingUPModal = true;
        }
      " />
    </TransitionGroup>
    <div class="header-center">
      <div class="social-links">
        <ul class="social-list">
          <li>
            <a href=""><vue-feather type="mail" size="1em" fill="#ececec" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="facebook" size="0.7em" fill="#159347" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="linkedin" size="0.7em" fill="#159347" stroke="#159347"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="instagram" size="0.7em" fill="#159347" stroke="#ececec"
                stroke-width="1"></vue-feather></a>
          </li>
          <li class="social-item">
            <a href=""><vue-feather type="twitter" size="0.7em" fill="#159347" stroke="#159347"
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
          <span>Malad West</span>
        </RouterLink>
        <RouterLink to="/"><vue-feather type="truck" size="1em" fill="#159347" stroke="#ececec"
            stroke-width="2"></vue-feather>
          <span>Track Order</span>
        </RouterLink>
        <div class="signup-login" v-if="!authStore.isLoggedIn">
          <span @click="authStore.showLoginModal = true"><vue-feather type="user" size="1em" fill="#159347"
              stroke="#ececec" stroke-width="2"></vue-feather>
            Log In</span>
          <span>|</span>
          <span @click="authStore.showSingUPModal = true">Sign Up</span>
        </div>
        <div class="signup-login" v-else @mousemove.native="showAccDropdown = true" @mouseleave="closeDropdown()">
          <vue-feather type="user" size="1em" fill="#159347" stroke="#ececec" stroke-width="2"></vue-feather>
          <span>Hi {{ authStore.user.username }} {{ authStore.user.lastName }}</span>
          <vue-feather type="chevron-down" size="1.2em" fill="#159347" stroke="#ececec" stroke-width="2"></vue-feather>
        </div>
        <TransitionGroup name="dropdown">
          <div class="drop-down" v-if="showAccDropdown" @mouseover.stop="{ showAccDropdown = true; dropdown = true }"
            @mouseleave="{ dropdown = false ; closeDropdown() }">
            <div class="item" @click="router.push({ path: '/my-account', name: 'account' })  ; showAccDropdown = false">
              <span class="icon"><vue-feather type="lock" size="1em" stroke="#343a40"
                  stroke-width="2"></vue-feather></span>
              <span>Account</span>
            </div>

            <div class="item" @click.stop="showAccDropdown = false"><span class="icon"><vue-feather type="user" size="1em"
                  stroke="#343a40" stroke-width="2"></vue-feather></span> <span>Profile</span></div>

            <div class="item" @click.stop="showAccDropdown = false"><span class="icon"><vue-feather type="archive"
                  size="1em" stroke="#343a40" stroke-width="2"></vue-feather></span> <span>Orders</span></div>

            <div class="item" @click.stop="router.push({ path: '/wishlist', name: 'wishlist' }); showAccDropdown = false">
              <span class="icon"><vue-feather type="heart" size="1em" stroke="#343a40"
                  stroke-width="2"></vue-feather></span>
              <span>Wishlist</span>
            </div>
            <div class="item" @click.stop="Logout"><span class="icon"><vue-feather type="power" size="1em"
                  stroke="#343a40" stroke-width="2"></vue-feather></span> <span>Logout</span></div>
          </div>
        </TransitionGroup>

      </div>
    </div>
  </header>
  <SearchBar />
</template>

<style scoped lang="scss">
@import '@/assets/mixin.scss';
@import '@/assets/variables.scss';

header {
  width: 100%;
  height: 30px;
  background: $green;

}

.header-center {
  position: relative;
  max-width: 1366px;
  width: 100%;
  color: $gray-1;
  margin: 0;
  height: 30px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  background: $green ;

  ul {
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: $gray-1;
  }

  .social-links {
    margin: 1em;
    display: flex;
    align-items: center;

    .social-list {
      .social-item {
        background: $gray-1;
        width: 1em;
        height: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border-radius: 100%;
      }

      li {
        display: flex;
        align-items: center;
        width: 1.2em;
        height: 1.2em;
        margin: 0 0.3em;
      }
    }

    .account-info {
      display: flex;
      font-size: 16px;
      align-items: center;
      margin: 0 2.5em;

      a {
        display: inline-flex;
        margin: 0 1em;
      }
    }
  }

  .right-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 32%;
    margin: 0 1.5em;

    .signup-login {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        margin: 0 0.5em;
        display: flex;
        align-items: center;
      }
    }

    .drop-down {
      position: absolute;
      top: 100%;
      right: 2%;
      background: $white;
      box-shadow: $dOp-3 0px 3px 8px;
      border-radius: 10px;
      height: 210px;
      width: 170px;
      color: $gray-18;
      padding: .5em 0;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      z-index: 1000;

      &::after {
        content: '';
        position: absolute;
        inset: (-8px 0);
        margin: 0 auto;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 10px solid $white;
      }

      .item {
        display: flex;
        transition: all .3s ease;
        padding: .8em 0;

        .icon {
          padding: 0 .5em;
        }

        &:hover {
          background: $gray-1;
        }
      }
    }

    a {
      display: flex;
      align-items: center;
    }
  }

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
  background: $dOp-5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
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

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0);
}

.dropdown-enter-to {
  opacity: 1;
  transform: scaleY(1);
}

.dropdown-enter-active {
  transition: all 0.5s ease-in-out;
  transform-origin: top;
}

.dropdown-leave-from {
  opacity: 1;
  // transform: scaleY(1);
}

.dropdown-leave-to {
  opacity: 0;
}

.dropdown-leave-active {
  transition: all .1s ease-in;
  transform-origin: top;
  position: absolute;
}

.dropdown-move {
  transition: all 0.5s ease;
}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

@include responsive(tablet) {
  .header-center {
    background-color: aqua;
  }
}
</style>
