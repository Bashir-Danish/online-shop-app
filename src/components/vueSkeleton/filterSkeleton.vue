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
                <Placeholder hight="1.3em" width="40%" border-radius="5px" margin=".5em 1em 0 1em" />
                <div class="category">
                    <Placeholder hight="1.3em" width="85%" border-radius="5px" margin=".4em" />
                </div>
            </div>
        </div>
        <div class="filter-section">
            <div class="price">
                <Placeholder hight="1.2em" width="30%" border-radius="5px" margin="0 0 1em 0" />
                <ul class="price-ul">
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".5em auto" />
                </ul>
            </div>
            <div class="brand">
                <Placeholder hight="1.2em" width="30%" border-radius="5px" margin="0 0 1em 0" />
                <ul class="brand-ul">
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".6em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".5em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".5em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".5em auto" />
                    <Placeholder hight="1.2em" width="90%" border-radius="5px" margin=".5em auto" />
                </ul>
            </div>

        </div>
    </div>
</template>
<style scoped lang="scss">
@import '@/assets/variables.scss';

.side-bar-s {
    position: sticky;
    top: 75px;
    width: 220px;
    border-top-left-radius: 10px;
    background-color: $white;

    .header-section {
        padding: .5em;

        .filter-header {
            display: flex;
            justify-content: space-between;
            margin: .5em 1em 0 .5em;
            align-items: baseline;

            .all-category {
                span {
                    font-weight: 700;
                    margin: .2em .3em;

                }

                .category {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 10px 0;
                    font-weight: 900;

                    span {
                        display: inline-flex;
                        font-size: 1.3em;
                    }
                }

            }

        }
    }

    .filter-section {
        border-top: 1px solid $gray-2;
    }

    .price,
    .brand {
        padding: 1em 1.5em;

        label {
            cursor: pointer;
        }

        border-bottom: 1px solid $gray-2;
    }
}
</style>