<template>
    <div class="box">
        <label>{{ label }}</label>
        <span class="svg" v-if="type === 'svg'">{{  }}</span>
        <span class="match">{{ match }}</span>
    </div>
</template>

<script>
    export default {
        props: ['label', 'match', 'type']
    };
</script>

<style lang="scss" scoped>
.box {
    border: $border;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    padding: #{scaleValue(5)} #{scaleValue(10)};
    align-items: center;

    @media only screen and (max-width: 414px) {
        padding: #{scaleValue(60)} #{scaleValue(30)};
    }

    & label {
        color: rgba($white, .6);
        text-transform: uppercase;
        font-size: #{scaleValue(10)};
        display: inline-block;
        margin-bottom: #{scaleValue(8)};
        text-align: center;

        @media only screen and (max-width: 414px) {
            font-size: #{scaleValue(40)};
            margin-bottom: #{scaleValue(40)};
        }
    }

    & span {

        &.svg {

        }
        &.match {
            color: $white;
            text-transform: capitalize;
            font-size: #{scaleValue(14)};
            font-weight: 500;
            text-align: center;

            @media only screen and (max-width: 414px) {
                font-size: #{scaleValue(50)};
            }
        }
    }
}
</style>