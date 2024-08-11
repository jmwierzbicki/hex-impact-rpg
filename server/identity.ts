import {app} from "./app";
// @ts-ignore
import {generateId} from 'zoo-ids';
import {genID} from "../src/app/main/helpers/gen-id";
import {kv} from '@vercel/kv';


const adminList: string = process.env['admins']! || 'test1234';

const admins = adminList.split(',').map(id => genID(id))
// const usersCollection = db.collection('users')

const _USER_PREFIX = 'USER_COLLECTION'

type User = {id: string, hash: string, oldHashes: string[], isAdmin?: boolean};

// app.get('/api/foo/:id', async (req, res) => {
//   res.json('bar')
// });

app.get('/api/identity/:id', async (req, res) => {
  try {
    let user = await getOrAddUser(req.params.id)
    res.json(user)
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }

});


app.get('/api/list-users', async (req, res) => {
  try {
    let userList= await listUsers();
    res.json(userList);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/reset-hash', async (req, res) => {
  try {
    const { id, seed } = req.body;
    console.log(seed)
    const oldUser: User = await getOrAddUser(id);
    const newData = {...oldUser}

    newData.hash = seed || generateId(null, {
      caseStyle: 'lowercase',
      delimiter: '-',
    });
    console.log(newData.hash)
    newData.oldHashes.unshift(oldUser.hash);
    newData.oldHashes.splice(5)

    await updateUser(id, newData); // usersCollection.set(id, newData, {});

    res.json(newData);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/api/remove-user', async (req, res) => {
  try {
    const { id } = req.body;
    await removeUser(id)

    res.json({status:'ok'});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


async function getOrAddUser(userId: string) {
  const id = genID(userId);
  let usersRaw = await kv.get(_USER_PREFIX)  as User[]
  console.log(usersRaw)
  console.log( typeof usersRaw)
  if (!usersRaw) {
    console.log('test')
    usersRaw = []
  }
  let users: User[]  = usersRaw;

  console.log(users)

  let user = users.find(user => user.id === id)

  if (!user) {
    let hash = generateId(null, {
      caseStyle: 'lowercase',
      delimiter: '-',
    })
    let userObject: User = {id, hash, oldHashes: []};
    console.log(admins)
    if (admins.includes(id)) {
      console.log('it is admin!')
      userObject.isAdmin = true;
    }
    users.push(userObject)
    await kv.set(_USER_PREFIX, users)
    return userObject
  }
  if (admins.includes(user.id)) {
    user.isAdmin = true;
  }
  return user
}

async function removeUser(userId: string) {
  const id = genID(userId);
  let usersRaw = await kv.get(_USER_PREFIX)  as User[]
  const userIndex = usersRaw.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    usersRaw.splice(userIndex, 1);
    await kv.set(_USER_PREFIX, usersRaw);
    return
  }
  return
}

async function listUsers() {
  return await kv.get(_USER_PREFIX) as User[];

}

async function resetHash() {

}

async function updateUser(userId: string, updatedUser: User) {
  const id = genID(userId);
  let usersRaw = await kv.get(_USER_PREFIX) as User[];
  const userIndex = usersRaw.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    usersRaw[userIndex] = updatedUser;
    await kv.set(_USER_PREFIX, usersRaw);
    return;
  }
  return;
}
