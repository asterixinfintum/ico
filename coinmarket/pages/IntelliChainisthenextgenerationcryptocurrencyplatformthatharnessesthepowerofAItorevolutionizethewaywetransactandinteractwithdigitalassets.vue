<template>
    <div class="item">
      <Content>
        <div class="item__container">

          <div class="item__left">
            <div class="item__lefttop item__projectdetail" v-if="$route.query.category === 'icoitem'">
              <h1 class="item__projectdetail--h1">{{ removeAfterBracket($route.query.project_name) }}</h1>
              <p class="item__projectdetail--p">Introducing IntelliChain: Revolutionizing the Future of Blockchain with Artificial Intelligence</p>

              <p class="item__projectdetail--p">Are you ready to witness the perfect fusion of blockchain technology and artificial intelligence? Look no further than IntelliChain! Our groundbreaking cryptocurrency project is set to redefine the landscape of digital transactions and bring unprecedented efficiency, security, and intelligence to the blockchain ecosystem.</p>

              <p class="item__projectdetail--p">IntelliChain is the next-generation cryptocurrency platform that harnesses the power of AI to revolutionize the way we transact and interact with digital assets. By integrating cutting-edge machine learning algorithms and advanced data analysis techniques, we've created an intelligent and adaptive blockchain infrastructure that outperforms traditional systems in every way.</p>
  
              <p class="item__projectdetail--p">Imagine a cryptocurrency project that autonomously learns from transaction patterns, detects anomalies, and predicts market trends with astonishing accuracy. IntelliChain's AI-powered algorithms constantly analyze vast amounts of data, providing real-time insights to optimize transactions, enhance security, and ensure reliable performance. Stay one step ahead of the market and make informed decisions like never before.</p>

              <p class="item__projectdetail--p">What sets IntelliChain apart is its commitment to user empowerment. Our intuitive and user-friendly interface makes it easy for anyone, from seasoned traders to crypto enthusiasts, to navigate the world of digital currencies. Whether you're a beginner or an expert, IntelliChain offers a seamless and secure platform to buy, sell, and manage your crypto assets, all backed by the unparalleled intelligence of our AI algorithms.</p>

              <p class="item__projectdetail--p">We understand the importance of privacy and security in the digital realm. That's why IntelliChain employs state-of-the-art encryption protocols and decentralized storage mechanisms to safeguard your data and assets. Our AI-driven security measures adapt and evolve to combat emerging threats, ensuring the highest level of protection for your transactions and personal information.</p>

              <p class="item__projectdetail--p">Join us on this exciting journey towards a future where blockchain and AI converge seamlessly. Experience the power of IntelliChain, where innovation meets intelligence to create a smarter, safer, and more efficient cryptocurrency ecosystem. Be at the forefront of the next generation of blockchain technology and embrace the limitless possibilities that IntelliChain has to offer.</p>

              <p class="item__projectdetail--p">Don't miss out on this groundbreaking opportunity. Invest in IntelliChain today and be part of the AI-powered revolution in blockchain technology!</p>

              <div class="item__labelmatch">
                <h2>Ticker:</h2>
                <p>ITL</p>
              </div>

              <div class="item__labelmatch">
                <h2>Categories:</h2>
                <p>Platform, Internet-technology, Network, AI</p>
              </div>
            </div>

            <div class="item__leftbottom">
              <Table>
                <div class="table__header" :style="{ gridTemplateColumns: gridTemplateColumns }">
                  <div class="table__header--subject" :style="{ 'grid-column': 'span 2' }">{{ subject }}</div>
                  <div class="table__header--area">{{ headerLabels[1] }}</div>
                  <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ headerLabels[3] }}</div>
                  <div class="table__header--area">{{ headerLabels[2] }}</div>
                  <div class="table__header--area" :style="{ 'grid-column': 'span 2' }">{{ headerLabels[4] }}</div>
                  <div class="table__header--area">{{ headerLabels[5] }}</div>
                  <div class="table__header--area">{{ headerLabels[6] }}</div>
                </div>

                <div class="table__header table__item"
                    :style="{ gridTemplateColumns: gridTemplateColumns }"
                    v-for="{ tradeData, timestamp, hash } in paginatedResults"
                    @click="opentxt(hash[0])">
                    <div class="table__header--subject" :style="{ 'grid-column': 'span 2' }">
                        <span class="light-white number">{{ timestamp}}</span>
                    </div>
                    <div v-if="tradeData" class="table__header--area" :class="{ red: tradeData.type === 'Sell', green: tradeData.type === 'Buy' }">{{ tradeData.type }}</div>
                    <div v-if="tradeData" class="table__header--area" :style="{ 'grid-column': 'span 2' }" :class="{ red: tradeData.type === 'Sell', green: tradeData.type === 'Buy' }">${{tradeData.price }}</div>
                    <div v-if="tradeData" class="table__header--area" :class="{ red: tradeData.type === 'Sell', green: tradeData.type === 'Buy' }">{{ tradeData.ratio }}</div>
                    <div v-if="tradeData" class="table__header--area" :style="{ 'grid-column': 'span 2' }" :class="{ red: tradeData.type === 'Sell', green: tradeData.type === 'Buy' }">{{ formatCurrencyValue(tradeData.quantity) }}</div>
                    <div v-if="tradeData" class="table__header--area" :class="{ red: tradeData.type === 'Sell', green: tradeData.type === 'Buy' }">{{ tradeData.transactionID }}</div>
                    <div v-if="tradeData" class="table__header--area" :class="{ red: tradeData.type === 'Sell', green: tradeData.type === 'Buy' }">{{ tradeData.identifier }}</div>
                </div>
                
              </Table>
            </div>
          </div>

          <div class="item__right">
            <div class="item__toprightboxsubject" v-if="this.$route.query.category === 'markets'">
              <div class="item__toprightboxsubject--name" v-if="item_data.data">{{ item_data.data.displayName }}</div>
                <div class="item__toprightboxsubject--sub">
                  <div class="item__toprightboxsubject--subleft item__toprightboxsubject--area">
                    <figure>
                      <img src="@/assets/imgs/binancelogo.png"/>
                    </figure>
                    <div class="item__toprightboxsubject--subinterestingdata">{{ item_data.data.blockchain.blockchain }}</div>
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
                    <div class="item__toprightboxsubject--subinterestingdata">{{ item_data.data.quoteCurrencyName }}</div>
                  </div>
                </div>
            </div>

            <div class="item__toprightcontent">
              <div class="item__toprightgrid first top-spacing" v-if="$route.query.category === 'markets' && board_base.data">
                <Box :label="'price'" :match="`$${board_base.data.price}`"/>
                <Box :label="'symbol'" :match="board_base.data.symbol"/>
                <Box :label="'daily'" :match="board_base.data.dailyChange"/>
              </div>
              <div class="item__toprightgrid second top-spacing" v-if="$route.query.category === 'markets'">
                <Box :label="'max leverage'" :match="item_data.data.crossMargin.maxLeverage"/>
                <Box :label="'price scale'" :match="item_data.data.symbolTradeLimit.priceScale"/>
                <Box :label="'highest bid'" :match="item_data.data.symbolTradeLimit.highestBid"/>
                <Box :label="'lowest ask'" :match="item_data.data.symbolTradeLimit.lowestAsk"/>
              </div>
              <div class="item__toprightgrid third top-spacing" v-if="$route.query.category === 'markets'">
                <Box :label="'blockchain'" :match="item_data.data.blockchain.blockchain"/>
                <Box :label="'decimals'" :match="item_data.data.blockchain.decimals"/>
                <Box :label="'fee'" :match="formatCurrencyValue(item_data.data.blockchain.withdrawFee)"/>
                <Box :label="'min fee'" :match="item_data.data.blockchain.withdrawMin"/>
                <Box :label="'coin'" :match="item_data.data.blockchain.coin"/>
              </div>

              <div class="item__toprighttable top-spacing">
                <div class="item__toprighttable--body">
                  <div class="item__toprighttable--tabarea">
                    <div class="item__toprighttable--tab light-white" @click="boardDummyDataGen('5M')" :class="{ currentBoardView: currentBoardView === '5M' }">5M</div>
                    <div class="item__toprighttable--tab light-white" @click="boardDummyDataGen('1H')" :class="{ currentBoardView: currentBoardView === '1H' }">1H</div>
                    <div class="item__toprighttable--tab light-white" @click="boardDummyDataGen('6H')" :class="{ currentBoardView: currentBoardView === '6H' }">6H</div>
                    <div class="item__toprighttable--tab light-white" @click="boardDummyDataGen('24H')" :class="{ currentBoardView: currentBoardView === '24H' }">24H</div>
                  </div>

                  <div class="item__toprighttable--tabcontent">
                    <div class="item__toprighttable--tabcontentleft">
                      <div class="item__toprighttable--labelarea">
                        <span class="label light-white">txns</span>
                        <span class="match">{{ boardDummyData.txns }}</span>
                      </div>
                      <div class="item__toprighttable--labelarea">
                        <span class="label light-white">volume</span>
                        <span class="match">${{ boardDummyData.volume }}</span>
                      </div>
                      <div class="item__toprighttable--labelarea">
                        <span class="label light-white">makers</span>
                        <span class="match">{{ boardDummyData.makers }}</span>
                      </div>
                    </div>

                    <div class="item__toprighttable--tabcontentright">
                      <div class="item__toprighttable--tabcontentright-section">
                        <div class="item__toprighttable--labelarea trackparent">
                          <span class="label light-white">buys</span>
                          <span class="match">{{ boardDummyData.buys }}</span>
                          <span class="green track"></span>
                        </div>
                        <div class="item__toprighttable--labelarea right trackparent">
                          <span class="label light-white">sells</span>
                          <span class="match">{{ boardDummyData.sells }}</span>
                          <span class="red track"></span>
                        </div>
                      </div>

                      <div class="item__toprighttable--tabcontentright-section">
                        <div class="item__toprighttable--labelarea trackparent">
                          <span class="label light-white">buy volume</span>
                          <span class="match">{{ boardDummyData.buy_vol }}</span>
                          <span class="green track"></span>
                        </div>
                        <div class="item__toprighttable--labelarea right trackparent">
                          <span class="label light-white">sell volume</span>
                          <span class="match">{{ boardDummyData.sell_vol }}</span>
                          <span class="red track"></span>
                        </div>
                      </div>

                      <div class="item__toprighttable--tabcontentright-section">
                        <div class="item__toprighttable--labelarea trackparent">
                          <span class="label light-white">buyers</span>
                          <span class="match">{{ boardDummyData.buyers }}</span>
                          <span class="green track"></span>
                        </div>
                        <div class="item__toprighttable--labelarea right trackparent">
                          <span class="label light-white">sellers</span>
                          <span class="match">{{ boardDummyData.sellers }}</span>
                          <span class="red track"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="item__bottomright item__toprightcontent top-spacing">
                <figure class="item__ad">
                  <img src="@/assets/imgs/300x250.gif"/>
                </figure>
            </div>
          </div>
        </div>
      </Content>
    </div>
  </template>
  
  <script>
  import table from '@/mixins/table.js';
  import item from '@/mixins/item.js';
  import utils from '@/mixins/utils.js';
  import itemboard from '@/mixins/itemboard.js';

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'IndexPage',
    mixins: [table, item, utils, itemboard],
    data() {
      return {
        tableLabels: [
          'Date',
          'Type',
          'Type',
          'ratio',
          'USD',
          'volume',
          'shrooms',
          'txn'
        ],
        currentBoardView: '24H',
        boardDummyData: {}
      }
    },
    mounted() {

      this.boardDummyDataGen();

      this.pageSize = 20;

      setInterval(() => {
        if (this.current < this.numberOfPages.length-2) {
          this.current+=1;
        } else {
          this.current = 1;
        }
      }, 5000);

      if (this.$route.query.category === 'icoitem') {
        //this.styleDetailCont();
        //this.styleIcoDetails();
      }

      this.fetchBlocks();
      this.fetchTransactions()
      this.fetchMarketsPrice();

      console.log(this.$route.query.category, 'enjoy this results');
    },
    methods: {
      ...mapActions('alchemy', ['fetchBlocks']),
      ...mapActions('alchemy', ['fetchTransactions']),
      styleIcoDetails() {
        const info_titles = document.querySelectorAll(".ico-more-info__title")
        document.querySelector('.ico-more-info__title').style.display = 'none'
        const info__subtitle = document.querySelectorAll('.ico-more-info__subtitle');
        const info__opacity = document.querySelectorAll(".ico-more-info__opacity");

        info__opacity.forEach(element => {
          element.style.marginBottom = `1rem`;
        })

        info_titles.forEach(element => {
          element.style.display = 'none'
        })

        info__subtitle.forEach(element => {
          element.style.marginTop = `.5rem`;
          element.style.marginBottom = `.2rem`;
          const text = element.innerHTML;
          const newtext = `${text}:`;
          element.innerHTML = newtext;
          element.style.color = `rgb(176, 220, 115)`;
        })
      },
      styleDetailCont() {
        const detailCont = document.querySelectorAll('.detail-padding20');

        const item__projectdetail = document.querySelectorAll('.item__projectdetail--p');

        item__projectdetail.forEach((element, index) => {
          console.log(index)
          if (index === 1) {
            element.firstChild.textContent = ''
            element.childNodes[2].textContent = ''
            element.lastChild.textContent = ''
          }
        });

        detailCont.forEach(element => {
          // Select all <p> and <h2> tags within the current element
          const paragraphs = element.querySelectorAll('p');
          const headings = element.querySelectorAll('h2');

          // Apply styles to each <p> tag
          paragraphs.forEach(p => {
            // Add your styles for <p> tags here
            p.style.marginBottom = `1rem`;
            p.style.lineHeight = `1.5rem`;
            // Add any other styles as needed
          });

          // Apply styles to each <h2> tag
          headings.forEach(h2 => {
              h2.style.fontWeight = '500';
              h2.style.fontSize = `1.2rem`;
              h2.style.marginBottom = `1.2rem`;
          });
        });
      },
      opentxt(txthash) {
        console.log(txthash, 'ytest')
        //https://etherscan.io/tx/0xe2ffdd973950d12df70e0f155e051fa1527d671cfab890a9aec64c5c1c856791
        var url = `https://etherscan.io/tx/${txthash}`;
        window.open(url, "_blank");
      },
      boardDummyDataGen(optional) {
        if (optional) {
          this.currentBoardView = optional;
        }

        function generateRandomNumber(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        //this.boardDummyData
        const boardDummyData = {
          txns: this.formatNumber(generateRandomNumber(1000000, 900000)),
          volume: this.formatNumber(generateRandomNumber(800000, 900000)),
          makers: this.formatNumber(generateRandomNumber(10000, 80000)),
          buys: this.formatNumber(generateRandomNumber(100000, 200000)),
          sells: this.formatNumber(generateRandomNumber(10, 500)),
          buy_vol: this.formatNumber(generateRandomNumber(100000, 200000)),
          sell_vol: this.formatNumber(generateRandomNumber(1000, 6000)),
          buyers: this.formatNumber(generateRandomNumber(10000, 100000)), 
          sellers: this.formatNumber(generateRandomNumber(20, 100))
        }

        this.boardDummyData = boardDummyData;
      }
    },
    watch: {
      alchemy_transactions: function(newValue, oldValue) {
        const data = newValue
        data.forEach(item => {
          item.tradeData = this.generateData();
        });

        this.arrItem = data;
        this.searchCache = data;
      },
      marketsPrice: function(newValue, oldValue) {
        if (newValue.length && this.$route.query.category === 'markets') {
          newValue.forEach(item => {
            if (item.data.symbol === this.item_data.data.symbol) {
              this.board_base = item;
            }
          })
        }
      }
    },
    computed: {
      ...mapState({
        alchemy_transactions: state => state.alchemy.block,
        alchemy_blocks: state => state.alchemy.block,
      }),
      item_data: function() {
        return JSON.parse(this.$route.query.item)
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .item {

    &__container {
      display: flex;

      @media only screen and (max-width: 414px) {
        flex-direction: column;
      }
    }

    &__left {
      background: $background;
      width: #{scaleValue(950)};
      overflow: hidden;
      border-right: $border;

      @media only screen and (max-width: 414px) {
        width: 100%;
      }
    }

    &__right {
      flex-grow: 1;
    }

    &__lefttop {
      height: 45vh;
    }

    &__projectdetail {
      padding: #{scaleValue(10)};
      overflow-y: scroll;
      height: 60vh;

      &--h1 {
        font-weight: 500;
        font-size: #{scaleValue(23)};
        margin-bottom: #{scaleValue(30)};
        color: $green;
        text-transform: capitalize;

        @media only screen and (max-width: 414px) {
          font-size: #{scaleValue(50)};
        }
      }

      &--p {
        font-weight: 300;
        //font-size: #{scaleValue(15)};
        margin-bottom: #{scaleValue(15)};
        $line-height: #{scaleValue(25)};

        & h2 {
          font-weight: 500;
          font-size: #{scaleValue(23)};
          margin-bottom: #{scaleValue(15)};
        }

        & p {
          font-weight: 300;
          font-size: #{scaleValue(15)};
          margin-bottom: #{scaleValue(15)};
          $line-height: #{scaleValue(25)};
        }
      }

      &--disclaimer {
        font-size: #{scaleValue(9)};
        color: $disclaimer-color;
        display: inline-block;
        width: #{scaleValue(500)};
        opacity: .5;
      }
    }

    &__leftbottom {
      height: #{scaleValue(400)};
      background: $background;
      position: relative;
      z-index: 1;
      overflow-y: scroll;

      @media only screen and (max-width: 414px) {
        height: #{scaleValue(1700)};
      }
    }

    &__toprightcontent {
      padding-left: #{scaleValue(8)};
      padding-right: #{scaleValue(8)};
    }

    &__toprightgrid {
      display: grid;
      grid-gap: #{scaleValue(8)};
      &.first {
        grid-template-columns: repeat(3, 1fr);
      }

      &.second {
        grid-template-columns: repeat(4, 1fr);
      }

      &.third {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    &__toprighttable {

      &--body {
        border: $border;
        border-radius: $border-radius;
        min-height: #{scaleValue(48)};
      }

      &--tabarea {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-bottom: $border;
      }

      &--tab {
        text-align: center;
        border-right: $border;
        font-size: #{scaleValue(12)};
        font-weight: 200;
        padding: #{scaleValue(8)};
        cursor: pointer;

        &.currentBoardView {
          background: $light-grey
        }

        @media only screen and (max-width: 414px) {
          font-size: #{scaleValue(50)};
        }

        &:nth-child(4) {
          border: none
        }
      }

      &--tabcontent {
        display: flex;
        padding: #{scaleValue(10)} #{scaleValue(10)};

        @media only screen and (max-width: 414px) {
          flex-direction: column;
        }
      }

      &--tabcontentleft {
        width:  #{scaleValue(85)};
        border-right: $border;

        @media only screen and (max-width: 414px) {
          width: 100%;
          border: none;
          padding: #{scaleValue(10)} #{scaleValue(10)};
          display: flex;
          justify-content: space-evenly;
        }
      }

      &--tabcontentright {
        flex-grow: 1;
        padding-left: #{scaleValue(10)};

        &-section {
          display: flex;
          justify-content: space-between;
        }
      }
      
      &--labelarea {
        display: flex;
        flex-direction: column;
        margin-bottom: #{scaleValue(20)};

        &.right{
          align-items: flex-end;
        }

        &.trackparent {
          min-width: 49.5%;
        }

        & span {
          display: inline-block;
          &.label {
            text-transform: uppercase;
            font-size: #{scaleValue(10)};
            margin-bottom: #{scaleValue(6)};

            @media only screen and (max-width: 414px) {
              font-size: #{scaleValue(50)};
              margin-bottom: #{scaleValue(30)};
            }
          }

          &.match {
            font-size: #{scaleValue(13)};

            @media only screen and (max-width: 414px) {
              font-size: #{scaleValue(50)};
              margin-bottom: #{scaleValue(30)};
            }
          }
          
          //dev below, add values programmaticaaly with javascript
          &.green {
            border-radius: $border-radius;
            background: $green;
          }
          &.red {
            border-radius: $border-radius;
            background: $red;
          }

          &.track {
            width: 100%;
            height: #{scaleValue(5)};
            margin-top: #{scaleValue(5)};
          }
        }
      }
    }

    &__bottom {
      position: relative;
      background: $background;
      z-index: 2;
    }

    &__bottomleft {
      width: #{scaleValue(950)};
    }

    &__bottomright {

    }

    &__toprightboxsubject {
      display: flex;
      flex-direction: column;
      padding: #{scaleValue(8)} 0;
      border-bottom: $border;
      background: $light-black;

      @media only screen and (max-width: 414px) {
        padding: #{scaleValue(60)} 0;
      }

      &--name {
        text-transform: uppercase;
        text-align: center;
        font-size: #{scaleValue(15)};
        font-weight: 600;

        @media only screen and (max-width: 414px) {
          font-size: #{scaleValue(60)};
        }
      }

      &--sub {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: #{scaleValue(9)};
      }

      &--area {
        display: flex;
        font-size: #{scaleValue(14)};
        color: $light-white;

        @media only screen and (max-width: 414px) {
          font-size: #{scaleValue(50)};
        }

        & figure {
          height: #{scaleValue(15)};
          width: #{scaleValue(15)};
          margin: 0 #{scaleValue(5)};

          @media only screen and (max-width: 414px) {
            height: #{scaleValue(40)};
            width: #{scaleValue(40)};
            margin: 0 #{scaleValue(14)};
          }

          & img {
            height: 100%;
            width: 100%;
          }
        }
      }

      &--subleft {

      }

      &--svg {
        display: flex;
        align-items: center;
        margin: 0 #{scaleValue(5)};
      
        & svg {
          height: #{scaleValue(17)};
          width: #{scaleValue(17)};
          fill: rgba(#fff, .7);
        }
      }
    }

    &__ad {
      height: #{scaleValue(300)};
      cursor: pointer;

      @media only screen and (max-width: 414px) {
        height: #{scaleValue(1300)};
      }

      & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &__labelmatch {
        margin-bottom: #{scaleValue(20)};

        @media only screen and (max-width: 414px) {
            margin-bottom: #{scaleValue(70)};
        }

        & h2 {
            font-weight: 500;
            font-size: #{scaleValue(20)};
            color: $green;
            margin-bottom: #{scaleValue(10)};

            @media only screen and (max-width: 414px) {
                font-size: #{scaleValue(60)};
            }
        }
    }
  }

  .top-spacing {
    padding-top: #{scaleValue(8)};
  }

  p { 
        line-height: #{scaleValue(26)}; 

        @media only screen and (max-width: 414px) {
            line-height: #{scaleValue(95)}; 
        }
    }
  </style>
  