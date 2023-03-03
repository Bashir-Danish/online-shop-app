<script  setup lang="ts">
import { HollowDotsSpinner, SemipolarSpinner } from 'epic-spinners'
import type { registerPayload } from '@/types/auth.types'
import BaseInput from '../smallComponents/BaseInput.vue';
import { ref, onMounted, reactive } from 'vue';
import { useAuthStore } from "@/stores/auth";



const authStore = useAuthStore();
const formData: registerPayload = reactive({
    email: '',
    name: '',
    lastName: '',
    phone: '',
    password: '',
    address: ''
});
const isLoading = ref(false)
const code = ref(0)
const otp1 = ref()
const otp2 = ref()
const otp3 = ref()
const otp4 = ref()



const sendOtp = () => {
    if (formData.email && authStore.isValid.isEmail) {
        authStore.sendOtp(formData.email);
    } else {
        authStore.errorMassage = "please enter your Email address"
    }

}
const verify = () => {
    if (formData.email && code.value) {
        authStore.verify(formData.email, code.value);
    } else {
        authStore.errorMassage = "Fill inputs"
    }

}

const register = () => {
    isLoading.value = true;

    if (authStore.isValid.isPassword && authStore.isValid.isName) {
        authStore.errorMassage = "ok"
        authStore.register(formData)

    } else {
        authStore.errorMassage = "Fill the field"
    }

}


onMounted(() => (
    authStore.errorMassage = "",
    authStore.showOtp = false,
    authStore.loading = false,
    authStore.isVerified = false
))
</script>

<template>

    <div class="signupForm">
        <div class="info-section">
            <div class="first-block">
                <div class="logo">
                    <p>Online Shopping store</p>
                    <img src="@/assets/logo.jpg" alt="">
                </div>
                <h1>Sign Up</h1>
            </div>
            <div class="divider"></div>
            <p class="detail">We do not share your
                personal details
                with anyone</p>
        </div>

        <div class="form-groups">
            <button type="button" class="close" @click="$emit('closeSignUPModal')"><vue-feather type="x" size="2.5em"
                    stroke="#159347" stroke-width="2"></vue-feather></button>
            <div class="signUp-loader" v-if="isLoading">
                <semipolar-spinner class="signUp-loader-item" :animation-duration="2000" :size="65" color="#159347" />
            </div>

            <form autocomplete="off" @submit.prevent="">
                <div class="first-form-group" v-if="!authStore.isVerified">
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
                    <button class="button" v-if="authStore.showOtp" type="submit" @click="verify">Verify</button>
                    <button class="button" v-if="!authStore.showOtp" type="submit" @click="sendOtp"
                        :disabled="!authStore.isValid.isEmail">Continue</button>

                    <span class="loginLink" @click="$emit('gotoLogin')">Exiting User? Log In</span>
                </div>
            </form>
            <form autocomplete="off" @submit.prevent="register">

                <transition-group name="modals">
                    <div class="second-form-group" v-if="authStore.isVerified">

                        <div class="form-control">
                            <BaseInput v-model="formData.name" input-type="text" input-id="Name" :is-required="true" />
                            <BaseInput v-model="formData.lastName" input-type="text" input-id="LastName"
                                :is-required="true" />
                        </div>
                        <div class="form-control">
                            <BaseInput v-model="formData.phone" input-type="number" input-id="Phone"
                                :is-required="true" />
                            <BaseInput v-model="formData.password" input-type="password" input-id="Password"
                                :is-required="true" />
                        </div>
                        <BaseInput v-model="formData.address" input-type="textarea" input-id="Address"
                            :is-required="true" />
                        <button class="button" type="submit"
                            :disabled="!authStore.isValid.isPassword && !authStore.isValid.isName">Register</button>

                        <span class="loginLink" @click="$emit('gotoLogin')">Exiting User? Log In</span>
                    </div>
                </transition-group>
            </form>
        </div>
    </div>
</template>


<style scoped lang="scss">
@import '@/assets/variables.scss';

.signupForm {
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
    z-index: 400;

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
            color: #159347;

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
    }

    .form-groups {
        position: relative;
        width: 70%;
        border-left: 1px solid $gray-2;
        background-color: $white;
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;

        .close {
            background-color: transparent;
            border: none;
            position: absolute;
            right: 2em;
            top: 2.5em;
            cursor: pointer;
        }

        .signUp-loader {
            position: absolute;
            width: 95%;
            height: 100%;
            background: $bgOp-7;
            z-index: 100;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }

        .first-form-group {
            width: 85%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 7em auto;

            .otpInput {
                margin-top: 2em;
                animation: 0.5s ease-in-out 0s 1 FadeIn;
                transition: 0.5s ease-in;

                .otp {
                    width: 2.5em;
                    height: 2.5em;
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

        .second-form-group {
            width: 85%;
            height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 7em auto;

            input {
                height: 55px;
            }

            .form-control {
                display: flex;
            }
        }

    }




    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    .loginLink {
        color: $lightBlue;
        font-size: 16px;
        font-weight: 400;
        margin: 10px;
        cursor: pointer;
    }

    .errorM {
        color: $red;
        font-size: 14px;
    }

    .errorS {
        color: $gray-5;
        font-size: 14px;
        font-weight: 400;
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
        margin-top: 2.5em;
        box-shadow: 2px 2px 10px $gray-2;
        
        &:hover {
            box-shadow: 2px 2px 10px $gray-5;
            background-color: $blue;
        }
    }
}



.loadSpinner {
    position: relative;
    width: 100%;
    height: 100%;
}




.divider {
    background-color: $gray-2;
    width: 75%;
    margin: 0 auto;
    height: 0.5px;
}


@keyframes FadeIn {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}


/* ////////////////////////////////////////////////// */



.signUp-loader-item {
    margin-top: 6em;
}
</style>