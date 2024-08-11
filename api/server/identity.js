"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// @ts-ignore
const zoo_ids_1 = require("zoo-ids");
const gen_id_1 = require("../src/app/main/helpers/gen-id");
const kv_1 = require("@vercel/kv");
const adminList = process.env['admins'] || 'test1234';
const admins = adminList.split(',').map(id => (0, gen_id_1.genID)(id));
// const usersCollection = db.collection('users')
const _USER_PREFIX = 'USER_COLLECTION';
// app.get('/api/foo/:id', async (req, res) => {
//   res.json('bar')
// });
app_1.app.get('/api/identity/:id', async (req, res) => {
    try {
        let user = await getOrAddUser(req.params.id);
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.get('/api/list-users', async (req, res) => {
    try {
        let userList = await listUsers();
        res.json(userList);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.post('/api/reset-hash', async (req, res) => {
    try {
        const { id, seed } = req.body;
        console.log(seed);
        const oldUser = await getOrAddUser(id);
        const newData = { ...oldUser };
        newData.hash = seed || (0, zoo_ids_1.generateId)(null, {
            caseStyle: 'lowercase',
            delimiter: '-',
        });
        console.log(newData.hash);
        newData.oldHashes.unshift(oldUser.hash);
        newData.oldHashes.splice(5);
        await updateUser(id, newData); // usersCollection.set(id, newData, {});
        res.json(newData);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.post('/api/remove-user', async (req, res) => {
    try {
        const { id } = req.body;
        await removeUser(id);
        res.json({ status: 'ok' });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
async function getOrAddUser(userId) {
    const id = (0, gen_id_1.genID)(userId);
    let usersRaw = await kv_1.kv.get(_USER_PREFIX);
    console.log(usersRaw);
    console.log(typeof usersRaw);
    if (!usersRaw) {
        console.log('test');
        usersRaw = [];
    }
    let users = usersRaw;
    console.log(users);
    let user = users.find(user => user.id === id);
    if (!user) {
        let hash = (0, zoo_ids_1.generateId)(null, {
            caseStyle: 'lowercase',
            delimiter: '-',
        });
        let userObject = { id, hash, oldHashes: [] };
        users.push(userObject);
        await kv_1.kv.set(_USER_PREFIX, users);
        return userObject;
    }
    console.log(admins);
    if (admins.includes(user.id)) {
        user.isAdmin = true;
    }
    return user;
}
async function removeUser(userId) {
    const id = (0, gen_id_1.genID)(userId);
    let usersRaw = await kv_1.kv.get(_USER_PREFIX);
    const userIndex = usersRaw.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        usersRaw.splice(userIndex, 1);
        await kv_1.kv.set(_USER_PREFIX, usersRaw);
        return;
    }
    return;
}
async function listUsers() {
    return await kv_1.kv.get(_USER_PREFIX);
}
async function resetHash() {
}
async function updateUser(userId, updatedUser) {
    const id = (0, gen_id_1.genID)(userId);
    let usersRaw = await kv_1.kv.get(_USER_PREFIX);
    const userIndex = usersRaw.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        usersRaw[userIndex] = updatedUser;
        await kv_1.kv.set(_USER_PREFIX, usersRaw);
        return;
    }
    return;
}
//# sourceMappingURL=identity.js.map