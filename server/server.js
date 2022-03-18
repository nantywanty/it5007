const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/bookingsys';
let db;
let aboutMessage = "SHIRS Booking System API v1.0";

// Resolvers
const resolvers = {
  Query: {
    about: () => aboutMessage,
    bookingDetails,
    blacklistDetails,
    bookingAddValidate,
    bookingDeleteValidate,
    blacklistAddValidate,
    blacklistDeleteValidate,
    checkBlacklist,
  },
  Mutation: {
    setAboutMessage,
    bookingAdd,
    bookingDelete,
    blacklistAdd,
    blacklistDelete,
  },
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

// Query functions
async function bookingDetails() {
  const bookings = await db.collection('bookings').find({}).toArray();
  return bookings;
}

async function blacklistDetails() {
  const blacklist = await db.collection('blacklist').find({}).toArray();
  return blacklist;
}

// Input validation functions
async function bookingAddValidate(booking) {
  const errors = [];
  const current = await db.collection('bookings').findOne({seat: booking.seat});
  
  if (booking.seat < 1 || booking.seat > 25) {
    errors.push('Please enter a valid seat from 1 to 25.');
  } else if (current.status == 'Taken') {
      errors.push('Seat is taken, please select another seat.');
  }
  if (booking.name == 0) {
    errors.push('Please enter a name.');
  }
  if (booking.phone == 0 || booking.phone < 0) {
    errors.push('Please enter a valid phone number.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function checkBlacklist(person) {
  const errors = [];
  const result1 = await db.collection('blacklist').findOne({name: person.name});
  const result2 = await db.collection('blacklist').findOne({phone: person.phone});

  if (result1) {
    errors.push('Person is on black list.');
  } 
  if (result2) {
    errors.push('Phone number is on black list.');
  } 
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function bookingDeleteValidate(booking) {
  const errors = [];
  const current = await db.collection('bookings').findOne({seat: booking.seat});

  if (booking.seat < 1 || booking.seat > 25) {
    errors.push('Please enter a valid seat from 1 to 25.');
  } else if (current.status == 'Free') {
    errors.push('Seat is free, please select another seat to delete.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function blacklistAddValidate(person) {
  const errors = [];
  if (person.name == 0) {
    errors.push('Please enter a name.');
  }
  if (person.phone == 0 || person.phone < 0) {
    errors.push('Please enter a valid phone number.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function blacklistDeleteValidate(person) {
  const errors = [];
  const result = await db.collection('blacklist').findOne({name: person.name});
  if (person.name == 0) {
    errors.push('Please enter a name.');
  } else if (!result) {
    errors.push('Name not found in black list.');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

// Mutation functions
async function bookingAdd(_, { booking }) {
  await bookingAddValidate(booking);
  const person = {name: booking.name, phone: booking.phone};
  await checkBlacklist(person);
  booking.status = 'Taken';
  booking.timestamp = new Date();

  const result = await db.collection('bookings').replaceOne(
    { seat: booking.seat },
    booking
  );
  return;
}

async function bookingDelete(_, { booking }) {
  await bookingDeleteValidate(booking);
  booking.status = 'Free';
  booking.name = '-';
  booking.phone = '-';
  booking.timestamp = '-';

  const result = await db.collection('bookings').replaceOne(
    { seat: booking.seat },
    booking
  );
  return;
}

async function blacklistAdd(_, { person }) {
  await blacklistAddValidate(person);

  const result = await db.collection('blacklist').insertOne(person);
  return;
}

async function blacklistDelete(_, { person }) {
  await blacklistDeleteValidate(person);

  const result = await db.collection('blacklist').deleteMany({name: person.name});
  return;
}

// Other functions
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
