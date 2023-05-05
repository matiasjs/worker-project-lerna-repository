const mongo = require('mongodb');

const mongoClient = new mongo.MongoClient(`mongodb://localhost:27017`, {
  auth: {
    username: 'admin',
    password: 'p@ssw0rd',
  },
});

mongoClient.connect().then(async (client) => {
  const db = client.db('workers');

  console.log(`Mongodb Repository DB: workers`);

  await db.createCollection('roles').catch(() => console.log('roles Exist'));
  await db.createCollection('guilds').catch(() => console.log('guilds Exist'));
  await db.createCollection('projects').catch(() => console.log('proj Exist'));
  await db.createCollection('users').catch(() => console.log('users Exist'));

  db.collection('roles').createIndex({ description: 1 }, { unique: true });
  db.collection('guilds').createIndex({ description: 1 }, { unique: true });
  db.collection('users').createIndex({ email: 1 }, { unique: true });

  const rolesInsert = await db
    .collection('roles')
    .insertMany([
      { description: 'admin' },
      { description: 'user' },
      { description: 'business' },
      { description: 'worker' },
    ])
    .catch(() => console.log('roles filled'));

  db.collection('guilds')
    .insertMany([
      { description: 'carpenter' },
      { description: 'electrician' },
      { description: 'builder' },
      { description: 'glazier' },
      { description: 'hvac-technician' },
      { description: 'ironworker' },
      { description: 'painter' },
      { description: 'landscape' },
      { description: 'plumber' },
      { description: 'gasman' },
      { description: 'assembler' },
      { description: 'cleaning-person' },
      { description: 'decorator' },
      { description: 'curtain-installer' },
    ])
    .catch(() => console.log('guilds filled'));

  if (rolesInsert)
    db.collection('users')
      .insertOne({
        rolId: rolesInsert.insertedIds[0],
        name: 'admin',
        surname: 'admin',
        password: 'password',
        email: 'admin@gmail.com',
        rank: 0,
      })
      .catch(() => console.log('user filled'));

  console.log('users filled');

  process.exit();
});
