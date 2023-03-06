<template >
    <div class="background-color">
        <div class="change-pass-container">
            <div class="path">
                <span>My Account</span>
                <span class="icon">
                    <Icon size="10">
                        <IosArrowRtl24Regular />
                    </Icon>
                </span>
                <span>Change Password</span>
            </div>
            <from @submit.prevent="" class="change-pass-form">
                <BaseInput v-model="formData.currentPass" input-type="password" input-id="CURRENT PASSWORD"
                    :is-required="true" />
                <BaseInput v-model="formData.newPass" input-type="password" input-id="NEW PASSWORD" :is-required="true" />
                <BaseInput v-model="formData.reNewPass" input-type="password" input-id="RETYPE NEW PASSWORD"
                    :is-required="true" />
                <span class="error" v-if="authStore.errorMassage != ''">{{ authStore.errorMassage }}</span>
                <button type="submit" @click="changePassword">CHANGE PASSWORD</button>
            </from>
        </div>
    </div>
</template>
<script setup  lang="ts">
import { ref } from "vue";
import { IosArrowRtl24Regular } from '@vicons/fluent/'
import BaseInput from '@/components/smallComponents/BaseInput.vue';
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const formData = ref({
    currentPass: '',
    newPass: '',
    reNewPass: ''
});

const changePassword = () => {
    authStore.errorMassage = ''
    if (formData.value.currentPass && formData.value.newPass && formData.value.reNewPass) {
        if (formData.value.newPass != formData.value.reNewPass) {
            authStore.errorMassage = `Passwords aren't match`
        } else {
            authStore.changePass(formData.value.currentPass, formData.value.newPass)
        }
    } else {
        authStore.errorMassage = 'Please fill inputs'
    }
}

</script>
<style lang="scss" scoped>
@import '@/assets/variables.scss';

.background-color {
    padding: 1em;
    min-height: calc(100vh - 100px);
    margin: 0;
    background: $backGround;
}

.change-pass-container {
    height: 70vh;
    background: $white;
    box-shadow: $dOp-2 0px 0px 8px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    max-width: 1366px;
    margin: 0 auto;

    .path {
        font-size: 12px;
        display: flex;
        align-items: center;
        color: $gray-10;
        border-bottom: 1px solid $gray-2;
        padding: .8em 1.5em;

        .icon {
            padding: .5em;
        }

        span:last-child {
            color: $gray-15;
        }
    }

    .change-pass-form {
        font-size: 14px !important;
        display: flex;
        flex-direction: column;
        margin: 4em auto;
        width: 30%;
        .error{
            text-align: center;
            padding: 0.5em;
            color: $gray-9;
        }
        button {
            height: 45px;
            width: 90%;
            border: none;
            border-radius: 25px;
            background-color: $green;
            transition: all 0.5s ease;
            color: $white;
            margin: 0 auto;
            box-shadow: 2px 2px 10px $gray-2;
            cursor: pointer;

            &:hover {
                box-shadow: 2px 2px 10px $gray-5;
                background-color: $blue;
            }
        }
    }

}
</style>