"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("./app");
const dynamodb_1 = tslib_1.__importDefault(require("@cyclic.sh/dynamodb"));
const db = (0, dynamodb_1.default)("modern-lime-goslingCyclicDB");
// @ts-ignore
const zoo_ids_1 = require("zoo-ids");
const gen_id_1 = require("../src/app/main/helpers/gen-id");
const admins = ['Paweł Wojtkiewicz', 'Jakub Wierzbicki test'].map(id => (0, gen_id_1.genID)(id));
const usersCollection = db.collection('users');
app_1.app.get('/api/identity/:id', async (req, res) => {
    try {
        const id = (0, gen_id_1.genID)(req.params.id);
        let user = await usersCollection.get(id);
        if (!user) {
            let hash = (0, zoo_ids_1.generateId)(null, {
                caseStyle: 'lowercase',
                delimiter: '-',
            });
            let userObject = { id, hash, oldHashes: [] };
            if (admins.includes(id)) {
                userObject.isAdmin = true;
            }
            await usersCollection.set(id, userObject, {});
            user = await usersCollection.get(id);
        }
        res.json(user);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.get('/api/list-users', async (req, res) => {
    try {
        let userList = (await usersCollection.list()).results;
        userList = await Promise.all(userList.map(async ({ key }) => (await usersCollection.get(key)).props));
        res.json(userList);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app_1.app.post('/api/reset-hash', async (req, res) => {
    try {
        const { id } = req.body;
        const user = await usersCollection.get(id);
        const oldHash = user.props.hash;
        user.props.hash = (0, zoo_ids_1.generateId)(null, {
            caseStyle: 'lowercase',
            delimiter: '-',
        });
        user.props.oldHashes.push(oldHash);
        await usersCollection.set(id, user, {});
        res.json(await usersCollection.get(id));
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
//# sourceMappingURL=identity.js.map