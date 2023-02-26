<script setup lang="ts">
defineProps({
    hight: {
        type: String
    },
    width: {
        type: String
    },
    margin: {
        type: String
    },
    borderRadius: {
        type: String
    },
})
</script>
<template>
    <div class="placeholder load">
        &nbsp;
    </div>
</template>



<style scoped lang="scss">
@import '@/assets/variables.scss';

.placeholder {
    height: v-bind(hight);
    margin: v-bind(margin);
}

.load {
    height: v-bind(hight);
    width: v-bind(width);
    max-width: 100%;
    max-height: 100%;
    border-radius: v-bind(borderRadius);
    position: relative;
    background-color: $gray-1;

    /* The moving element */
    &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 100%;
        border-radius: v-bind(borderRadius);

        /* transform: translateX(20px); */
        background: -webkit-gradient(linear, left right,
                right top, from(transparent),
                color-stop($bgOp-1),
                to(transparent));

        background: linear-gradient(90deg, transparent,
        $dOp-1, transparent);
        /* Adding animation */
        animation: loading 0.8s ease infinite;
    }
}

/* Loading Animation */
@keyframes loading {

    100% {
        background-position: 150px;
    }
}
</style>