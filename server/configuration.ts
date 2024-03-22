import {app} from "./app";
import CyclicDb from "@cyclic.sh/dynamodb"
import slugify  from "slugify";
const db: typeof CyclicDb = CyclicDb("modern-lime-goslingCyclicDB")
// @ts-ignore
import { generateId } from 'zoo-ids';
import {genID} from "../src/app/main/helpers/gen-id";
import {appConfigurationDefaults} from "../src/config/constants";

const configCollection = db.collection('config')

app.get('/api/get-config', async (req, res) => {
  try {
    let config = await configCollection.get('1');
    if (!config) {
      res.json(appConfigurationDefaults)
    }
    else {
      res.json(config.props)
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/set-config', async (req, res) => {
  try {
    const config = req.body;
    await configCollection.set('1', config, {});
    await configCollection.get('1')

    res.json({status:'ok'})
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.delete('/api/set-config', async (req, res) => {
  try {
    const config = await configCollection.get('1');
    await config.delete()

    res.json({status:'ok'})
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
