const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost/bookingsys';

async function testWithAsync() {
  console.log('\n--- Initializing MongoDB Database ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const bookings = db.collection('bookings');
    const blacklist = db.collection('blacklist');

    // Clear existing data
    bookings.deleteMany({});
    blacklist.deleteMany({});

    // Initialize database
    const bookingsDB = [
      {seat: 1, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 2, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 3, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 4, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 5, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 6, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 7, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 8, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 9, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 10, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 11, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 12, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 13, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 14, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 15, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 16, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 17, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 18, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 19, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 20, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 21, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 22, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 23, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 24, status: 'Free', name: '-', phone: '-', timestamp: '-', },
      {seat: 25, status: 'Free', name: '-', phone: '-', timestamp: '-', },
    ];

    const blacklistDB = [
      {phone: '666', name: 'Lucifer', },
      {phone: '9112001', name: 'Osama Bin Laden', },
    ];
    
    await bookings.insertMany(bookingsDB);
    await blacklist.insertMany(blacklistDB);

    const count1 = await bookings.countDocuments();
    const count2 = await blacklist.countDocuments();
    
    console.log('Initialized', count1, 'seats in bookings database.');
    console.log('Initialized', count2, 'persons in blacklist database.');

    // Test add data
    const testBooking = ({seat: 'Test', status: 'Test', name: 'Test', phone: 'Test', timestamp: 'Test', });
    const testBlacklist = ({name: 'Test', phone: 'Test', });
    await bookings.insertOne(testBooking);
    await blacklist.insertOne(testBlacklist);
    console.log('Test add data - complete');

    // Test read data
    const resultBooking = await bookings.find({seat: 'Test'}).toArray();
    const resultBlacklist = await blacklist.find({name: 'Test'}).toArray();
    // console.log('Result of find:\n', resultBooking);
    // console.log('Result of find:\n', resultBlacklist);
    console.log('Test read data - complete');

    // Test delete data
    await bookings.deleteOne({seat: 'Test'});
    await blacklist.deleteOne({name: 'Test'});
    console.log('Test delete data - complete');

  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithAsync();
