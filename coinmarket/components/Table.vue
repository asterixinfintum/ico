<template>
    <div class="table">
        <div class="table__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import utils from '@/mixins/utils.js';

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
    }
}
</script>