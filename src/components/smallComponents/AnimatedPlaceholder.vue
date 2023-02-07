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
    background-color: #f1f1f1;

    /* The moving element */
    &::after {
        display: block;
        content: "";
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 100%;
        /* transform: translateX(20px); */
        background: -webkit-gradient(linear, left right,
                right top, from(transparent),
                color-stop(rgba(226, 226, 226, 0.2)),
                to(transparent));

        background: linear-gradient(90deg, transparent,
                rgba(70, 70, 70, 0.1), transparent);
        /* Adding animation */
        animation: loading 0.8s ease infinite;
    }
}

/* Loading Animation */
@keyframes loading {
    // 0% {
    //     background-position: -150px;
    //     /* transform: ba(-80px); */
    // }

    100% {
        background-position: 150px;
        /* transform: ba(-80px); */
    }
}
</style>