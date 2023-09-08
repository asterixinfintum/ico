<template>
    <div>
      <Content>
        <Table>
          <div class="table__header" :style="{ gridTemplateColumns: gridTemplateColumns }">
            <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">{{ subject }}</div>
            <div class="table__header--area">{{ tableLabels[1] }}</div>
            <div class="table__header--area">{{ tableLabels[2] }}</div>
            <div class="table__header--area">{{ tableLabels[3] }}</div>
            <div class="table__header--area">{{ tableLabels[4] }}</div>
            <div class="table__header--area">{{ tableLabels[5] }}</div>
            <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ tableLabels[6] }}</div>
            <div class="table__header--area">{{ tableLabels[8] }}</div>
            <div class="table__header--area">{{ tableLabels[7] }}</div>
          </div>

          <div class="table__header table__item"
                :style="{ gridTemplateColumns: gridTemplateColumns }"
                v-for="tableItem in paginatedResults" 
                @click="goToItem(removeSlashUnderscore(
                  tableItem.data.symbol), 
                  'tickers', 
                  separateSymbolValues(tableItem.data.displayName), 
                  tableItem)">
            <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">
                <span class="img">
                  <img src="https://dd.dexscreener.com/ds-data/chains/ethereum.png"/>
                </span>
                <span class="img">
                  <img src="https://dd.dexscreener.com/ds-data/chains/arbitrum.png"/>
                </span>
                <span class="img">
                  <img src="https://dd.dexscreener.com/ds-data/chains/bsc.png"/>
                </span>
                <span class="light-white number">{{ tableItem.data.symbol }}</span>
            </div>
            <div class="table__header--area num">{{ tableItem.data.ask }}</div>
            <div class="table__header--area decimal">{{ tableItem.data.askQuantity }}</div>
            <div class="table__header--area num">{{ tableItem.data.bid }}</div>
            <div class="table__header--area decimal">{{ tableItem.data.bidQuantity }}</div>
            <div class="table__header--area num">{{ tableItem.data.close }}</div>
            <div class="table__header--area date" :style="{ 'grid-column': 'span 2' }">{{ getFormattedDateTime(tableItem.data.closeTime) }}</div>
            <div class="table__header--area">{{ tableItem.data.tradeCount }}</div>
            <div class="table__header--area decimal">{{ tableItem.data.dailyChange }}</div>
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
          'symbol',
          'ask',
          'ask quantity',
          'bid',
          'bid quantity',
          'close',
          'close time',
          'daily change',
          'trade count'
        ]
      }
    },
    mounted() {
        this.fetchItemsByDataGroup('ticker24h');
    },
    created() {
      EventBus.$on('arrItem-updated', (update) => {
        this.arrItem = update;
      });
    }
  }
  </script>
  