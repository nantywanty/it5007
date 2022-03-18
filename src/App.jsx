const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables })
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

function BookingRow(props) {
  const booking = props.booking;
  return (
    <tr>
      <td>{booking.seat}</td>
      <td>{booking.status}</td>
      <td>{booking.name}</td>
      <td>{booking.phone}</td>
      <td>{booking.timestamp.toLocaleString()}</td>
    </tr>
  );
}

function BookingTable(props) {
  const bookingRows = props.bookings.map(booking =>
    <BookingRow key={booking.seat} booking={booking} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Seat Number</th>
          <th>Status</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {bookingRows}
      </tbody>
    </table>
  );
}

class AddBooking extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const form = document.forms.bookingAdd;
    const booking = {
      seat: parseInt(form.seat.value),
      name: form.name.value, 
      phone: form.phone.value,
    }
    this.props.addBooking(booking);
    form.seat.value = ""; form.name.value = ""; form.phone.value = "";
  }

  render() {
    return (
      <form name="bookingAdd" onSubmit={this.handleAdd}>
        <input type="number" name="seat" placeholder="Seat Number" />
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="phone" placeholder="Phone Number" />
        <button>Add</button>
      </form>
    );
  }
}

class DeleteBooking extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    const form = document.forms.bookingDelete;
    const booking = {
      seat: parseInt(form.seat.value),
    }
    this.props.deleteBooking(booking);
    form.seat.value = "";
  }

  render() {
    return (
      <form name="bookingDelete" onSubmit={this.handleDelete}>
        <input type="number" name="seat" placeholder="Seat Number" />
        <button>Delete</button>
      </form>
    );
  }
}

function BlacklistRow(props) {
  const person = props.person;
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.phone}</td>
    </tr>
  );
}

function BlacklistTable(props) {
  const blacklistRows = props.blacklist.map(person =>
    <BlacklistRow key={person.name} person={person} />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {blacklistRows}
      </tbody>
    </table>
  );
}

class AddBlacklist extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const form = document.forms.blacklistAdd;
    const person = {
      name: form.name.value, 
      phone: form.phone.value,
    }
    this.props.addBlacklist(person);
    form.name.value = ""; form.phone.value = "";
  }

  render() {
    return (
      <form name="blacklistAdd" onSubmit={this.handleAdd}>
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="phone" placeholder="Phone Number" />
        <button>Add</button>
      </form>
    );
  }
}

class DeleteBlacklist extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    const form = document.forms.blacklistDelete;
    const person = {
      name: form.name.value, 
    }
    this.props.deleteBlacklist(person);
    form.name.value = "";
  }

  render() {
    return (
      <form name="blacklistDelete" onSubmit={this.handleDelete}>
        <input type="text" name="name" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class NavBar extends React.Component {
  constructor() {
    super();
    this.showBooking = this.showBooking.bind(this);
    this.showBlacklist = this.showBlacklist.bind(this);
  }

  showBooking(e) {
    e.preventDefault();
    this.props.showComponent("Booking");
  }

  showBlacklist(e) {
    e.preventDefault();
    this.props.showComponent("Blacklist");
  }

  render() {
    return (
      <table className="bordered-table">
      <tbody>
        <tr>
          <td><button onClick={this.showBooking}>Bookings</button></td>
          <td><button onClick={this.showBlacklist}>Blacklist</button></td>
        </tr>
      </tbody>
    </table>
    );
  }
}

class DisplayHomepage extends React.Component {
  constructor() {
    super();
    this.state = { 
      bookings: [],
      blacklist: [],
      showBooking: true,
      showBlacklist: false,
    };
    this.addBooking = this.addBooking.bind(this);
    this.deleteBooking = this.deleteBooking.bind(this);
    this.addBlacklist = this.addBlacklist.bind(this);
    this.deleteBlacklist = this.deleteBlacklist.bind(this);
    this.showComponent = this.showComponent.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query1 = `query {
      bookingDetails {
        seat status name phone timestamp
      }
    }`;

    const data1 = await graphQLFetch(query1);
    if (data1) {
      this.setState({ bookings: data1.bookingDetails });
    }

    const query2 = `query {
      blacklistDetails {
        name phone
      }
    }`;

    const data2 = await graphQLFetch(query2);
    if (data2) {
      this.setState({ blacklist: data2.blacklistDetails });
    }
  
  }

  async addBooking(booking) {
    const query = `mutation bookingAdd($booking: BookingInputs!) {
      bookingAdd(booking: $booking) { 
        seat 
      }
    }`;

    await graphQLFetch(query, { booking });
    this.loadData();
  }

  async deleteBooking(booking) {
    const query = `mutation bookingDelete($booking: BookingInputs!) {
      bookingDelete(booking: $booking) { 
        seat 
      }
    }`;

    await graphQLFetch(query, { booking });
    this.loadData();
    
  }

  async addBlacklist(person) {
    const query = `mutation blacklistAdd($person: PersonInputs!) {
      blacklistAdd(person: $person) { 
        name 
      }
    }`;

    await graphQLFetch(query, { person });
    this.loadData();
  }

  async deleteBlacklist(person) {
    const query = `mutation blacklistDelete($person: PersonInputs!) {
      blacklistDelete(person: $person) { 
        name 
      }
    }`;

    await graphQLFetch(query, { person });
    this.loadData();
  }

  showComponent(comp) {
    this.setState({
      showBooking: false,
      showBlacklist: false,
    }); 
    if(comp == "Booking") {
      this.setState({ showBooking: true }); 
    }
    else if(comp == "Blacklist") {
      this.setState({ showBlacklist: true }); 
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>SHIRS - Singapore High-Speed Intercontinental Railway System</h1>
        <hr />
        <NavBar showComponent={this.showComponent} />
        <hr />
        {this.state.showBooking && <h2>Current Bookings</h2>}
        {this.state.showBooking && <BookingTable bookings ={this.state.bookings} />}
        {this.state.showBooking && <h2>New Booking</h2>}
        {this.state.showBooking && <AddBooking addBooking={this.addBooking} />}
        {this.state.showBooking && <h2>Delete Booking</h2>}
        {this.state.showBooking && <DeleteBooking deleteBooking={this.deleteBooking} />}
        {this.state.showBlacklist && <h2>Current Blacklist</h2>}
        {this.state.showBlacklist && <BlacklistTable blacklist={this.state.blacklist} />}
        {this.state.showBlacklist && <h2>Add to Blacklist</h2>}
        {this.state.showBlacklist && <AddBlacklist addBlacklist={this.addBlacklist} />}
        {this.state.showBlacklist && <h2>Delete from Blacklist</h2>}
        {this.state.showBlacklist && <DeleteBlacklist deleteBlacklist={this.deleteBlacklist} />}
      </React.Fragment>
    );
  }
}

const element = <DisplayHomepage />;

ReactDOM.render(element, document.getElementById('contents'));