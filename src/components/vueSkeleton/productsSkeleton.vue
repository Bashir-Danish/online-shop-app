<script setup lang="ts">
import Placeholder from '@/components/smallComponents/AnimatedPlaceholder.vue'
</script>
<template>
    <!-- <div class="product-headers">
        <div class="first-header">
            <div class="count">
                <Placeholder hight="1.3em" width="30%" border-radius="5px" />
            </div>
            <div class="sort">
                <Placeholder hight="1.3em" width="40%" border-radius="5px" margin="0 .5em" />
                <Placeholder hight="1.3em" width="15%" border-radius="5px" margin="0 .5em" />
            </div>
        </div>
    </div> -->
    <div class="products-container">
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />

                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />
                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />

                    </div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="product-details">
                <div class="product-img">
                    <Placeholder hight="13em" width="19em" border-radius="5px" />
                </div>
                <div class="desc-wrapper">
                    <div class="row1">
                        <Placeholder hight="1em" width="90%" border-radius="5px" margin="0.5em 0" />
                        <Placeholder hight="1em" width="40%" border-radius="5px" margin="0.5em 0" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.main-content {
    margin: 0 auto;
}

.product-headers {
    margin: 0 1.5em;
    border-bottom: 1px solid #e5e6e9;
}

.first-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em 0;

}

.first-header .count {
    display: flex;
    width: 50%;
}


.sort {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: end;
}

.products-container {

    display: flex;
    flex-wrap: wrap;
    row-gap: 1.5em;
    margin: 0 1.5em;
}


.product {
    width: 25%;
}

.product-details {
    padding: 20px;
    margin: 0 auto;
}

.desc-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: flex-start;
    margin-top: 16px;
}

.desc-wrapper .row1 {
    display: flex;
    flex-direction: column;

}

.row1 {
    height: unset;
    max-height: none;
    font-size: 1.5em;

}

.row2 {
    flex-grow: 1;
    margin-top: 0;
}
</style>
