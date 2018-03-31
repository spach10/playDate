'use strict';

function Users(dbExec) {
    const users = {};

    users.create = async (username, password, firstname, lastname) => {
        return dbExec(async collection => {
            const result = await collection.insertOne({ username, password, firstname, lastname });
            return result.insertedCount > 0;
        });
    }

    users.exists = async (username) => {
        return dbExec(async collection => {
            const results = await collection.find({ username }).toArray();
            return results.length > 0;
        });
    }

    return users;
}

module.exports = Users;