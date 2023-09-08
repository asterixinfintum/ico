import base_vars from './base_vars';

const { BASE_URL } = base_vars;

export const state = () => ({
    uniswap_tokens: [],
    uniswap_projects: []
});

export const mutations = {
    setUniswapTokens(state, uniswap_tokens) {
        state.uniswap_tokens = uniswap_tokens;
    },
    setUniswapProjects(state, uniswap_projects) {
        state.uniswap_projects = uniswap_projects;
    },
}

export const actions = {
    async fetchUniswapTokens({ commit }) {
        try {
            fetch(`${BASE_URL}/uniswap/uniswap_tokens`)
                .then(response => response.json())
                .then(uniswap_tokens => {
                    console.log(uniswap_tokens)
                    commit('setUniswapTokens', uniswap_tokens);
                })
                .catch(error => {
                    console.error('Failed to fetch items:', error);
                })
        } catch (error) {

        }
    },
    async fetchUniswapProjects({ commit }) {
        try {
            fetch(`${BASE_URL}/uniswap/uniswap_projects`)
                .then(response => response.json())
                .then(uniswap_projects => {
                    console.log(uniswap_projects)
                    commit('setUniswapProjects', uniswap_projects);
                })
                .catch(error => {
                    console.error('Failed to fetch items:', error);
                })
        } catch (error) {

        }
    }
}

export const getters = {
    getUniswapTokens(state) {
        return state.uniswap_tokens;
    },
    getUniswapProjects(state) {
        return state.uniswap_projects;
    },
}