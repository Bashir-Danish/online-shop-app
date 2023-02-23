<script setup lang="ts">
import { defineProps, ref, onMounted, watch } from 'vue'
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()


const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    modelValue: {
        type: String,
        default: ""
    },
    inputType: {
        type: String,
        default: ""
    },
    inputId: {
        type: String,
        default: ""
    },
    isRequired: {
        type: Boolean,
        default: false
    }
})

const message = ref("");
const mColor = ref(false)


function validate() {

    console.log(props.modelValue)
    if (props.modelValue && props.inputType === "email") {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(props.modelValue)) {
            message.value = "Email address is Validate"
            authStore.isValid.isEmail = true
            mColor.value = true;
        } else {
            message.value = "The input is not a valid address"
            authStore.isValid.isEmail = false
            mColor.value = false;
        }
    }
    if (props.modelValue && props.inputType === "password") {
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{7,}/
        if (re.test(props.modelValue)) {
            message.value = "Password is valid"
            authStore.isValid.isPassword = true
            mColor.value = true
        } else {
            message.value = "A-Z , a-z, 0-9 ,@"
            authStore.isValid.isPassword = false
            mColor.value = false;
        }
    }
    if (props.modelValue && props.inputType === "pincode") {
        const re = /^(?:[A-Z0-9]+([- ]?[A-Z0-9]+)*)?$/;
        if (re.test(props.modelValue)) {
            message.value = "Pincode is valid"
            mColor.value = true
        } else {
            message.value = "invalid Pincode"
            mColor.value = false;
        }
    }

    if (props.modelValue && (props.inputType === "text" || props.inputType === "textarea" || props.inputType === "number")) {
        if (props.modelValue.length >= 3) {
            message.value = "Input is valid"
            authStore.isValid.isName = true
            mColor.value = true;
        } else {
            message.value = "Invalid input"
            authStore.isValid.isName = false
            mColor.value = false;
        }

    }
    if (!props.modelValue) {
        mColor.value = true
    }
}

onMounted(() => (
    authStore.errorMassage = "",
    authStore.isValid.isEmail = false,
    authStore.isValid.isEmail = false,
    authStore.isValid.isName = false,
    mColor.value = false
));
</script>

<template>
    <div class="inputBox">
        <!-- <input type="pincode"> -->
        <input  :type="inputType" :value="modelValue" :required="isRequired"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value), validate()"
            @keyup="$emit('update:modelValue', ($event.target as HTMLInputElement).value), validate()">
        <span class="label" :style="[props.modelValue && { transform: 'translateY(-1.5em)', fontSize: '14px' }]">{{
            inputId
        }}</span>
        <span v-if="props.modelValue && message" class="message"
            :style="[mColor ? { color: '#159347' } : { color: 'red' }]">{{ message }}</span>
    </div>
</template>

<style scoped lang="scss">
.inputBox {
    position: relative;
    width: 100%;
    height: auto;
    text-align: center;

    input {
        height: 2.3em;
        width: 90%;
        border: none;
        outline: none;
        color: #2b2b2b;
        border-bottom: #cccccc 1px solid;
        font-size: 18px;
        margin-bottom: 2em;

        &:focus {
            border-bottom: 0.5px #0654b9 solid;
        }

        &:focus~.label,
        &:valid~.label {
            color: #0654b9;
            transform: translateY(-1.7em);
            font-size: 14px;
        }

        &:not(:focus)~span {
            display: none;
        }

        &:not(:focus)~.label {
            display: inherit
        }

        &[type=number] {
            -moz-appearance: textfield;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
    }

    .label {
        position: absolute;
        font-size: 16px;
        top: 0.5em;
        left: 1.5em;
        text-align: left;
        letter-spacing: 0.5px all;
        transition: 0.5s;
        font-weight: 200;
        color: #159347;
    }

    .message {
        position: absolute;
        left: 1.5em;
        top: 3.5em;
        transition: 0.5s ease-in-out;
        background-color: #ffffff;
        font-size: 14px;
    }
}
</style>