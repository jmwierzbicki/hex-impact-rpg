import {app} from "./app";
import CyclicDb, {collection} from "@cyclic.sh/dynamodb"
import slugify  from "slugify";
const db: typeof CyclicDb = CyclicDb("modern-lime-goslingCyclicDB")
// @ts-ignore
import { generateId } from 'zoo-ids';
import {genID} from "../src/app/main/helpers/gen-id";
import e from "express";

const adminList: string = process.env['admins']!;

const admins = adminList.split(',').map(id => genID(id))
const usersCollection = db.collection('users')

app.get('/api/identity/:id', async (req, res) => {
  try {
    const id = genID(req.params.id);
    let user = await usersCollection.get(id)

    if (!user) {
      let hash = generateId(null, {
        caseStyle: 'lowercase',
        delimiter: '-',
      })
      let userObject:{id: string, hash: string, oldHashes: string[], isAdmin?: boolean} = {id, hash, oldHashes: []};
      if (admins.includes(id)) {
        userObject.isAdmin = true;
      }
      await usersCollection.set(id, userObject, {});
      user = await usersCollection.get(id)
    }
    res.json(user)
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }

});


app.get('/api/list-users', async (req, res) => {
  try {
    let userList = (await usersCollection.list()).results

    userList = await Promise.all(
      userList.map(async ({ key }) => (await usersCollection.get(key)).props)
    );
    res.json(userList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/reset-hash', async (req, res) => {
  try {
    const { id } = req.body;
    const user = await usersCollection.get(id);

    const oldHash = user.props.hash
    user.props.hash = generateId(null, {
      caseStyle: 'lowercase',
      delimiter: '-',
    })
    user.props.oldHashes.push(oldHash)
    await usersCollection.set(id, user, {});

    res.json(await usersCollection.get(id));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
