import { polygon, polygonMumbai } from "wagmi/chains";

export const IS_DEV_ENV = process.env.NODE_ENV === "development";

const DEVELOPMENT_CHAIN = polygonMumbai;
const PRODUCTION_CHAIN = polygon;

export const CHAIN = IS_DEV_ENV ? DEVELOPMENT_CHAIN : PRODUCTION_CHAIN;
export const CHAIN_ID = IS_DEV_ENV ? 80001 : 137;
