<template>
    <div class="projects">
        <Content>
            <div class="projects__content">
                <div v-for="project in paginatedResults">
                    <ProjectCard :project="project"/>
                </div>
            </div>

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
        </Content>
    </div>
</template>

<script>
import utils from '@/mixins/utils.js';
import table from '@/mixins/table.js';

import { EventBus } from '@/events/event-bus.js';

export default {
    mixins: [utils, table],
    created() {
      EventBus.$on('arrItem-updated', (update) => {
        this.arrItem = update;
      });
    },
    mounted() {
        this.fetchUniswapProjects();
    }
}
</script>

<style lang="scss" scoped>
.projects {
    
    &__content {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: #{scaleValue(15)};
        padding: #{scaleValue(20)};

        @media only screen and (max-width: 414px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0
        }
    }
}
</style>