"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("./app");
const dynamodb_1 = tslib_1.__importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)("modern-lime-goslingCyclicDB");
// @ts-ignore
const constants_1 = require("../src/config/constants");
const kv_1 = require("@vercel/kv");
const CONFIG_KEY = '1';
app_1.app.get('/api/get-config', async (req, res) => {
    try {
        let config = await kv_1.kv.get(CONFIG_KEY);
        if (!config) {
            res.json(constants_1.appConfigurationDefaults);
        }
        else {
            res.json(config);
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.post('/api/set-config', async (req, res) => {
    try {
        const config = req.body;
        await kv_1.kv.set(CONFIG_KEY, config, {});
        await kv_1.kv.get(CONFIG_KEY);
        res.json({ status: 'ok' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.delete('/api/set-config', async (req, res) => {
    try {
        await kv_1.kv.del(CONFIG_KEY);
        res.json({ status: 'ok' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//# sourceMappingURL=configuration.js.map