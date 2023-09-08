import base_vars from './base_vars';

const { BASE_URL } = base_vars;

export const state = () => ({
  extractedData: [],
  error: null
});

export const mutations = {
  SET_EXTRACTED_DATA(state, data) {
    state.extractedData = data;
  },
  SET_ERROR(state, error) {
    state.error = error;
  }
};

export const actions = {
  async fetchExtractedData({ commit }) {
    try {
      const response = await fetch(`${BASE_URL}/extracted-data`);
      if (response.ok) {
        const base = await response.json();
        const data = base;

        const IntelliChain = {
          About: '',
          Additional_details: '',
          DataDirect: '',
          DateFrom: 'Apr 23, 2021',
          DateTo: 'Jun 24, 2023',
          Label: '',
          Name: 'IntelliChain',
          PeriodValue: '92 % completed',
          Raised: '$50b',
          subject_coin: true,
          marketCap: '$5b'
        }

        const index = 4;
        data.splice(index, 0, IntelliChain);
        commit('SET_EXTRACTED_DATA', data);
      } else {
        throw new Error('Failed to fetch extracted data');
      }
    } catch (error) {
      console.error('Error fetching extracted data:', error);
      commit('SET_ERROR', error);
    }
  }
};

export const getters = {
  extractedData(state) {
    return state.extractedData;
  },
  error(state) {
    return state.error;
  }
};