<template>
    <div>
        <Content>
            <Table>
                <div class="table__header" :style="{ gridTemplateColumns: gridTemplateColumns }">
                    <div class="table__header--subject" :style="{ 'grid-column': '1 / span 3' }">{{ subject }}</div>
                    <div class="table__header--area">{{ tableLabels[1] }}</div>
                    <div class="table__header--area">{{ tableLabels[2] }}</div>
                    <div class="table__header--area">{{ tableLabels[3] }}</div>
                    <div class="table__header--area">{{ tableLabels[4] }}</div>
                    <div class="table__header--area">{{ tableLabels[5] }}</div>
                    <div class="table__header--area">{{ tableLabels[6] }}</div>
                </div>

                <div class="table__header table__item"
                    :style="{ gridTemplateColumns: gridTemplateColumns }"
                    v-for="tableItem in paginatedResults" 
                    @click="openTokenPage(tableItem.data.id)">
                    <div class="table__header--subject" :style="{ 'grid-column': '1 / span 3' }">
                        <span class="img">
                            <img src="https://dd.dexscreener.com/ds-data/chains/ethereum.png"/>
                        </span>
                        <span class="img">
                            <img src="https://dd.dexscreener.com/ds-data/chains/arbitrum.png"/>
                        </span>
                        <span class="img">
                            <img src="https://dd.dexscreener.com/ds-data/chains/bsc.png"/>
                        </span>
                        <span class="light-white number">{{ tableItem.data.name }}</span>
                    </div>
                    <div class="table__header--area">{{ tableItem.data.symbol }}</div>
                    <div class="table__header--area">${{ tableItem.data.totalValueLocked ? formatCurrencyValue(tableItem.data.totalValueLocked) : '' }}</div>
                    <div class="table__header--area">{{ tableItem.data.volume ? formatCurrencyValue(tableItem.data.volume) : '' }}</div>
                    <div class="table__header--area">${{ tableItem.data.volumeUSD ? formatCurrencyValue(tableItem.data.volumeUSD) : ""}}</div>
                    <div class="table__header--area">{{ tableItem.data.totalSupply }}</div>
                    <div class="table__header--area">{{ tableItem.data.txCount }}</div>
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
            </Table>
        </Content>
    </div>
</template>

<script>
  import utils from '@/mixins/utils.js';
  import table from '@/mixins/table.js';

  import { EventBus } from '@/events/event-bus.js';

export default {
    mixins: [utils, table],
    data() {
        return {
            tableLabels: [
                'Name',
                'Symbol',
                'total Value Locked',
                'Volume',
                'Volume usd',
                'Total Supply',
                'TX Count'
            ]
        }
    },
    created() {
      EventBus.$on('arrItem-updated', (update) => {
        this.arrItem = update;
      });
    },
    mounted() {
        this.fetchUniswapTokens();

        this.arrItem = this.uniswap_tokens;
        this.searchCache = this.uniswap_tokens;
    },
    methods: {
        openTokenPage(address) {
            const url = `https://etherscan.io/address/${address}`;

            window.open(url, '_blank')
        }
    }
}
</script>