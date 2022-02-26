const numSeats = 25;
var initialTravellers = Array(numSeats);

for (i = 0; i < numSeats; i++) {
  initialTravellers[i] = ["free", i + 1, '-', '-', '-'];
}

class DisplayTraveller extends React.Component {
  render() {
    const travellers = this.props.travellers;
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Seat Number"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone Number"), /*#__PURE__*/React.createElement("th", null, "Timestamp"))), /*#__PURE__*/React.createElement("tbody", null, travellers.slice(0, travellers.length).map((item, index) => {
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, item[1]), /*#__PURE__*/React.createElement("td", null, item[2]), /*#__PURE__*/React.createElement("td", null, item[3]), /*#__PURE__*/React.createElement("td", null, item[4]));
    })));
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
      name: form.name.value,
      phone: form.phone.value
    };
    this.props.addTraveller(traveller);
    form.seat.value = "";
    form.name.value = "";
    form.phone.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "travellerAdd",
      onSubmit: this.handleAdd
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "seat",
      placeholder: "Seat Number"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name",
      placeholder: "Name"
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "phone",
      placeholder: "Phone Number"
    }), /*#__PURE__*/React.createElement("button", null, "Add"));
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
    return /*#__PURE__*/React.createElement("form", {
      name: "travellerDelete",
      onSubmit: this.handleDelete
    }, /*#__PURE__*/React.createElement("input", {
      type: "number",
      name: "seat",
      placeholder: "Seat Number"
    }), /*#__PURE__*/React.createElement("button", null, "Delete"));
  }

}

class DisplayFreeSeats extends React.Component {
  constructor() {
    super();
    this.getColor = this.getColor.bind(this);
  }

  getColor(seat) {
    const travellers = this.props.travellers;

    if (travellers[seat - 1][0] == "taken") {
      return {
        backgroundColor: 'red'
      };
    } else {
      return {
        backgroundColor: 'grey'
      };
    }
  }

  render() {
    const travellers = this.props.travellers;
    var free = 0;

    for (i = 0; i < travellers.length; i++) if (travellers[i][0] == "free") {
      free++;
    }

    return (
      /*#__PURE__*/
      // <div>{free} seats remaining.</div>
      React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, travellers.slice(0, 5).map((item, index) => {
        return /*#__PURE__*/React.createElement("td", {
          style: this.getColor(item[1])
        }, item[1]);
      })), /*#__PURE__*/React.createElement("tr", null, travellers.slice(5, 10).map((item, index) => {
        return /*#__PURE__*/React.createElement("td", {
          style: this.getColor(item[1])
        }, item[1]);
      })), /*#__PURE__*/React.createElement("tr", null, travellers.slice(10, 15).map((item, index) => {
        return /*#__PURE__*/React.createElement("td", {
          style: this.getColor(item[1])
        }, item[1]);
      })), /*#__PURE__*/React.createElement("tr", null, travellers.slice(15, 20).map((item, index) => {
        return /*#__PURE__*/React.createElement("td", {
          style: this.getColor(item[1])
        }, item[1]);
      })), /*#__PURE__*/React.createElement("tr", null, travellers.slice(20, 25).map((item, index) => {
        return /*#__PURE__*/React.createElement("td", {
          style: this.getColor(item[1])
        }, item[1]);
      }))))
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
    return /*#__PURE__*/React.createElement("table", {
      className: "bordered-table"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.showDisplayTraveller
    }, "Display All Booking Details")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.showAddTraveller
    }, "New Booking")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.showDeleteTraveller
    }, "Delete Booking")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.showDisplayFreeSeats
    }, "Display Seating Plan")))));
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
      showDisplayFreeSeats: false
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
      this.setState({
        travellers: initialTravellers
      });
    }, 100);
  }

  addTraveller(traveller) {
    traveller.timestamp = new Date();
    const newTravellerList = this.state.travellers.slice();

    if (traveller.seat < 1 || traveller.seat > numSeats) {
      alert("Please enter valid seat number");
    } else if (traveller.name == 0) {
      alert("Please enter a name");
    } else if (traveller.phone == 0) {
      alert("Please enter a phone number");
    } else if (traveller.phone < 0) {
      alert("Please enter a valid phone number");
    } else if (newTravellerList[traveller.seat - 1][0] == "taken") {
      alert("Seat is currently taken, please enter another seat number");
    } else {
      newTravellerList[traveller.seat - 1] = ["taken", traveller.seat, traveller.name, traveller.phone, traveller.timestamp.toLocaleString()];
      this.setState({
        travellers: newTravellerList
      });
    }
  }

  deleteTraveller(seat) {
    const newTravellerList = this.state.travellers.slice();

    if (seat < 1 || seat > numSeats) {
      alert("Please enter valid seat number");
    } else if (newTravellerList[seat - 1][0] == "free") {
      alert("Seat is currently free, please enter another seat number");
    } else {
      newTravellerList[seat - 1] = ["free", seat, '-', '-', '-'];
      this.setState({
        travellers: newTravellerList
      });
    }
  }

  showComponent(comp) {
    this.setState({
      showDisplayTraveller: false,
      showAddTraveller: false,
      showDeleteTraveller: false,
      showDisplayFreeSeats: false
    });

    if (comp == "DisplayTraveller") {
      this.setState({
        showDisplayTraveller: true
      });
    } else if (comp == "AddTraveller") {
      this.setState({
        showAddTraveller: true
      });
    } else if (comp == "DeleteTraveller") {
      this.setState({
        showDeleteTraveller: true
      });
    } else if (comp == "DisplayFreeSeats") {
      this.setState({
        showDisplayFreeSeats: true
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "SHIRS - Singapore High-Speed Intercontinental Railway System"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(NavBar, {
      showComponent: this.showComponent
    }), /*#__PURE__*/React.createElement("hr", null), this.state.showDisplayTraveller && /*#__PURE__*/React.createElement("h2", null, "All Booking Details"), this.state.showDisplayTraveller && /*#__PURE__*/React.createElement(DisplayTraveller, {
      travellers: this.state.travellers
    }), this.state.showAddTraveller && /*#__PURE__*/React.createElement("h2", null, "New Booking"), this.state.showAddTraveller && /*#__PURE__*/React.createElement(AddTraveller, {
      addTraveller: this.addTraveller
    }), this.state.showDeleteTraveller && /*#__PURE__*/React.createElement("h2", null, "Delete Booking"), this.state.showDeleteTraveller && /*#__PURE__*/React.createElement(DeleteTraveller, {
      deleteTraveller: this.deleteTraveller
    }), this.state.showDisplayFreeSeats && /*#__PURE__*/React.createElement("h2", null, "Seating Plan"), this.state.showDisplayFreeSeats && /*#__PURE__*/React.createElement(DisplayFreeSeats, {
      travellers: this.state.travellers
    }));
  }

}

const element = /*#__PURE__*/React.createElement(DisplayHomepage, null);
ReactDOM.render(element, document.getElementById('contents'));