<script setup lang="ts">
import { HollowDotsSpinner, SemipolarSpinner } from 'epic-spinners'
import BaseInput from '../smallComponents/BaseInput.vue';
import { ref, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isLoading = ref(false);
const formData = ref({
    email: '',
    password: '',
    sndPassword: ''
});


const otpLoginForm = ref(false)
const code = ref(0)
const otp1 = ref()
const otp2 = ref()
const otp3 = ref()
const otp4 = ref()


const sendLoginOtp = () => {
    if (formData.value.email && authStore.isValid.isEmail) {
        authStore.sendLoginCode(formData.value.email);
    } else {
        authStore.errorMassage = "please enter your Email address"
    }

}
const verify = () => {
    if (formData.value.email && code.value) {
        authStore.verify(formData.value.email, code.value);
    } else {
        authStore.errorMassage = "Fill inputs"
    }

}
const login = () => {
    isLoading.value = true
    authStore.errorMassage = ''
    if (authStore.isValid.isEmail && authStore.isValid.isPassword) {
        authStore.login(formData.value);
    }
}

const resetPass = () => {
    authStore.isVerified = false
    isLoading.value = true
    authStore.errorMassage = ''
    if (formData.value.password == formData.value.sndPassword) {
        authStore.resetPass(formData)
    }
    
}

watch(() => formData.value.sndPassword, () => {

    if (formData.value.password == formData.value.sndPassword) {
        authStore.errorMassage = "Passwords are match"
    } else {
        authStore.errorMassage = "Passwords aren't match"
    }
})

onMounted(() => (
    authStore.errorMassage = "",
    authStore.showOtp = false,
    authStore.loading = false,
    authStore.isVerified = false
))
</script>
<template>
    <form class="LoginForm">
        <div class="info-section">
            <div class="first-block">
                <div class="logo">
                    <p>Online Shopping store</p>
                    <img src="@/assets/logo.jpg" alt="">
                </div>
                <h1>Log In</h1>
            </div>
            <div class="divider"></div>
            <p class="detail">We do not share your
                personal details
                with anyone</p>
        </div>

        <div class="form-groups">
            <button type="button" class="close" @click="$emit('closeLoginModal')"><vue-feather type="x" size="2.5em"
                    stroke="#159347" stroke-width="2"></vue-feather></button>
            <div class="login-loader" v-if="isLoading && !authStore.errorMassage">
                <semipolar-spinner class="login-loader-item" :animation-duration="2000" :size="65" color="#159347" />
            </div>
            <form autocomplete="off" @submit.prevent="login" v-if="!otpLoginForm">
                <div class="loginForm">
                    <BaseInput v-model="formData.email" input-type="email" input-id="Email" :is-required="true" />
                    <BaseInput v-model="formData.password" input-type="password" input-id="Password"
                        :is-required="true" />
                    <span class="errorS" v-if="authStore.errorMassage">{{ authStore.errorMassage }}</span>

                    <button class="button" type="submit">Log In</button>
                    <div class="divider"> <span>or</span></div>
                    <button class="button" type="button" @click="otpLoginForm = true">Login with OTP</button>
                    <span class="goSignup" @click="$emit('gotoSignup')">Don't have an account? Sign Up</span>
                </div>
            </form>
            <form autocomplete="off" @submit.prevent="" v-if="otpLoginForm && !authStore.isVerified">
                <transition-group name="otpLoginForm">

                    <div class="otp-form-group">
                        <BaseInput v-model="formData.email" input-type="email" input-id="Email" :is-required="true" />
                        <span class="errorS" v-show="authStore.errorMassage">{{ authStore.errorMassage }}</span>
                        <hollow-dots-spinner class="loadSpinner" v-if="authStore.loading" :animation-duration="1000"
                            :dot-size="10" :dots-num="3" color="#159347" />

                        <div class="otpInput" v-if="authStore.showOtp">
                            <input class="otp" type="number" id="1" ref="otp1" maxlength="1" @input="() => {
                            code = otp1.value
                            otp2.focus()
                        }
                        ">
                            <input class="otp" type="number" id="2" ref="otp2" maxlength="1" @input="() => {
                            code += otp2.value
                                    otp3.focus()
                                }">
                            <input class="otp" type="number" id="3" ref="otp3" maxlength="1" @input="() => {
                                code += otp3.value
                                otp4.focus()
                            }">
                            <input class="otp" type="number" id="4" ref="otp4" maxlength="1" @input="() => {
                                code += otp4.value
                            }">
                        </div>
                        <button class="button" v-if="!authStore.showOtp" type="submit" @click="sendLoginOtp"
                            :disabled="!authStore.isValid.isEmail">Continue</button>
                        <button class="button" v-if="authStore.showOtp" type="button" @click="verify">Verify</button>

                        <span class="loginLink" @click="$emit('gotoSignup')">Exiting User? Log In</span>
                    </div>
                </transition-group>
            </form>
            <form autocomplete="off" @submit.prevent="resetPass" v-show="authStore.isVerified">
                <transition-group name="otpLoginForm">
                    <div class="resetPass-form-group">

                        <BaseInput v-model="formData.password" input-type="password" input-id="New Password"
                            :is-required="true" />
                        <BaseInput v-model="formData.sndPassword" input-type="password" input-id="Confirm Password"
                            :is-required="true" />

                        <span class="errorS" v-show="formData.sndPassword">{{ authStore.errorMassage }}</span>
                        <button class="button" type="submit"
                            :disabled="formData.password !== formData.sndPassword">Reset Password</button>
                        <span class="loginLink" @click="$emit('gotoSignup')">Exiting User? Log In</span>
                    </div>
                </transition-group>
            </form>
        </div>
    </form>
</template>


<style scoped>
.LoginForm {
    position: fixed;
    left: 0;
    right: 0;
    top: 5em;
    margin-left: auto;
    margin-right: auto;
    width: 47%;
    height: 80%;
    background-color: #ffffff;
    border-radius: 1em;
    -webkit-box-shadow: 2px 111px 300px -33px rgba(3, 2, 7, 0.27);
    -moz-box-shadow: 2px 111px 300px -33px rgba(8, 3, 15, 0.27);
    box-shadow: 2px 111px 300px -33px rgba(7, 3, 20, 0.27);
    display: flex;
    z-index: 210;
}

.close {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 2em;
    top: 2.5em;
    cursor: pointer;
}

.loadSpinner {
    position: relative;
    width: 100%;
    height: 100%;
}

.info-section {
    width: 45%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}

img {
    width: 70px;
    height: 70px;
}

.logo {
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;
    color: #159347;
}

.logo p {
    margin-left: 1em;
    width: 45%;
}

h1 {
    color: #159347;
    font-weight: 600;
    text-align: left;
    padding-left: 2em;
}

.detail {
    width: 50%;
    display: flex;
    margin-right: 50px;
    color: #159347;
    font-weight: 200;
}

.divider {
    background-color: #cccccc;
    width: 75%;
    margin: 0 auto;
    height: 0.5px;
}

.form-groups {
    position: relative;
    width: 70%;
    height: 100%;
    border-left: 1px solid #cccccc;
    background-color: #ffffff;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
}

.loginForm {
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5em auto;
}

.loginForm .divider {
    margin-top: 2em;
    background-color: #cccccc;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loginForm .divider span {
    width: 2em;
    height: 2em;
    color: rgb(130, 130, 130);
    background-color: #ffffff;
    text-align: center;
    font-size: 20px;
}

.button {
    height: 45px;
    width: 90%;
    border: none;
    border-radius: 5px;
    background-color: #159347;
    transition: all 0.5s ease;
    font-size: 18px;
    color: #ffffff;
    margin-top: 1em;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.301);
}
.button:hover{
    background-color: #071c92;
}
.goSignup {
    color: #0086ff;
    font-size: 16px;
    font-weight: 400;
    margin: 10px;
    cursor: pointer;
}

.login-loader {
    position: absolute;
    width: 95%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.76);
    z-index: 100;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

.login-loader-item {
    margin-top: 6em;
}

.errorS {
    color: #c2bebe;
    font-size: 14px;
    font-weight: 400;
}

.otp-form-group,
.resetPass-form-group {
    width: 85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 7em auto;
}

.loginLink {
    color: #0086ff;
    font-size: 16px;
    font-weight: 400;
    margin: 10px;
    cursor: pointer;
}


/* ////////////////////////////////////////////////// */

.otpLoginForm-enter-from {
    opacity: 0;
    transform: scale(0);
    transform: translateX(-5em);
}

.otpLoginForm-enter-to {
    opacity: 1;
    transform: scale(1);
    transform: translateX(0);
}

.otpLoginForm-enter-active {
    transition: all 0.5s ease-in-out;
}

.otpLoginForm-leave-from {
    opacity: 1;
    transform: scale(1);
    transform: translateX(0);
}

.otpLoginForm-leave-to {
    opacity: 0;
    transform: scale(0.5);
    transform: translateX(5em);
}

.otpLoginForm-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}

.modals-move {
    transition: all 0.5s ease;
}

.otpInput {
    margin-top: 2em;
    animation: 0.5s ease-in-out 0s 1 FadeIn;
    transition: 0.5s ease-in;
}

.otp {
    width: 3em;
    height: 3em;
    color: #159347;
    font-size: 16px;
    margin: 0 0.5em;
    border: none;
    text-align: center;
    border-radius: 8px;
    background: linear-gradient(145deg, #e6e1e1, #ffffff);
    box-shadow: 6px 6px 12px #e2dddd,
        -6px -6px 12px #ffffff;
}

.otp:focus {
    outline: 0.3px #159347 solid;
}


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>