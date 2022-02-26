class NavBar extends React.Component {
  render() {
    return (
      <div>This is a placeholder for the navigation bar.</div>
    );
  }
}

class addTraveller extends React.Component {
  render() {
    return (
      <div>This is a placeholder for addTraveller.</div>
    );
  }
}

class deleteTraveller extends React.Component {
  render() {
    return (
      <div>This is a placeholder for deleteTraveller.</div>
    );
  }
}

class displayTraveller extends React.Component {
  render() {
    return (
      <div>This is a placeholder for displayTraveller.</div>
    );
  }
}

class displayFreeSeats extends React.Component {
  render() {
    return (
      <div>This is a placeholder for displayFreeSeats.</div>
    );
  }
}

class displayHomepage extends React.Component {

  render() {
    return (
      <React.Fragment>
        <h1>Placeholder for displayHomepage</h1>
        <hr />
        <addTraveller />
        <hr />
        <deleteTraveller />
        <hr />
        <displayTraveller />
        <hr />
        <displayFreeSeats />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
