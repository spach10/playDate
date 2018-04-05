'use strict';

function Users(dbExec) {
    const users = {};

    users.create = async (username, password, firstname, lastname) => {
        return dbExec(async collection => {
            const result = await collection.insertOne({ username, password, firstname, lastname });
            return result.insertedCount > 0;
        });
    }

    users.authenticate = async (username, password) => {
        return dbExec(async collection => {
            const results = await collection.find({ username, password }).toArray();
            return results.length > 0;
        });
    };

    users.exists = async (username) => {
        return dbExec(async collection => {
            const results = await collection.find({ username }).toArray();
            return results.length > 0;
        });
    }

    users.getUsers = async () => {
        return dbExec(async collection => {
            return await collection.find().toArray();
        });
    }

    return users;
}

module.exports = Users;