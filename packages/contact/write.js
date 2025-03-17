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

const {Client} = require('pg')

async function main(args) {
    const client = new Client({connectionString: args.POSTGRES_URL});

    // Connect to database server
    await client.connect();

    const {name, email, phone, message} = args;

    try {
        let res = await client.query(
            'INSERT INTO demo.contacts(name,email,phone,message) VALUES($1,$2,$3,$4)',
            [name, email, phone, message]
        );
        console.log(res);
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        client.end();
    }

    return {
        body: args.body,
        name,
        email,
        phone,
        message
    };
}
