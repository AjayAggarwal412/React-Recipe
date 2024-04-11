import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchForm from "./SearchForm";
import "./Header.css";

function Header({ handleSearch }) {
  return (
    <Navbar expand="lg" className="navbar" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">React Recipe</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <SearchForm handleSearch={handleSearch} />
          </Nav>
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/" className="home">
              Home
            </Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
