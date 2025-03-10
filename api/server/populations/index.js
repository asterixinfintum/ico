import makeAPIRequest from "./poloniex/populator";
import fetchTokensFromUniswap from "./uniswap/tokens";
import fetchProjectsFromUniswap from "./uniswap/projects";
import alchemydata from "./alchemy/alchemydata";
import saveItemsToMongoDB from "./cryptoicos/populator";

const populations = {
    makeAPIRequest,
    fetchTokensFromUniswap,
    fetchProjectsFromUniswap,
    alchemydata,
    saveItemsToMongoDB
}

export default populations;