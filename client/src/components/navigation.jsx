import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  DropdownToggle,
  NavLink,
  NavItem,
  NavbarToggler,
  Nav,
  DropdownItem,
  DropdownMenu,
  Collapse,
  UncontrolledDropdown,
  Form,
  Label,
  Input,
  Button,
  Col,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./css/navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isMobile: false,
    };
    this.toggleIsOpen = () => this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount = () => {
    this.checkMobile();
    window.addEventListener("resize", () => {
      this.checkMobile();
    });
  };

  checkMobile = () => {
    if (window.innerWidth < 768) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  renderNavButtons = () => {
    return (
      <React.Fragment>
        {this.state.isMobile ? <>{this.renderSearchbarExpander()}</> : <></>}

        {this.props.isAuthenticated ? (
          <div>
            <Col id="new-post-button-div" className="d-none d-md-block">
              <a className="navbar-button-fill" href="/new">
                Create Post
              </a>
            </Col>
            <div className="dropdown-div">
              <div id="profile-picture-div">
                <div id="profile-picture"></div>
              </div>
              <div
                tabIndex="-1"
                role="menu"
                aria-hidden="true"
                className="dropdown-menu"
              >
                <a
                  href="/new"
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Create Post
                </a>
                <a
                  href="/$user$"
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  My Posts
                </a>

                <a
                  href="/settings"
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Settings
                </a>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <a
                  href="/logout"
                  type="button"
                  tabIndex="0"
                  role="menuitem"
                  className="dropdown-item"
                >
                  Log Out
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Col className="d-none d-md-block f-left navbar-button-margin">
              <a className="navbar-button" href="http://localhost:5000/login">
                Log in
              </a>
            </Col>
            <div className="f-right">
              <a
                className="navbar-button-fill"
                href="http://localhost:5000/login"
              >
                Create account
              </a>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  renderSearchbar = (withMargin) => {
    let margin = "";
    if (withMargin) {
      margin = "with-margin";
    }
    return (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <Form inline>
            <div id="search-div-nav" className={"search-dropdown " + margin}>
              <Input
                id="search"
                type="text"
                name="search"
                placeholder="Search..."
                autoComplete="off"
              />
              <Button id="search-icon" color="white">
                <FontAwesomeIcon color="black" icon={faSearch} />
              </Button>
            </div>
          </Form>
        </Nav>
        {/*Pull towards left */}

        {/* Pull towards right */}
      </Collapse>
    );
  };

  renderSearchbarExpander = () => {
    return (
      <Button id="search-icon-expander" onClick={this.toggleIsOpen}>
        <FontAwesomeIcon color="black" icon={faSearch} />
      </Button>
    );
  };

  render() {
    return (
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand href="/">Blog</NavbarBrand>
          {this.state.isMobile ? <></> : this.renderSearchbar(false)}
          {/* Below, we'll add toggler for auto-collapse */}

          <div id="accountDivNav">{this.renderNavButtons()}</div>
          {this.state.isMobile ? this.renderSearchbar(true) : <div />}
        </div>
      </Navbar>
    );
  }
}

export default Navigation;
