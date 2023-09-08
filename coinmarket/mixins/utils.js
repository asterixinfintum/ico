import { mapActions, mapState } from 'vuex';

export default {
  methods: {
    ...mapActions('coinico', ['fetchExtractedData']),
    ...mapActions('poloniex', ['fetchItemsByDataGroup']),
    ...mapActions('poloniex', ['fetchCollateralInfo']),
    ...mapActions('poloniex', ['fetchMarketsPrice']),
    ...mapActions('poloniex', ['fetchBlockChains']),
    ...mapActions('poloniex', ['fetchItemsByBlockChain']),
    ...mapActions('poloniex', ['fetchCryptocurrencies']),
    ...mapActions('uniswap', ['fetchUniswapTokens']),
    ...mapActions('uniswap', ['fetchUniswapProjects']),
    formatNumber(number) {
      const abbreviations = {
        k: 1000,
        m: 1000000,
        b: 1000000000,
        t: 1000000000000
      };
    
      for (const abbreviation in abbreviations) {
        if (Math.abs(number) >= abbreviations[abbreviation]) {
          return (number / abbreviations[abbreviation]).toFixed(1) + abbreviation;
        }
      }
    
      return number.toString();
    },
    getFormattedDateTime(timestamp) {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
    
      return `${formattedDate} ${formattedTime}`;
    },
    formatCurrencyValue(number) {
      const parsedNumber = parseFloat(number);

      if (isNaN(parsedNumber)) {
        throw new Error('Invalid number');
      }
  
      const roundedNumber = parsedNumber.toFixed(1);
      const numberNum = parseFloat(roundedNumber);
      return numberNum.toLocaleString('en-US')
    },
    removeAfterBracket(str) {
      const index = str.indexOf('[');
      if (index !== -1) {
        return str.slice(0, index).trim();
      }
      return str;
    },
    redirectToHome() {
        this.$router.push('/markets');
    },
    generateRandomFinVal() {
      const minValue = 200000;
      const maxValue = 1000000;
    
      const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
      const abbreviatedValue = Math.floor(randomValue / 1000);
    
      return `$${abbreviatedValue}k`;
    },
    removeSlashUnderscore(value) {
      return value.replace(/[/_]/g, '');
    },
    separateSymbolValues(value) {
      const separator = value.includes('/') ? '/' : '_';
      const [leftSymbol, rightSymbol] = value.split(separator);
      return {
        left_symbol: leftSymbol,
        right_symbol: rightSymbol
      };
    }
  },
  computed: {
    ...mapState({
      icocoins: state => state.coinico.extractedData,
      poloniexData: state => state.poloniex.items,
      collateralInfo: state => state.poloniex.collateral_info,
      marketsPrice: state => state.poloniex.markets_price,
      blockchains: state => state.poloniex.blockchains,
      blockchain_items: state => state.poloniex.blockchain_items,
      crypto_currencies: state => state.poloniex.crypto_currencies,
      uniswap_tokens: state => state.uniswap.uniswap_tokens,
      uniswap_projects: state => state.uniswap.uniswap_projects,
    })
  }
}