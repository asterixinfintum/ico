<template>
    <div class="table">
        <div class="table__content" v-if="tableItems">
            <div class="table__header" v-if="$route.path === '/coinico'" :style="{ gridTemplateColumns: gridTemplateColumns }">
                <div class="table__header--subject">{{ subject }}</div>
                <div class="table__header--area" v-for="headerLabel in headerLabels" >{{ headerLabel }}</div>
            </div>

            <div class="table__header" v-if="$route.path === '/cryptocurrencies'" :style="{ gridTemplateColumns: gridTemplateColumns }">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 3' }">{{ subject }}</div>
                <div class="table__header--area">{{ tableLabels[1] }}</div>
                <div class="table__header--area">{{ tableLabels[2] }}</div>
                <div class="table__header--area">{{ tableLabels[3] }}</div>
                <div class="table__header--area">{{ tableLabels[4] }}</div>
                <div class="table__header--area">{{ tableLabels[5] }}</div>
                <div class="table__header--area">{{ tableLabels[6] }}</div>
            </div>

            <div class="table__header" v-if="$route.path === '/markets'" :style="{ gridTemplateColumns: gridTemplateColumns }">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">{{ subject }}</div>
                <div class="table__header--area">{{ tableLabels[1] }}</div>
                <div class="table__header--area">{{ tableLabels[2] }}</div>
                <div class="table__header--area">{{ tableLabels[3] }}</div>
                <div class="table__header--area">{{ tableLabels[4] }}</div>
                <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ tableLabels[5] }}</div>
                <div class="table__header--area">{{ tableLabels[6] }}</div>
                <div class="table__header--area">{{ tableLabels[7] }}</div>
            </div>

            <div class="table__header" v-if="$route.path === '/tickers'" :style="{ gridTemplateColumns: gridTemplateColumns }">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">{{ subject }}</div>
                <div class="table__header--area">{{ tableLabels[1] }}</div>
                <div class="table__header--area">{{ tableLabels[2] }}</div>
                <div class="table__header--area">{{ tableLabels[3] }}</div>
                <div class="table__header--area">{{ tableLabels[4] }}</div>
                <div class="table__header--area">{{ tableLabels[5] }}</div>
                <div class="table__header--area">{{ tableLabels[6] }}</div>
                <div class="table__header--area">{{ tableLabels[8] }}</div>
                <div class="table__header--area" :style="{ 'grid-column': '10 / span 2' }">{{ tableLabels[7] }}</div>
            </div>

            <div class="table__header table__item"
                v-if="$route.path === '/coinico'"
                :style="{ gridTemplateColumns: gridTemplateColumns }"
                v-for="tableItem in paginatedResults" 
                @click="goToItem">
                <div class="table__header--subject">
                    <span class="light-white number"></span>
                    <span>{{ removeAfterBracket(tableItem.Name) }}</span>
                </div>
                <div class="table__header--area">{{ tableItem.Raised }}</div>
                <div class="table__header--area">{{ tableItem.PeriodValue }}</div>
                <div class="table__header--area">{{ tableItem.DateFrom }}</div>
                <div class="table__header--area">{{ tableItem.DateTo }}</div>
                <div class="table__header--area">{{ generateRandomFinVal() }}</div>
                <div class="table__header--area">{{ generateRandomFinVal() }}</div>
                <div class="table__header--area">{{ generateRandomFinVal() }}</div>
            </div>


            <div class="table__header table__item"
                v-if="$route.path === '/cryptocurrencies'"
                :style="{ gridTemplateColumns: gridTemplateColumns }"
                v-for="tableItem in paginatedResults" 
                @click="goToItem">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 3' }">
                    <span class="light-white number"></span>
                    <span>{{ tableItem.data.name }}</span>
                </div>
                <div class="table__header--area">{{ tableItem.data.coin }}</div>
                <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].blockchain : '' }}</div>
                <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].decimals : '' }}</div>
                <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].minConfirm : '' }}</div>
                <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].withdrawFee : ''}}</div>
                <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].name : '' }}</div>
            </div>

            <div class="table__header table__item"
                v-if="$route.path === '/markets'"
                :style="{ gridTemplateColumns: gridTemplateColumns }"
                v-for="tableItem in paginatedResults" 
                @click="goToItem(removeSlashUnderscore(tableItem.data.displayName), 'markets', separateSymbolValues(tableItem.data.displayName))">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">
                    <span class="light-white number"></span>
                    <span>{{ tableItem.data.displayName }}</span>
                </div>
                <div class="table__header--area">{{ tableItem.data.quoteCurrencyName }}</div>
                <div class="table__header--area">{{ tableItem.data.baseCurrencyName }}</div>
                <div class="table__header--area">{{ tableItem.data.crossMargin ? tableItem.data.crossMargin.maxLeverage : "" }}</div>
                <div class="table__header--area">{{ tableItem.data.tradableStartTime }}</div>
                <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ tableItem.data.crossMargin ? tableItem.data.crossMargin.supportCrossMargin : ''}}</div>
                <div class="table__header--area">{{ tableItem.data.symbolTradeLimit ? tableItem.data.symbolTradeLimit.minAmount : '' }}</div>
                <div class="table__header--area">{{ tableItem.data.symbolTradeLimit ? tableItem.data.symbolTradeLimit.minQuantity : '' }}</div>
            </div>

            <div class="table__header table__item"
                v-if="$route.path === '/tickers'"
                :style="{ gridTemplateColumns: gridTemplateColumns }"
                v-for="tableItem in paginatedResults" 
                @click="goToItem(removeSlashUnderscore(tableItem.data.symbol))">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">
                    <span class="light-white number"></span>
                    <span>{{ tableItem.data.symbol }}</span>
                </div>
                <div class="table__header--area">{{ tableItem.data.ask }}</div>
                <div class="table__header--area">{{ tableItem.data.askQuantity }}</div>
                <div class="table__header--area">{{ tableItem.data.bid }}</div>
                <div class="table__header--area">{{ tableItem.data.bidQuantity }}</div>
                <div class="table__header--area">{{ tableItem.data.close }}</div>
                <div class="table__header--area">{{ tableItem.data.closeTime }}</div>
                <div class="table__header--area">{{ tableItem.data.tradeCount }}</div>
                <div class="table__header--area" :style="{ 'grid-column': '10 / span 2' }">{{ tableItem.data.dailyChange }}</div>
            </div>


            <div class="table__header" v-if="$route.path === '/item' && $route.query.category === 'markets'" :style="{ gridTemplateColumns: gridTemplateColumns }">
                <div class="table__header--subject" :style="{ 'grid-column': '1 / span 2' }">Date</div>
                <div class="table__header--area">Type</div>
                <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">Usd</div>
                <div class="table__header--area">{{ $route.query.symbolObj.left_symbol }}</div>
                <div class="table__header--area">{{ $route.query.symbolObj.right_symbol }}</div>
                <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">price</div>
                <div class="table__header--area">maker</div>
                <div class="table__header--area">txn</div>
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


            
            <div class="item__topright">
              <div class="item__toprightbox">
                <div class="item__toprightboxsubject">
                  <div class="item__toprightboxsubject--name">Eth/USDT</div>
                  <div class="item__toprightboxsubject--sub">
                    <div class="item__toprightboxsubject--subleft item__toprightboxsubject--area">
                      <figure>
                        <img src="@/assets/imgs/binancelogo.png"/>
                      </figure>
                      <div class="item__toprightboxsubject--subinterestingdata">Data</div>
                    </div>
                    <span class="item__toprightboxsubject--svg">
                      <svg>
                        <use xlink:href="@/assets/imgs/sprites.svg#icon-chevrons-right"></use>
                      </svg>
                    </span>
                    <div class="item__toprightboxsubject--subright item__toprightboxsubject--area">
                      <figure>
                        <img src="@/assets/imgs/uniswap_unicorn.png"/>
                      </figure>
                      <div class="item__toprightboxsubject--subinterestingdata">Data</div>
                    </div>
                  </div>
                </div>

                <div class="item__toprightcontent">
                  <div class="item__toprightgrid first top-spacing">
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                  </div>
                  <div class="item__toprightgrid second top-spacing">
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                  </div>
                  <div class="item__toprightgrid third top-spacing">
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                    <Box :label="'liquidity'" :match="'$7.7k'"/>
                  </div>

                  <div class="item__toprighttable top-spacing">
                    <div class="item__toprighttable--body">
                      <div class="item__toprighttable--tabarea">
                        <div class="item__toprighttable--tab light-white">5M</div>
                        <div class="item__toprighttable--tab light-white">1H</div>
                        <div class="item__toprighttable--tab light-white">6H</div>
                        <div class="item__toprighttable--tab light-white">2H</div>
                      </div>

                      <div class="item__toprighttable--tabcontent">
                        <div class="item__toprighttable--tabcontentleft">
                          <div class="item__toprighttable--labelarea">
                            <span class="label light-white">txns</span>
                            <span class="match">12</span>
                          </div>
                          <div class="item__toprighttable--labelarea">
                            <span class="label light-white">volume</span>
                            <span class="match">$16k</span>
                          </div>
                          <div class="item__toprighttable--labelarea">
                            <span class="label light-white">makers</span>
                            <span class="match">9</span>
                          </div>
                        </div>

                        <div class="item__toprighttable--tabcontentright">
                          <div class="">
                            <div class="item__toprighttable--tabcontentright-section">
                              <div class="item__toprighttable--labelarea trackparent">
                                <span class="label light-white">buys</span>
                                <span class="match">6</span>
                                <span class="green track"></span>
                              </div>
                              <div class="item__toprighttable--labelarea right trackparent">
                                <span class="label light-white">sells</span>
                                <span class="match">6</span>
                                <span class="red track"></span>
                              </div>
                            </div>

                            <div class="item__toprighttable--tabcontentright-section">
                              <div class="item__toprighttable--labelarea trackparent">
                                <span class="label light-white">buy volume</span>
                                <span class="match">6</span>
                                <span class="green track"></span>
                              </div>
                              <div class="item__toprighttable--labelarea right trackparent">
                                <span class="label light-white">sell volume</span>
                                <span class="match">6</span>
                                <span class="red track"></span>
                              </div>
                            </div>

                            <div class="item__toprighttable--tabcontentright-section">
                              <div class="item__toprighttable--labelarea trackparent">
                                <span class="label light-white">buyers</span>
                                <span class="match">6</span>
                                <span class="green track"></span>
                              </div>
                              <div class="item__toprighttable--labelarea right trackparent">
                                <span class="label light-white">sellers</span>
                                <span class="match">6</span>
                                <span class="red track"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        </div>
    </div>
</template>

<script>
import utils from '@/mixins/utils.js';

export default {
    props: ["tableLabels", "tableItems"],
    data() {
        return {
            pageSize: 60,
            current: 1,
            searchTermName: "",
            arrItem: [],
            searchCache: []
        };
    },
    mixins: [utils],
    methods: {
        goToItem(symbol, category, symbolObj) {
            this.$router.push({
                path: "/item",
                query: {
                    symbol,
                    category,
                    symbolObj
                }
            });
        },
        getNumberOfPages(array) {
            const { pageSize } = this;
            return Math.ceil(array.length / pageSize);
        },
        paginate(array) {
            const { current, pageSize } = this;
            const startIndex = (current) * pageSize;
            const endIndex = startIndex + pageSize;
            return array.slice(startIndex, endIndex);
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        getPositionInArray(arr, element) {
            const position = arr.indexOf(element);
            if (position !== -1) {
                return `#${position + 1}`;
            }
            return "#Not Found";
        },
        navigatePagination(numOrDir) {
            const { current, arrItem, getNumberOfPages, scrollToTop } = this;
            const totalPages = getNumberOfPages(arrItem);
            scrollToTop();
            if (numOrDir === "next" && current < totalPages) {
                const currentPage = current + 1;
                this.current = currentPage;
                return;
            }
            if (numOrDir === "previous" && current != 1) {
                const currentPage = current - 1;
                this.current = currentPage;
                return;
            }
            const num = numOrDir;
            return this.current = num;
        }
    },
    computed: {
        gridTemplateColumns() {
            const numColumns = this.tableLabels.length + 2;
            return `repeat(${numColumns}, 1fr)`;
        },
        subject() {
            if (this.tableLabels.length) {
                return this.tableLabels[0];
            }
            else {
                return "";
            }
        },
        headerLabels() {
            if (this.tableLabels.length) {
                return this.tableLabels.slice(1);
            }
            else {
                return [];
            }
        },
        paginatedResults() {
            const array = this.arrItem;
            if (array) {
                if (array.length < 50) {
                    return this.arrItem;
                }
                else {
                    return this.paginate(array);
                }
            }
            else {
                return [];
            }
        },
        numberOfPages() {
            const array = this.arrItem;
            if (array) {
                const pageNumbers = [];
                const totalPages = this.getNumberOfPages(array);
                for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
                return pageNumbers;
            }
            else {
                return 0;
            }
        }
    },
    mounted() {
        this.arrItem = this.tableItems;
        this.searchCache = this.tableItems;
    },
    watch: {
        tableItems: function (newValue, oldValue) {
            this.arrItem = newValue;
            this.searchCache = newValue;
        }
    }
}
</script>