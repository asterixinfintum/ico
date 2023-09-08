<template>
    <div>
        <div class="sidenav" :class="{ sidenav_open }">
        <div class="sidenav__logo" @click="redirectToHome">
            <figure class="sidenav__logo--img spinner">
                <img src="@/assets/imgs/kcc.svg"/>
            </figure>
            <div class="sidenav__logo--textarea">
                <p class="sidenav__logo--text">MarketScreener</p>
            </div>
        </div>

        <div class="sidenav__close" @click="toggle_sidenav">
            <span>
                <svg>
                    <use xlink:href="@/assets/imgs/sprites.svg#icon-x"></use>
                </svg>
            </span>
            <span>
                <p>close</p>
            </span>
        </div>

        <div class="sidenav__search">
            <span>
                <svg>
                    <use xlink:href="@/assets/imgs/sprites.svg#icon-search"></use>
                </svg>
            </span>
            <span>
                <input class="sidenav__input--input" placeholder="Search" v-model="searchTermName"/>
            </span>
        </div>

        <div class="sidenav__menu">
            <div class="sidenav__menuarea">
                <div class="sidenav__menuitem" @click="gohere('/markets')">
                    <span></span>
                    <span>Markets</span>
                </div>
                <div class="sidenav__menuitem" @click="gohere('/tickers')">
                    <span></span>
                    <span>Tickers</span>
                </div>
                <div class="sidenav__menuitem" @click="gohere('/coinico')">
                    <span></span>
                    <span>Coin ICOs</span>
                </div>
                <div class="sidenav__menuitem" @click="gohere('/tokens')">
                    <span></span>
                    <span>Explore Tokens</span>
                </div>
                <div class="sidenav__menuitem" @click="gohere('/')">
                    <span></span>
                    <span>Explore Projects</span>
                </div>
            </div>

            <div class="sidenav__menuarea blockchains">
                <div class="sidenav__menuitem" v-for="{ imglink, blockchainname } in blockchains" @click="getBlockChain(blockchainname)">
                    <span>
                        <img :src="imglink" class="img-cover"/>
                    </span>
                    <span>{{ blockchainname }}</span>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import utils from '@/mixins/utils.js';
    import url from '@/mixins/url.js';
    import table from '@/mixins/table.js';

    export default {
        props: ['sidenav_open', 'toggle_sidenav'],
        mixins: [utils, url, table],
        mounted() {
            this.fetchCryptocurrencies();
        },
        methods: {
            search() {

            },
            getBlockChain(blockchainname) {
                this.$router.push({
                    path: "/blockchainview",
                    query: {
                        blockchainname
                    }
                });
            },
            gohere(path) {
                const mediaQuery = window.matchMedia("(max-width: 414px)");

                if (mediaQuery.matches) {
                    this.toggle_sidenav();
                }

                this.$router.push(path)
            }
        }
    }
</script>

<style lang="scss" scoped>
.sidenav {
    position: fixed;
    height: 100vh;
    width: #{scaleValue(250)};
    border-right: $border;
    z-index: 3;
    background: $background;
    padding: #{scaleValue(50)} #{scaleValue(10)};
    display: none;

    top: 0;
    left: 0;
    
    &.sidenav_open {
        display: block;
    }

    @media only screen and (max-width: 414px) {
        width: 100vw;
        padding: #{scaleValue(50)} #{scaleValue(30)};
    }

    &__logo {
        display: flex;
        align-items: center;
        cursor: pointer;

        &--img {
            height: #{scaleValue(30)};
            width: #{scaleValue(30)};
            overflow: hidden;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: #{scaleValue(10)};

            @media only screen and (max-width: 414px) {
                height: #{scaleValue(100)};
                width: #{scaleValue(100)};
                margin-right: #{scaleValue(30)};
            }

            & img {
                height: 140%;
                width: 140%;
            }
        }

        &--textarea {
            font-size: #{scaleValue(17)};
            text-transform: uppercase;

            @media only screen and (max-width: 414px) {
                font-size: #{scaleValue(60)};
            }
        }
    }

    &__search {
        display: flex;
        align-items: center;
        background: $light-grey;
        height: #{scaleValue(45)};
        padding: 0 #{scaleValue(7)};
        border-radius: $border-radius;
        margin-top: #{scaleValue(17)};

        @media only screen and (max-width: 414px) {
            height: #{scaleValue(180)};
        }

        & span {
            display: flex;
            align-items: center;
            height: 100%;

            & svg {
                @include svg($light-white, #{scaleValue(17)});

                @media only screen and (max-width: 414px) {
                    @include svg($light-white, #{scaleValue(60)});
                }
            }

            & input {
                border: none;
                background: transparent;
                height: 100%;
                margin-left: #{scaleValue(7)};
                width: #{scaleValue(200)};
                outline: none;
                font-size: #{scaleValue(18)};
                color: $white;

                @media only screen and (max-width: 414px) {
                    font-size: #{scaleValue(60)};
                    margin-left: #{scaleValue(20)};
                    width: #{scaleValue(1400)};
                }
                
                &::placeholder {
                    color: $light-white;
                    font-size: #{scaleValue(17)};
                    font-weight: 500;

                    @media only screen and (max-width: 414px) {
                        font-size: #{scaleValue(60)};
                    }
                }
            }
        }
    }

    &__menuitem {
        font-weight: 400;
        margin-bottom: #{scaleValue(20)};
        cursor: pointer;
        font-size: #{scaleValue(14)};

        display: flex;
        align-items: center;

        @media only screen and (max-width: 414px) {
            border: $border;
            height:  #{scaleValue(400)};
            font-size: #{scaleValue(60)};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center
        }

        & span {
            display: inline-block;

            &:nth-child(1) {
                height: #{scaleValue(20)};
                width: #{scaleValue(20)};
                margin-right: #{scaleValue(9)};

                @media only screen and (max-width: 414px) {
                    height: #{scaleValue(100)};
                    width: #{scaleValue(100)};
                    margin-right: 0;
                    margin-bottom: #{scaleValue(50)};
                }
            }
        }
    }

    &__menuarea {
        margin-top: #{scaleValue(20)};
        padding-bottom: #{scaleValue(18)};
        border-bottom: $border;

        &.blockchains {
            height: #{scaleValue(500)};
            overflow-y: scroll;
            padding-bottom: #{scaleValue(20)};

            @media only screen and (max-width: 414px) {
                display: grid;
                grid-template-columns: repeat(3,1fr);
                grid-gap: #{scaleValue(15)};

                height: #{scaleValue(1000)};
            }
        }
    }

    &__close {
        display: none;

        @media only screen and (max-width: 414px) {
            display: flex;
            align-items: center;
            justify-content: center;
            text-transform: uppercase;
            position: absolute;
            top: 0;
            right: #{scaleValue(30)};
            background: $grey;
            height: #{scaleValue(170)};
            width: #{scaleValue(470)};

            & span {
                display: flex;
                align-items: center;
                margin-left: #{scaleValue(30)};

                & svg {
                    fill: $white;
                    height: #{scaleValue(60)};
                    width: #{scaleValue(60)};
                }

                & p {
                    font-size: #{scaleValue(60)};
                }
            }
        }
    }
}
</style>