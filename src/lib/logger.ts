import {appConfig} from "@/config/app.config";

const isDev = appConfig.nodeEnv === "development";

export const logger = {
    log: (...args: (string | number | object)[]) => {
        if (isDev) console.log("[LOG]:", ...args);
    },

    info: (...args: (string | number | object)[]) => {
        if (isDev) console.info("[INFO]:", ...args);
    },

    warn: (...args: (string | number | object)[]) => {
        if (isDev) console.warn("[WARN]:", ...args);
    },

    error: (...args: Parameters<typeof console.error>) => {
        if (isDev) console.error("[ERROR]:", ...args);
    },

    debug: (...args: (string | number | object)[]) => {
        if (isDev) console.debug("[DEBUG]:", ...args);
    },
};
