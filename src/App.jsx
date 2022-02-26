const numSeats = 25;

var initialTravellers = Array(numSeats);
for (i=0;i<numSeats;i++) {
  initialTravellers[i] = ["free",i+1,'-','-','-'];
}

class DisplayTraveller extends React.Component {
  render() {
    const travellers = this.props.travellers

    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Seat Number</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {travellers.slice(0, travellers.length).map((item, index) => {
              return (
                <tr>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  <td>{item[4]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

class AddTraveller extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    const form = document.forms.travellerAdd;
    const traveller = {
      seat: parseInt(form.seat.value), 
      name: form.name.value, phone: form.phone.value,
    }
    this.props.addTraveller(traveller);
    form.seat.value = ""; form.name.value = ""; form.phone.value = "";
  }

  render() {
    return (
      <form name="travellerAdd" onSubmit={this.handleAdd}>
        <input type="number" name="seat" placeholder="Seat Number" />
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="phone" placeholder="Phone Number" />
        <button>Add</button>
      </form>
    );
  }
}

class DeleteTraveller extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    const form = document.forms.travellerDelete;
    this.props.deleteTraveller(form.seat.value);
    form.seat.value = "";
  }

  render() {
    return (
      <form name="travellerDelete" onSubmit={this.handleDelete}>
        <input type="number" name="seat" placeholder="Seat Number" />
        <button>Delete</button>
      </form>
    );
  }
}

class DisplayFreeSeats extends React.Component {
  constructor() {
    super();
    this.getColor = this.getColor.bind(this);
  }
  
  getColor(seat) {
    const travellers = this.props.travellers
    if (travellers[seat-1][0] == "taken"){
      return {backgroundColor:'red'};
    } else {
      return {backgroundColor:'grey'};
    }
  }
  
  render() {
    const travellers = this.props.travellers
    var free = 0;

    for (i=0;i<travellers.length;i++)
      if (travellers[i][0] == "free") {
        free++;
      }

    return (
      // <div>{free} seats remaining.</div>
      <table className="bordered-table">
        <thead></thead>
        <tbody>
            <tr>
            {travellers.slice(0, 5).map((item, index) => {
              return (
                  <td style= {this.getColor(item[1])}>{item[1]}</td>
              );})}
            </tr>
            <tr>
            {travellers.slice(5, 10).map((item, index) => {
              return (
                  <td style= {this.getColor(item[1])}>{item[1]}</td>
              );})}
            </tr>
            <tr>
            {travellers.slice(10, 15).map((item, index) => {
              return (
                  <td style= {this.getColor(item[1])}>{item[1]}</td>
              );})}
            </tr>
            <tr>
            {travellers.slice(15, 20).map((item, index) => {
              return (
                  <td style= {this.getColor(item[1])}>{item[1]}</td>
              );})}
            </tr>
            <tr>
            {travellers.slice(20, 25).map((item, index) => {
              return (
                  <td style= {this.getColor(item[1])}>{item[1]}</td>
              );})}
            </tr>
        </tbody>
      </table>
    );
  }
}

class NavBar extends React.Component {
  constructor() {
    super();
    this.showDisplayTraveller = this.showDisplayTraveller.bind(this);
    this.showAddTraveller = this.showAddTraveller.bind(this);
    this.showDeleteTraveller = this.showDeleteTraveller.bind(this);
    this.showDisplayFreeSeats = this.showDisplayFreeSeats.bind(this);
  }

  showDisplayTraveller(e) {
    e.preventDefault();
    this.props.showComponent("DisplayTraveller");
  }

  showAddTraveller(e) {
    e.preventDefault();
    this.props.showComponent("AddTraveller");
  }

  showDeleteTraveller(e) {
    e.preventDefault();
    this.props.showComponent("DeleteTraveller");
  }

  showDisplayFreeSeats(e) {
    e.preventDefault();
    this.props.showComponent("DisplayFreeSeats");
  }

  render() {
    return (
      <table className="bordered-table">
      <tbody>
        <tr>
          <td><button onClick={this.showDisplayTraveller}>Display All Booking Details</button></td>
          <td><button onClick={this.showAddTraveller}>New Booking</button></td>
          <td><button onClick={this.showDeleteTraveller}>Delete Booking</button></td>
          <td><button onClick={this.showDisplayFreeSeats}>Display Seating Plan</button></td>
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
      travellers: [],
      showDisplayTraveller: false,
      showAddTraveller: false,
      showDeleteTraveller: false,
      showDisplayFreeSeats: false,
    };
    this.addTraveller = this.addTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.showComponent = this.showComponent.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 100);
  }

  addTraveller(traveller) {
    traveller.timestamp = new Date();
    const newTravellerList = this.state.travellers.slice();

    if (traveller.seat < 1 || traveller.seat > numSeats) {
      alert("Please enter valid seat number");
    } else if (traveller.name == 0){
      alert("Please enter a name");
    } else if (traveller.phone == 0){
      alert("Please enter a phone number");
    } else if (traveller.phone < 0){
      alert("Please enter a valid phone number");
    } else if (newTravellerList[traveller.seat - 1][0] == "taken"){
      alert("Seat is currently taken, please enter another seat number");
    } else {
      newTravellerList[traveller.seat - 1] = ["taken", traveller.seat, traveller.name, traveller.phone, traveller.timestamp.toLocaleString()];
      this.setState({ travellers: newTravellerList });
    }
  }

  deleteTraveller(seat) {
    const newTravellerList = this.state.travellers.slice();
    if (seat < 1 || seat > numSeats) {
      alert("Please enter valid seat number")
    } else if (newTravellerList[seat - 1][0] == "free"){
      alert("Seat is currently free, please enter another seat number")
    } else {
      newTravellerList[seat - 1] = ["free", seat, '-', '-', '-'];
      this.setState({ travellers: newTravellerList });
    }
  }

  showComponent(comp) {
    this.setState({
      showDisplayTraveller: false,
      showAddTraveller: false,
      showDeleteTraveller: false,
      showDisplayFreeSeats: false,
    }); 
    if(comp == "DisplayTraveller") {
      this.setState({ showDisplayTraveller: true }); 
    }
    else if(comp == "AddTraveller") {
      this.setState({ showAddTraveller: true }); 
    }
    else if(comp == "DeleteTraveller") {
      this.setState({ showDeleteTraveller: true }); 
    }
    else if(comp == "DisplayFreeSeats") {
      this.setState({ showDisplayFreeSeats: true }); 
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>SHIRS - Singapore High-Speed Intercontinental Railway System</h1>
        <hr />
        <NavBar showComponent={this.showComponent} />
        <hr />
        {this.state.showDisplayTraveller && <h2>All Booking Details</h2>}
        {this.state.showDisplayTraveller && <DisplayTraveller travellers={this.state.travellers} />}
        {this.state.showAddTraveller && <h2>New Booking</h2>}
        {this.state.showAddTraveller && <AddTraveller addTraveller={this.addTraveller} />}
        {this.state.showDeleteTraveller && <h2>Delete Booking</h2>}
        {this.state.showDeleteTraveller && <DeleteTraveller deleteTraveller={this.deleteTraveller} />}
        {this.state.showDisplayFreeSeats && <h2>Seating Plan</h2>}
        {this.state.showDisplayFreeSeats && <DisplayFreeSeats travellers={this.state.travellers}/>}
      </React.Fragment>
    );
  }
}

const element = <DisplayHomepage />;

ReactDOM.render(element, document.getElementById('contents'));