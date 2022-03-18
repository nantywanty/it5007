"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            variables = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
            _context6.prev = 1;
            _context6.next = 4;
            return fetch('/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context6.sent;
            _context6.next = 7;
            return response.text();

          case 7:
            body = _context6.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context6.abrupt("return", result.data);

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](1);
            alert("Error in sending data to server: ".concat(_context6.t0.message));

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

function BookingRow(props) {
  var booking = props.booking;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, booking.seat), /*#__PURE__*/React.createElement("td", null, booking.status), /*#__PURE__*/React.createElement("td", null, booking.name), /*#__PURE__*/React.createElement("td", null, booking.phone), /*#__PURE__*/React.createElement("td", null, booking.timestamp.toLocaleString()));
}

function BookingTable(props) {
  var bookingRows = props.bookings.map(function (booking) {
    return /*#__PURE__*/React.createElement(BookingRow, {
      key: booking.seat,
      booking: booking
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Seat Number"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone Number"), /*#__PURE__*/React.createElement("th", null, "Timestamp"))), /*#__PURE__*/React.createElement("tbody", null, bookingRows));
}

var AddBooking = /*#__PURE__*/function (_React$Component) {
  _inherits(AddBooking, _React$Component);

  var _super = _createSuper(AddBooking);

  function AddBooking() {
    var _this;

    _classCallCheck(this, AddBooking);

    _this = _super.call(this);
    _this.handleAdd = _this.handleAdd.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddBooking, [{
    key: "handleAdd",
    value: function handleAdd(e) {
      e.preventDefault();
      var form = document.forms.bookingAdd;
      var booking = {
        seat: parseInt(form.seat.value),
        name: form.name.value,
        phone: form.phone.value
      };
      this.props.addBooking(booking);
      form.seat.value = "";
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "bookingAdd",
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
  }]);

  return AddBooking;
}(React.Component);

var DeleteBooking = /*#__PURE__*/function (_React$Component2) {
  _inherits(DeleteBooking, _React$Component2);

  var _super2 = _createSuper(DeleteBooking);

  function DeleteBooking() {
    var _this2;

    _classCallCheck(this, DeleteBooking);

    _this2 = _super2.call(this);
    _this2.handleDelete = _this2.handleDelete.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(DeleteBooking, [{
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var form = document.forms.bookingDelete;
      var booking = {
        seat: parseInt(form.seat.value)
      };
      this.props.deleteBooking(booking);
      form.seat.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "bookingDelete",
        onSubmit: this.handleDelete
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "seat",
        placeholder: "Seat Number"
      }), /*#__PURE__*/React.createElement("button", null, "Delete"));
    }
  }]);

  return DeleteBooking;
}(React.Component);

function BlacklistRow(props) {
  var person = props.person;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, person.name), /*#__PURE__*/React.createElement("td", null, person.phone));
}

function BlacklistTable(props) {
  var blacklistRows = props.blacklist.map(function (person) {
    return /*#__PURE__*/React.createElement(BlacklistRow, {
      key: person.name,
      person: person
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone Number"))), /*#__PURE__*/React.createElement("tbody", null, blacklistRows));
}

var AddBlacklist = /*#__PURE__*/function (_React$Component3) {
  _inherits(AddBlacklist, _React$Component3);

  var _super3 = _createSuper(AddBlacklist);

  function AddBlacklist() {
    var _this3;

    _classCallCheck(this, AddBlacklist);

    _this3 = _super3.call(this);
    _this3.handleAdd = _this3.handleAdd.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(AddBlacklist, [{
    key: "handleAdd",
    value: function handleAdd(e) {
      e.preventDefault();
      var form = document.forms.blacklistAdd;
      var person = {
        name: form.name.value,
        phone: form.phone.value
      };
      this.props.addBlacklist(person);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "blacklistAdd",
        onSubmit: this.handleAdd
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "phone",
        placeholder: "Phone Number"
      }), /*#__PURE__*/React.createElement("button", null, "Add"));
    }
  }]);

  return AddBlacklist;
}(React.Component);

var DeleteBlacklist = /*#__PURE__*/function (_React$Component4) {
  _inherits(DeleteBlacklist, _React$Component4);

  var _super4 = _createSuper(DeleteBlacklist);

  function DeleteBlacklist() {
    var _this4;

    _classCallCheck(this, DeleteBlacklist);

    _this4 = _super4.call(this);
    _this4.handleDelete = _this4.handleDelete.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(DeleteBlacklist, [{
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var form = document.forms.blacklistDelete;
      var person = {
        name: form.name.value
      };
      this.props.deleteBlacklist(person);
      form.name.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("form", {
        name: "blacklistDelete",
        onSubmit: this.handleDelete
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name"
      }), /*#__PURE__*/React.createElement("button", null, "Delete"));
    }
  }]);

  return DeleteBlacklist;
}(React.Component);

var NavBar = /*#__PURE__*/function (_React$Component5) {
  _inherits(NavBar, _React$Component5);

  var _super5 = _createSuper(NavBar);

  function NavBar() {
    var _this5;

    _classCallCheck(this, NavBar);

    _this5 = _super5.call(this);
    _this5.showBooking = _this5.showBooking.bind(_assertThisInitialized(_this5));
    _this5.showBlacklist = _this5.showBlacklist.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(NavBar, [{
    key: "showBooking",
    value: function showBooking(e) {
      e.preventDefault();
      this.props.showComponent("Booking");
    }
  }, {
    key: "showBlacklist",
    value: function showBlacklist(e) {
      e.preventDefault();
      this.props.showComponent("Blacklist");
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
        onClick: this.showBooking
      }, "Bookings")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
        onClick: this.showBlacklist
      }, "Blacklist")))));
    }
  }]);

  return NavBar;
}(React.Component);

var DisplayHomepage = /*#__PURE__*/function (_React$Component6) {
  _inherits(DisplayHomepage, _React$Component6);

  var _super6 = _createSuper(DisplayHomepage);

  function DisplayHomepage() {
    var _this6;

    _classCallCheck(this, DisplayHomepage);

    _this6 = _super6.call(this);
    _this6.state = {
      bookings: [],
      blacklist: [],
      showBooking: true,
      showBlacklist: false
    };
    _this6.addBooking = _this6.addBooking.bind(_assertThisInitialized(_this6));
    _this6.deleteBooking = _this6.deleteBooking.bind(_assertThisInitialized(_this6));
    _this6.addBlacklist = _this6.addBlacklist.bind(_assertThisInitialized(_this6));
    _this6.deleteBlacklist = _this6.deleteBlacklist.bind(_assertThisInitialized(_this6));
    _this6.showComponent = _this6.showComponent.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(DisplayHomepage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query1, data1, query2, data2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query1 = "query {\n      bookingDetails {\n        seat status name phone timestamp\n      }\n    }";
                _context.next = 3;
                return graphQLFetch(query1);

              case 3:
                data1 = _context.sent;

                if (data1) {
                  this.setState({
                    bookings: data1.bookingDetails
                  });
                }

                query2 = "query {\n      blacklistDetails {\n        name phone\n      }\n    }";
                _context.next = 8;
                return graphQLFetch(query2);

              case 8:
                data2 = _context.sent;

                if (data2) {
                  this.setState({
                    blacklist: data2.blacklistDetails
                  });
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "addBooking",
    value: function () {
      var _addBooking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(booking) {
        var query;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = "mutation bookingAdd($booking: BookingInputs!) {\n      bookingAdd(booking: $booking) { \n        seat \n      }\n    }";
                _context2.next = 3;
                return graphQLFetch(query, {
                  booking: booking
                });

              case 3:
                this.loadData();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addBooking(_x2) {
        return _addBooking.apply(this, arguments);
      }

      return addBooking;
    }()
  }, {
    key: "deleteBooking",
    value: function () {
      var _deleteBooking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(booking) {
        var query;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "mutation bookingDelete($booking: BookingInputs!) {\n      bookingDelete(booking: $booking) { \n        seat \n      }\n    }";
                _context3.next = 3;
                return graphQLFetch(query, {
                  booking: booking
                });

              case 3:
                this.loadData();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteBooking(_x3) {
        return _deleteBooking.apply(this, arguments);
      }

      return deleteBooking;
    }()
  }, {
    key: "addBlacklist",
    value: function () {
      var _addBlacklist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(person) {
        var query;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                query = "mutation blacklistAdd($person: PersonInputs!) {\n      blacklistAdd(person: $person) { \n        name \n      }\n    }";
                _context4.next = 3;
                return graphQLFetch(query, {
                  person: person
                });

              case 3:
                this.loadData();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addBlacklist(_x4) {
        return _addBlacklist.apply(this, arguments);
      }

      return addBlacklist;
    }()
  }, {
    key: "deleteBlacklist",
    value: function () {
      var _deleteBlacklist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(person) {
        var query;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = "mutation blacklistDelete($person: PersonInputs!) {\n      blacklistDelete(person: $person) { \n        name \n      }\n    }";
                _context5.next = 3;
                return graphQLFetch(query, {
                  person: person
                });

              case 3:
                this.loadData();

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteBlacklist(_x5) {
        return _deleteBlacklist.apply(this, arguments);
      }

      return deleteBlacklist;
    }()
  }, {
    key: "showComponent",
    value: function showComponent(comp) {
      this.setState({
        showBooking: false,
        showBlacklist: false
      });

      if (comp == "Booking") {
        this.setState({
          showBooking: true
        });
      } else if (comp == "Blacklist") {
        this.setState({
          showBlacklist: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "SHIRS - Singapore High-Speed Intercontinental Railway System"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(NavBar, {
        showComponent: this.showComponent
      }), /*#__PURE__*/React.createElement("hr", null), this.state.showBooking && /*#__PURE__*/React.createElement("h2", null, "Current Bookings"), this.state.showBooking && /*#__PURE__*/React.createElement(BookingTable, {
        bookings: this.state.bookings
      }), this.state.showBooking && /*#__PURE__*/React.createElement("h2", null, "New Booking"), this.state.showBooking && /*#__PURE__*/React.createElement(AddBooking, {
        addBooking: this.addBooking
      }), this.state.showBooking && /*#__PURE__*/React.createElement("h2", null, "Delete Booking"), this.state.showBooking && /*#__PURE__*/React.createElement(DeleteBooking, {
        deleteBooking: this.deleteBooking
      }), this.state.showBlacklist && /*#__PURE__*/React.createElement("h2", null, "Current Blacklist"), this.state.showBlacklist && /*#__PURE__*/React.createElement(BlacklistTable, {
        blacklist: this.state.blacklist
      }), this.state.showBlacklist && /*#__PURE__*/React.createElement("h2", null, "Add to Blacklist"), this.state.showBlacklist && /*#__PURE__*/React.createElement(AddBlacklist, {
        addBlacklist: this.addBlacklist
      }), this.state.showBlacklist && /*#__PURE__*/React.createElement("h2", null, "Delete from Blacklist"), this.state.showBlacklist && /*#__PURE__*/React.createElement(DeleteBlacklist, {
        deleteBlacklist: this.deleteBlacklist
      }));
    }
  }]);

  return DisplayHomepage;
}(React.Component);

var element = /*#__PURE__*/React.createElement(DisplayHomepage, null);
ReactDOM.render(element, document.getElementById('contents'));