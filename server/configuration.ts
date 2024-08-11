import {app} from "./app";
import CyclicDb from "@cyclic.sh/dynamodb"
import slugify  from "slugify";
const db: typeof CyclicDb = CyclicDb("modern-lime-goslingCyclicDB")
// @ts-ignore
import {appConfigurationDefaults} from "../src/config/constants";
import {kv} from '@vercel/kv';

const CONFIG_KEY = '1'

app.get('/api/get-config', async (req, res) => {
  try {
    let config = await kv.get(CONFIG_KEY);
    if (!config) {
      res.json(appConfigurationDefaults)
    }
    else {
      res.json(config)
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/set-config', async (req, res) => {
  try {
    const config = req.body;
    await kv.set(CONFIG_KEY, config, {});
    await kv.get(CONFIG_KEY)

    res.json({status:'ok'})
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete('/api/set-config', async (req, res) => {
  try {
    await kv.del(CONFIG_KEY);
    res.json({status:'ok'})
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
