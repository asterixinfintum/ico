<template>
    <div class="header">
        <div class="header__bars">
            <div class="header__bar">
                <h1>
                    <span class="light-white">{{ '24H VOLUME:'}}</span> 
                    <span class="bold-1">{{  '$3.32B'  }}</span>
                </h1>
            </div>
            <div class="header__bar">
                <h1>
                    <span class="light-white">{{ '24H TXNS:' }}</span>
                    <span class="bold-1">{{  '3,140,194'  }}</span>
                </h1>
            </div>
        </div>

        <div class="header__burger" @click="toggle_sidenav">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['toggle_sidenav'],
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    right: 0;
    width: #{scaleValue(1350)};
    height: #{scaleValue(80)};
    padding: #{scaleValue(20)} #{scaleValue(30)};
    border-bottom: $border;
    background: $background;
    z-index: 2;

    @media only screen and (max-width: 414px) {
        left: 0;
        height: #{scaleValue(420)};
        width: 100vw;

        border: none;
        display: flex;
        justify-content: space-between;
    }

    &__bars {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media only screen and (max-width: 414px) {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &__bar {
        border: $border;
        border-radius: $border-radius;
        width: #{scaleValue(640)};
        height: #{scaleValue(45)};
        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 414px) {
            margin-right: #{scaleValue(45)};
            padding: #{scaleValue(70)} #{scaleValue(18)};
            width: #{scaleValue(940)};
            height: #{scaleValue(100)};
            margin-bottom: #{scaleValue(40)};
        }

        & h1 {
            font-weight: 400;
            font-size: #{scaleValue(14)};

            @media only screen and (max-width: 414px) {
                font-size: #{scaleValue(45)};
            }
        }
    }

    &__burger {
        display: none;

        @media only screen and (max-width: 414px) {
            display: flex;
            flex-direction: column;
        }

        & span {
            display: inline-block;
            margin-bottom: #{scaleValue(30)};
            border-radius: 3rem;
            height: #{scaleValue(14)};
            width: #{scaleValue(150)};

            background: $white;

        }
    }
}
</style>