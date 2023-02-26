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
    // isLoading.value = true
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
                <div class="first-form">
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


<style scoped lang="scss">
@import '@/assets/variables.scss';

.LoginForm {
    position: fixed;
    left: 0;
    right: 0;
    top: 5em;
    margin-left: auto;
    margin-right: auto;
    width: 47%;
    height: 80%;
    background-color: $white;
    border-radius: 1em;
    -webkit-box-shadow: 2px 111px 300px -33px $gray-8;
    -moz-box-shadow: 2px 111px 300px -33px $gray-8;
    box-shadow: 2px 111px 300px -33px $gray-8;
    display: flex;
    z-index: 210;

    .close {
        background-color: transparent;
        border: none;
        position: absolute;
        right: 2em;
        top: 2.5em;
        cursor: pointer;
    }

    .info-section {
        width: 45%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;

        .logo {
            width: 100%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 400;
            color: $green;

            p {
                margin-left: 1em;
                width: 45%;
            }

            img {
                width: 70px;
                height: 70px;
            }
        }

        h1 {
            color: $green;
            font-weight: 600;
            text-align: left;
            padding-left: 2em;
        }

        .detail {
            width: 50%;
            display: flex;
            margin-right: 50px;
            color: $green;
            font-weight: 200;
        }
    }

    .form-groups {
        position: relative;
        width: 70%;
        height: 100%;
        border-left: 1px solid $gray-3;
        background-color: $white;
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
        .errorS {
                color: $gray-5;
                font-size: 14px;
                font-weight: 400;
            }
        .first-form {
            width: 85%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 5em auto;

            .divider {
                margin-top: 2em;
                background-color: $gray-3;
                width: 90%;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    width: 2em;
                    height: 2em;
                    color:$gray-6;
                    background-color: $white;
                    text-align: center;
                    font-size: 20px;
                }
            }

            .goSignup {
                color: $lightBlue;
                font-size: 16px;
                font-weight: 400;
                margin: 10px;
                cursor: pointer;
            }
        }

        .login-loader {
            position: absolute;
            width: 95%;
            height: 100%;
            background: $bgOp-7;
            z-index: 100;
            display: flex;
            align-items: flex-start;
            justify-content: center;

            .login-loader-item {
                margin-top: 6em;
            }
        }


        .otp-form-group,
        .resetPass-form-group {
            width: 85%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 7em auto;

            

            .loadSpinner {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .otpInput {
                margin-top: 2em;
                animation: 0.5s ease-in-out 0s 1 FadeIn;
                transition: 0.5s ease-in;

                .otp {
                    width: 2em;
                    height: 2em;
                    color: $green;
                    font-size: 16px;
                    margin: 0 0.5em;
                    border: none;
                    text-align: center;
                    border-radius: 8px;
                    background: linear-gradient(145deg, $gray-2, $white);
                    box-shadow: 6px 6px 12px $gray-4,
                        -6px -6px 12px $white;

                    &:focus {
                        outline: 0.3px $green solid;
                    }

                }
            }
        }
    }

    .button {
        height: 45px;
        width: 90%;
        border: none;
        border-radius: 5px;
        background-color: $green;
        transition: all 0.5s ease;
        font-size: 18px;
        color: $white;
        margin-top: 1em;
        box-shadow: 2px 2px 10px $gray-3;
        
        &:hover {
            box-shadow: 2px 2px 10px $gray-5;
            background-color: $blue;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .divider {
        background: $gray-3;
        width: 75%;
        margin: 0 auto;
        height: 0.5px;
    }

    .loginLink {
        color: $lightBlue;
        font-size: 16px;
        font-weight: 400;
        margin: 10px;
        cursor: pointer;
    }
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
</style>