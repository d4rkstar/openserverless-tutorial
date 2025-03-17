// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

//--kind nodejs:default
//--param POSTGRES_URL $POSTGRES_URL

const { Client } = require('pg')

async function main(args) {
    console.log('Starting create-table action')
    const client = new Client({ connectionString: args.POSTGRES_URL });

    const createSchema = `CREATE SCHEMA IF NOT EXISTS demo;`

    const createTable = `
    CREATE TABLE IF NOT EXISTS demo.contacts (
        id serial PRIMARY KEY,
        name varchar(50),
        email varchar(50),
        phone varchar(50),
        message varchar(300)
    );
    `

    try {
        console.log(`Connecting to ${args.POSTGRES_URL}`);
        await client.connect();
        console.log('Connected to database');
        await client.query(createSchema);
        console.log('Schema demo created');
        await client.query(createTable);
        console.log('Contact table created');
        return { result: 'OK' };
    } catch (e) {
        if (e instanceof AggregateError) {
            for (const err of e.errors) {
                console.error('[ERROR] - ', err.message || err);
            }
        } else if (e instanceof Error) {
            console.error('[ERROR]  - ', e.message);
        } else {
            console.error('[ERROR] - ', e);
        }
        return { result: 'ERROR' };
    } finally {
        console.log('Closing connection');
        if (client) {
            await client.end();
        }
    }
}
