const mongo = require('mongodb');

const mongoClient = new mongo.MongoClient(`mongodb://localhost:27017`, {
  auth: {
    username: 'admin',
    password: 'p@ssw0rd',
  },
});

mongoClient.connect().then(async (client) => {
  await client.db().dropDatabase({ dbName: 'workers' });

  const db = client.db('workers');

  console.log(`Mongodb Repository DB: workers`);

  await db.createCollection('roles').catch(() => console.log('roles Exist'));
  await db.createCollection('guilds').catch(() => console.log('guilds Exist'));
  await db.createCollection('projects').catch(() => console.log('proj Exist'));
  await db.createCollection('users').catch(() => console.log('users Exist'));

  await db
    .collection('roles')
    .createIndex({ description: 1 }, { unique: true });
  await db
    .collection('guilds')
    .createIndex({ description: 1 }, { unique: true });
  await db.collection('users').createIndex({ email: 1 }, { unique: true });

  const rolesInsert = await db
    .collection('roles')
    .insertMany([
      { description: 'admin' },
      { description: 'user' },
      { description: 'business' },
      { description: 'worker' },
    ]);

  await db
    .collection('guilds')
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
    ]);

  if (rolesInsert)
    await db.collection('users').insertOne({
      rolId: rolesInsert.insertedIds[0],
      name: 'admin',
      surname: 'admin',
      password: 'password',
      email: 'admin@gmail.com',
      rank: 0,
      address: {
        country: 'country',
        state: 'state',
        city: 'city',
        street: 'street',
        number: 0,
        zip_code: 'zip_code',
        floor: 'floor',
        tower: 'tower',
        department: 'department',
        coordinates: {
          lat: 'lat',
          lon: 'lon',
        },
      },
    });

  process.exit();
});
