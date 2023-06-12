import { IS_DEV_ENV } from "./chains";

export const API_URL = IS_DEV_ENV
  ? "https://api-mumbai.lens.dev/"
  : "https://api.lens.dev/";

export const APP_NAME = "Lens App";

export * from "./chains";
export * from "./addresses";
