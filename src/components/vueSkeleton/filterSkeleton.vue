<script setup lang="ts">
import Placeholder from '@/components/smallComponents/AnimatedPlaceholder.vue'

</script>
<template>
    <div class="side-bar-s">
        <div class="header-section">
            <div class="filter-header">
                <Placeholder hight="1.3em" width="30%" border-radius="5px" />
            </div>
            <div class="all-category">
                <Placeholder hight="1.3em" width="40%" border-radius="5px" margin="1em 1em 0 1em" />
                <div class="category">
                    <Placeholder hight="1.3em" width="85%" border-radius="5px" margin="0.4em" />
                </div>
            </div>
        </div>
        <div class="filter-section">
            <div class="price">
                <Placeholder hight="1.2em" width="30%" border-radius="5px" margin="0 0 1em 0" />
                <ul class="price-ul">
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.5em auto" />
                </ul>
            </div>
            <div class="brand">
                <Placeholder hight="1.2em" width="30%" border-radius="5px" margin="0 0 1em 0" />
                <ul class="brand-ul">
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.5em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.5em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.5em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin="0.5em auto" />
                </ul>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
.side-bar-s {
    position: sticky;
    top: 75px;
    width: 215px;
    max-width: 90vh;
    height: fit-content;
    outline: none;
    border-top-left-radius: 10px;
    background-color: #ffffff;
    box-shadow: none;
    z-index: 80;

    .header-section {
        margin: 0 0.5em 0 0.5em;

        .filter-header {
            display: flex;
            justify-content: space-between;
            margin: 1em 1em 0 1em;
            align-items: baseline;

        }
    }
}






.filter-header .all-category span {
    font-weight: 700;
    margin: 0.2em 0.3em;

}

.category {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
    color: #414e5a;
    font-weight: 900;
}

.category span {
    display: inline-flex;
    font-size: 1.3em;
}

.filter-section {
    border-top: 1px solid #e5e6e9;
}

.price,
.brand {
    padding: 1em 1.5em;
}


.price {
    border-bottom: 1px solid #e5e6e9;
}

.price-ul {}

.brand-ul {
    // display: flex;
    // flex-direction: column;
    // color: #414e5a;
    // font-size: 1.3em;
    // font-weight: 500;
    // max-height: 170px;
    // min-height: 170px;
    // margin: 0.5em 0;
    // overflow-y: scroll;
}

.brand-ul::-webkit-scrollbar {
    display: none;
}

.price label,
.brand label {
    cursor: pointer;
}
</style>