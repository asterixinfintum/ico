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
                <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ tableLabels[5] }}</div>
                <div class="table__header--area">{{ tableLabels[6] }}</div>
                <div class="table__header--area">{{ tableLabels[7] }}</div>
            </div>

            <div class="table__header table__item"
                :style="{ gridTemplateColumns: gridTemplateColumns }"
                v-for="tableItem in paginatedResults" 
                @click="goToItem(
                  removeSlashUnderscore(tableItem.data.displayName), 
                  'markets', 
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
                    <span class="light-white number">{{ tableItem.data.displayName }}</span>
                </div>
                <div class="table__header--area">{{ tableItem.data.quoteCurrencyName }}</div>
                <div class="table__header--area">{{ tableItem.data.baseCurrencyName }}</div>
                <div class="table__header--area">{{ tableItem.data.crossMargin ? tableItem.data.crossMargin.maxLeverage : "" }}</div>
                <div class="table__header--area date">{{ getFormattedDateTime(tableItem.data.tradableStartTime) }}</div>
                <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ getFormattedDateTime(tableItem.data.visibleStartTime)}}</div>
                <div class="table__header--area">{{ tableItem.data.symbolTradeLimit ? tableItem.data.symbolTradeLimit.minAmount : '' }}</div>
                <div class="table__header--area">{{ tableItem.data.symbolTradeLimit ? tableItem.data.symbolTradeLimit.minQuantity : '' }}</div>
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
          'display name',
          'quote currency',
          'base currency',
          'max leverage',
          'tradable start time',
          'visible Start Time',
          'min amount',
          'min quantity'
        ]
      }
    },
    created() {
      EventBus.$on('arrItem-updated', (update) => {
        this.arrItem = update;
      });
    },
    mounted() {
        this.fetchItemsByDataGroup('markets');
    },
    methods: {
      scrambleArray(subjectArray) {
        console.log(subjectArray, 'check subject array')
        // Create a copy of the subject array to avoid modifying the original array
        const scrambledArray = [...subjectArray];
  
        // Perform Fisher-Yates shuffle on the scrambled array
        for (let i = scrambledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [scrambledArray[i], scrambledArray[j]] = [scrambledArray[j], scrambledArray[i]];
        }
  
        return scrambledArray;
      },
      returnBlockChainImg(item) {
       
      },
      returnitemWithChain(coinitem, blockchainAvailable) {
        const item_name = coinitem.data.baseCurrencyName;
        let result;
        blockchainAvailable.forEach(bcaitem => {
          if (bcaitem.data.coin === item_name) {
            coinitem.data.blockchain = bcaitem.data.networkList[0];
            result = coinitem;
          }
        });

        return result;
      },
      returnIfBlockChainFound(array) {
        const coins = this.blockchainAvailable.map(item => item.data.coin);
        const baseCurrencies = array.filter(item => coins.includes(item.data.baseCurrencyName));
        const currencies = [];

        baseCurrencies.forEach(currency => {
          currencies.push(this.returnitemWithChain(currency, this.blockchainAvailable));
        });

        return currencies;
      }
    },
    computed: {
      blockchainAvailable() {
        const blockchainNames = this.blockchains.map(obj => obj.blockchainname);
        const filtered = this.crypto_currencies.filter(item => {
          return blockchainNames.includes(item.data.networkList[0].blockchain) || blockchainNames.includes(item.data.networkList[0].name);
        });

        return filtered;
      }
    },
    watch: {
      paginatedResults: function(newValue, oldValue) {
        console.log(newValue, oldValue, 'test')
      },
      poloniexData: function(newValue, oldValue) {
        const data = this.scrambleArray(this.returnIfBlockChainFound(newValue));
        this.arrItem = data;
        this.searchCache = data;
      }
    }
  }
  </script>
  