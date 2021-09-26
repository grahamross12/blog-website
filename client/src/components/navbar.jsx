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
  FormGroup,
  NavbarText,
  Label,
  Input,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

class NavbarBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggle = () => this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <div className="container">
          <NavbarBrand href="/">Blog</NavbarBrand>
          {/* Below, we'll add toggler for auto-collapse */}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {/*Pull towards left */}
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Form inline>
                  <div id="searchDivNav">
                    <Label for="search">Search</Label>
                    <Input
                      id="search"
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search"
                      autoComplete="off"
                    />
                    <Button>
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </div>
                </Form>
              </NavItem>
            </Nav>

            {/* Pull towards right */}

            <div id="accountDivNav">
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Username
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>My Account</DropdownItem>
                    <DropdownItem>Page Settings</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>Log Out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default NavbarBlog;
