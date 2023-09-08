import utils from '@/mixins/utils.js';
import { EventBus } from '@/events/event-bus.js';

export default {
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
        searchArrItemByName() {
            this.arrItem = this.searchCache;
            const searchTerm = this.searchTermName.trim().toLowerCase();
            const arrItem = this.arrItem;
            const page = this.$route.path

            console.log(page)

            if (page === '/markets') {
                const filtered = arrItem.filter(item => item['data']['baseCurrencyName'].toString().trim().toLowerCase().includes(searchTerm));
                
                this.arrItem = filtered;
                const update = this.arrItem
                EventBus.$emit('arrItem-updated', update);
            }

            if (page === '/tickers') {
                const filtered = arrItem.filter(item => item['data']['displayName'].toString().trim().toLowerCase().includes(searchTerm));
                
                this.arrItem = filtered;
                const update = this.arrItem
                EventBus.$emit('arrItem-updated', update);
            }

            if (page === '/coinico') {
                const filtered = arrItem.filter(item => this.removeAfterBracket(item['Name']).toString().trim().toLowerCase().includes(searchTerm));
                
                this.arrItem = filtered;
                const update = this.arrItem
                EventBus.$emit('arrItem-updated', update);
            }

            if (page === '/tokens') {
                const filtered = arrItem.filter(item => this.removeAfterBracket(item['data']['name']).toString().trim().toLowerCase().includes(searchTerm));
                
                this.arrItem = filtered;
                const update = this.arrItem
                EventBus.$emit('arrItem-updated', update);
            }

            if (page === '/') {
                const filtered = arrItem.filter(item => this.removeAfterBracket(item['data']['name']).toString().trim().toLowerCase().includes(searchTerm));
                
                this.arrItem = filtered;
                const update = this.arrItem
                EventBus.$emit('arrItem-updated', update);
            }
        },
        goToItem(symbol, category, symbolObj, item) {
            this.$router.push({
                path: "/item",
                query: {
                    symbol,
                    category,
                    symbolObj,
                    item: JSON.stringify(item)
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
            const page = this.$route.path
            console.log(array, this.arrItem, 'check array', page)

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
    watch: {
        searchTermName: function() {
            this.searchArrItemByName();
        },
        poloniexData: function (newValue, oldValue) {
            this.arrItem = newValue;
            this.searchCache = newValue;
        },
        uniswap_tokens: function(newValue, oldValue) {
            if (this.$route.path === '/tokens') {
                this.arrItem = newValue;
                this.searchCache = newValue;
            }
        },
        icocoins: function (newValue, oldValue) {
            if (this.$route.path === '/coinico') {
                this.arrItem = newValue;
                this.searchCache = newValue;
            }
        },
        uniswap_projects: function(newValue, oldValue) {
            if (this.$route.path === '/') {
                this.arrItem = newValue;
                this.searchCache = newValue;
            }
        }
    }
}