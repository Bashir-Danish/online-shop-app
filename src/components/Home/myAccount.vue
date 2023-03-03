<script lang="ts" setup>
import { onMounted } from "vue";
import { Camera24Filled } from '@vicons/fluent/'
import { Archive20Regular } from '@vicons/fluent/'
import { Heart20Regular } from '@vicons/fluent/'
import { Person16Regular } from '@vicons/fluent/'
import { Key16Regular } from '@vicons/fluent/'
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router'



const router = useRouter()

const authStore = useAuthStore();

onMounted(() => {
    // if (authStore.isLoggedIn == false) {
    //     router.push({ path: '/', name: 'home' })
    // }
})
</script>
<template >
    <div class="background-color">
        <div class="my-account">
            <div class="cover-Profile">
                <div class="cover-img">
                    <!-- <img src="@/assets/photos/coverImg.webp" alt=""> -->
                    <div class="img"
                        :style="{ backgroundImage: 'url(http://localhost:4000' + authStore.user?.coverImg + ')' }">
                        <span class="camera-holder">
                            <Icon size="20">
                                <Camera24Filled />
                            </Icon>
                            <span>Edit</span>
                            <input type="file" id="cover-img" hidden>
                            <label for="cover-img"></label>
                        </span>
                        <input type="file" id="cover-img" hidden>
                        <label for="cover-img"></label>
                    </div>
                </div>
                <div class="profile">
                    <div class="img"
                        :style="{ backgroundImage: 'url(http://localhost:4000' + authStore.user?.profile + ')' }">
                    </div>
                    <div class="edit-icon">
                        <Icon size="20">
                            <Camera24Filled />
                        </Icon>
                        <input type="file" id="profile-img" hidden>
                        <label for="profile-img"></label>
                    </div>
                    <input type="file" id="profile-img" hidden>
                    <label for="profile-img"></label>
                </div>
            </div>
            <div class="username">
                <span>{{ authStore.user?.username }}</span>
                <span>{{ authStore.user?.lastName }}</span>
            </div>
            <div class="items-wrapper">
                <div class="orders item">
                    <div class="left-side">
                        <Icon size="18" color="#0086ff">
                            <Archive20Regular />
                        </Icon>
                    </div>
                    <div class="right-side">
                        <div class="text-arrow">Orders</div>
                        <div class="item-subtext">Tack your orders, Return Product or Buy them again</div>
                    </div>
                </div>
                <div class="wishlist item" @click.native="router.push({ path: '/wishlist', name: 'wishlist' })">
                    <div class="left-side">
                        <Icon size="18" color="#0086ff">
                            <Heart20Regular />
                        </Icon>
                    </div>
                    <div class="right-side">
                        <div class="text-arrow">Wishlist</div>
                        <div class="item-subtext">Here is the List of all Your Desired Products</div>
                    </div>
                </div>
                <div class="profile item">
                    <div class="left-side">
                        <Icon size="18" color="#0086ff">
                            <Person16Regular />
                        </Icon>
                    </div>
                    <div class="right-side">
                        <div class="text-arrow">Profile</div>
                        <div class="item-subtext">Add Profile Image, Edit Your Name and Email</div>
                    </div>

                </div>
                <div class="address item">
                    <div class="left-side">
                        <Icon size="18" color="#0086ff">
                            <Location20Regular />
                        </Icon>
                    </div>
                    <div class="right-side">
                        <div class="text-arrow">Addresses</div>
                        <div class="item-subtext">Add or Edit Your Addresses</div>
                    </div>
                </div>
                <div class="change-pass item">
                    <div class="left-side">
                        <Icon size="18" color="#0086ff">
                            <Key16Regular />
                        </Icon>
                    </div>
                    <div class="right-side">
                        <div class="text-arrow">Change Password</div>
                        <div class="item-subtext">You can Change Your Password</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.background-color {
    padding: 1em;
    background: $backGround;
}

.my-account {
    height: 78vh;
    background: $white;
    box-shadow: $dOp-2 0px 0px 8px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    .cover-Profile {
        height: 45vh;
        position: relative;

        .cover-img {
            height: 70%;
            width: 100%;
            position: relative;

            .img {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                position: relative;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;

                label {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 100%;
                    cursor: pointer;
                }

                .camera-holder {
                    position: absolute;
                    width: 4em;
                    bottom: .5em;
                    right: 1em;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: $gray-15;
                    background: $gray-2;
                    padding: .3em;
                    border-radius: 5px;
                    z-index: 10;

                    span {
                        padding-right: .1em;
                    }

                    &:hover {
                        color: $white;
                        background: $lightBlue ;
                    }
                }
            }

        }

        .profile {
            height: 140px;
            width: 140px;
            background-color: $gray-3;
            padding-top: 1em;
            position: absolute;
            bottom: 1em;
            left: 0;
            right: 0;
            margin: 0 auto;
            border-radius: 50%;
            outline: 2px solid $white;

            label {
                position: absolute;
                top: 0;
                height: 100%;
                width: 100%;
                border-radius: 50%;
                cursor: pointer;
            }

            .img {
                object-fit: none;
                object-position: center;
                height: 100%;
                width: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                border-radius: 50%;
            }

            .edit-icon {
                width: 2em;
                height: 2em;
                background: $gray-3;
                color: $gray-15;
                position: absolute;
                bottom: .5em;
                right: .3em;
                padding: .5em;
                border-radius: 50%;
                outline: 1px solid $white;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;

                &:hover {
                    color: $white;
                    background: $lightBlue ;
                }
            }
        }
    }

    .username {
        text-align: center;
        color: $gray-18;
        font-size: 1.3em;
        padding: .5em 0;

        span:first-child {
            margin-right: .3em;
        }

    }

    .items-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 1em;
        gap: 1em;

        .item {
            width: 200px;
            height: 110px;
            font-size: 12px;
            color: $gray-15;
            border-radius: 12px;
            border: 1px solid $gray-2;
            // transition: all .4s ease;
            display: flex;
            padding: 1.5em 1em;
            cursor: pointer;

            &:hover {
                box-shadow: $dOp-2 0px 2px 8px;

                .right-side .text-arrow {
                    color: $lightBlue;
                }
            }

            .left-side {

                margin-right: 1em;
            }

            .right-side {
                word-spacing: 3px;
                line-height: 1.4;

                .text-arrow {
                    margin-bottom: .2em;
                    font-size: 13px;
                    color: $gray-18;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>