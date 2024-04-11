import { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import "./SearchForm.css";

function SearchForm({ handleSearch }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <FormControl
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Recipe"
        className="me-2 search_bar"
      />
      <Button variant="outline-light" type="submit">
        Search
      </Button>
    </Form>
  );
}

export default SearchForm;
