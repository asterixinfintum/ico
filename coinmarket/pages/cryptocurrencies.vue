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
  import utils from '@/mixins/utils.js';
  import table from '@/mixins/table.js';

export default {
    mixins: [utils, table],
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
            ]
        }
    },
    mounted() {
        this.fetchItemsByDataGroup('crypto_currencies');
    }
}
</script>