<script lang="ts" setup>
import Placeholder from "@/components/smallComponents/AnimatedPlaceholder.vue";
</script>
<template lang="">
    <div class="wishlist">
            <div class="wish-item">
                <div class="item-img">
                    <Placeholder hight="150px" width="150px" border-radius="10px" margin="0.2em 0 0 0" />
                </div>
                <div class="details">
                    <div class="desc">
                    <Placeholder hight="1.1em" width="20em" border-radius="2px" margin="2em 0 0 0" />
                    <Placeholder hight="1.em" width="5em" border-radius="2px" margin="1em 0 0 0" />
        
                    </div>
                    <div class="action">
                            <Placeholder hight="1.5em" width="4em" border-radius="2px" margin="0em 0 0 0" />
                        <div class="remove">
                            <Placeholder hight="1.5em" width="4em" border-radius="2px" margin="0em 0 0 0" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="wish-item">
                <div class="item-img">
                    <Placeholder hight="150px" width="150px" border-radius="10px" margin="0.2em 0 0 0" />
                </div>
                <div class="details">
                    <div class="desc">
                    <Placeholder hight="1.1em" width="20em" border-radius="2px" margin="2em 0 0 0" />
                    <Placeholder hight="1.em" width="5em" border-radius="2px" margin="1em 0 0 0" />
        
                    </div>
                    <div class="action">
                            <Placeholder hight="1.5em" width="4em" border-radius="2px" margin="0em 0 0 0" />
                        <div class="remove">
                            <Placeholder hight="1.5em" width="4em" border-radius="2px" margin="0em 0 0 0" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="wish-item">
                <div class="item-img">
                    <Placeholder hight="150px" width="150px" border-radius="10px" margin="0.2em 0 0 0" />
                </div>
                <div class="details">
                    <div class="desc">
                    <Placeholder hight="1.1em" width="20em" border-radius="2px" margin="2em 0 0 0" />
                    <Placeholder hight="1.em" width="5em" border-radius="2px" margin="1em 0 0 0" />
        
                    </div>
                    <div class="action">
                            <Placeholder hight="1.5em" width="4em" border-radius="2px" margin="0em 0 0 0" />
                        <div class="remove">
                            <Placeholder hight="1.5em" width="4em" border-radius="2px" margin="0em 0 0 0" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.wishlist {

    .wish-item {
        display: flex;
        margin: 0 1.5em;

        .item-img {
            margin: 1.4em 0;
        }

        .details {
            padding: 0 1.5em;

            .desc {
                margin: 1.4em 0;
            }
        }

        .action {
            display: flex;

            .remove {
                border-left: 1px solid $gray-5;
                margin: 0 1em;
                padding: 0 1em;

            }
        }

        border-bottom: $gray-2 1px solid;
    }

}
</style>