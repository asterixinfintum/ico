<template>
    <div class="table__paginator">
        <div 
            v-for="num in numberOfPages"
            @click="navigatePagination(num)">

            <div class="table__paginator--number" v-if="num === current-1">
                <span>
                    <svg>
                        <use xlink:href="@/assets/imgs/sprites.svg#icon-chevrons-left"></use>
                    </svg>
                </span>
                <span>Previous Results {{ num }}</span>
            </div>
            <div class="table__paginator--number" v-if="num === current+1">
                <span>Next Results {{ num }}</span>
                <span>
                    <svg>
                        <use xlink:href="@/assets/imgs/sprites.svg#icon-chevrons-right"></use>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import table from '@/mixins/table.js';

export default {
    mixins: [table]
}
</script>