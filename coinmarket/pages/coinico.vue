<template>
    <div>
      <Content>
        <Table>
          <div class="table__header" :style="{ gridTemplateColumns: gridTemplateColumns }">
              <div class="table__header--subject">{{ subject }}</div>
              <div class="table__header--area" v-for="headerLabel in headerLabels" >{{ headerLabel }}</div>
          </div>

          <div class="table__header table__item"
            :style="{ gridTemplateColumns: gridTemplateColumns }"
            v-for="tableItem in paginatedResults" 
            @click="goToIcoItem(tableItem, 'icoitem')">
            <div class="table__header--subject">
              <span class="img">
                <img src="https://dd.dexscreener.com/ds-data/chains/ethereum.png"/>
              </span>
              <span class="img">
                <img src="https://dd.dexscreener.com/ds-data/chains/arbitrum.png"/>
              </span>
              <span class="img">
                <img src="https://dd.dexscreener.com/ds-data/chains/bsc.png"/>
              </span>
              <span class="light-white number">{{ removeAfterBracket(tableItem.Name) }}</span>
              <span></span>
            </div>
            <div class="table__header--area">{{ tableItem.Raised }}</div>
            <div class="table__header--area">{{ tableItem.PeriodValue }}</div>
            <div class="table__header--area">{{ tableItem.DateFrom }}</div>
            <div class="table__header--area">{{ tableItem.DateTo }}</div>
            <div class="table__header--area">{{ generateRandomFinVal() }}</div>
            <div class="table__header--area">{{ generateRandomFinVal() }}</div>
            <div class="table__header--area">{{ tableItem.marketCap ?  tableItem.marketCap : generateRandomFinVal() }}</div>
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
          'Coin',
          'Value Raised',
          'Period Value',
          'Start Date',
          'End Date',
          'Buy Volume',
          'Sell Volume',
          'Valuated Cap'
        ]
      }
    },
    created() {
      EventBus.$on('arrItem-updated', (update) => {
        this.arrItem = update;
      });
    },
    mounted() {
      this.fetchExtractedData();

      this.arrItem = this.icocoins;
      this.searchCache = this.icocoins;
    },
    methods: {
      goToIcoItem(item, category) {

        if (item["Name"] === 'BvxToken Launch') {
          this.$router.push({
            path: "/bvxt",
              query: {
                category,
                about: item["About"],
                additional_info: item["Additional_details"],
                project_name: item["Name"],
                item: JSON.stringify(item)
              }
          });
          return 
        }
        
        this.$router.push({
          path: "/item",
            query: {
              category,
              about: item["About"],
              additional_info: item["Additional_details"],
              project_name: item["Name"],
              item: JSON.stringify(item)
            }
        });
      }
    }
  }
  </script>
  