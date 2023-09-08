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
                    @click="goToItem">
                    <div class="table__header--subject" :style="{ 'grid-column': '1 / span 3' }">
                        <span class="img">
                            <img :src="returnCorrectIcon()"/>
                        </span>
                        <span class="light-white number">{{ tableItem.data.name }}</span>
                    </div>
                    <div class="table__header--area">{{ tableItem.data.coin }}</div>
                    <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].blockchain : '' }}</div>
                    <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].decimals : '' }}</div>
                    <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].minConfirm : '' }}</div>
                    <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].withdrawFee : ''}}</div>
                    <div class="table__header--area">{{ tableItem.data.networkList ? tableItem.data.networkList[0].name : '' }}</div>
                </div>

                <TablePaginator />
            </Table>
        </Content>
    </div>
</template>

<script>
  import table from '@/mixins/table.js';

export default {
    mixins: [table],
    data() {
        return {
            tableLabels: [
                'Name',
                'Symbol',
                'Blockchain',
                'Decimals',
                'Min Confirm',
                'Withdraw Fee',
                'Network'
            ],
            sortedParginated: []
        }
    },
    mounted() {
        this.fetchCryptocurrencies();
    },
    methods: {
        async returnSortedByBlockChain (array) {
            const blockchainname = this.$route.query.blockchainname;
            await this.fetchItemsByBlockChain({ array, blockchainname });
        },
        returnCorrectIcon() {
            const blockchainname = this.$route.query.blockchainname;
            const result = this.blockchains.filter(item => item.blockchainname === blockchainname)
            return result[0].imglink;
        }
    },
    watch: {
        $route: async function (newValue, oldValue) {
            this.fetchCryptocurrencies();
            //this.returnSortedByBlockChain(this.poloniexData)
        },
        crypto_currencies: function (newValue, oldValue) {
            this.returnSortedByBlockChain(newValue)
        },
        blockchain_items: function (newValue, oldValue) {
            this.arrItem = newValue;
            this.searchCache = newValue;
        }
    }
}
</script>