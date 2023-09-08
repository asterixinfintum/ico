import base_vars from './base_vars';

const { BASE_URL } = base_vars;

export const state = () => ({
    block: [],
    transactions: []
});

export const mutations = {
  SET_EXTRACTED_BLOCK(state, data) {
    state.block = data;
  },
  SET_TRANSACTION(state, error) {
    state.transactions = error;
  }
};

export const actions = {
    async fetchBlocks({ commit }) {
        try {
            const response = await fetch(`${BASE_URL}/transactionsdata`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                commit('SET_EXTRACTED_BLOCK', data);
            } else {
                throw new Error('Failed to fetch extracted data');
            }
        } catch {
            console.error('Error fetching txt:', error);
        }
    },
    async fetchTransactions({ commit }) {
        try {
            const response = await fetch(`${BASE_URL}/blockdata`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                commit('SET_TRANSACTION', data);
            } else {
                throw new Error('Failed to fetch extracted data');
            }
        } catch {
            console.error('Error fetching txt:', error);
        }
    },
}

export const getters = {
  block(state) {
    return state.block;
  },
  transactions(state) {
    return state.transactions;
  }
};