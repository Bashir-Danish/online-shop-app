<template>
    <TransitionGroup name="modals">
        <div class="notife-div">
            <div>{{ authStore.notifeeMsg }}</div>
            <Icon size="20" class="dismiss" @click.stop="authStore.notifeeMsg = ''">
                <Dismiss48Regular />
            </Icon>
        </div>
    </TransitionGroup>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from '@/stores/auth';
import { Dismiss48Regular } from '@vicons/fluent/'

const authStore = useAuthStore();
const closeNotifee = () => {
    setTimeout(() => {
        authStore.notifeeMsg = ''
    }, 3000);
}
onMounted(() => {
    closeNotifee()
})
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.notife-div {
    width: 35%;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    inset: (auto 0 3em 0);
    margin: 0 auto;
    padding: 0 1em;
    background-color: $dOp-9;
    color: $white;
    border-radius: 30px;
    z-index: 1000;

    .dismiss {
        position: relative;
        height: 1.5em;
        width: 1.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &::after {
            content: '';
            width: 100%;
            height: 100%;
            background: $gray-10;
            position: absolute;
            inset: (0 auto);
            border-radius: 50%;
            transform: scale(0);
            transition: all .4s ease;
            z-index: -1;
        }

        &:hover:after {
            transform: scale(1);
        }
    }
}


.modals-enter-from {
    transform: translateY(200px);
}

.modals-enter-to {
    transform: translateY(0);
}

.modals-enter-active {
    transition: all 0.5s ease-in-out;
}

.modals-leave-from {
    transform: translateY(0);
}

.modals-leave-to {
    transform: translateY(-50px);
}

.modals-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}
</style>