// write.js

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
