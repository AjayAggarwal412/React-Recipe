import React from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Favorites.css";

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <Container fluid className="favorite_container">
      <h2 className="heading">Favorites</h2>

      {favorites.length === 0 ? (
        <h1 style={{ textAlign: "center", padding: "50px" }}>
          No favorite recipes yet!😕
        </h1>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Dish</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((recipe, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/recipe/${recipe.recipe.label}`}>
                    <img
                      src={recipe.recipe.image}
                      alt={recipe.recipe.label}
                      className="favorite_image"
                    />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/recipe/${recipe.recipe.label}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {recipe.recipe.label}
                  </Link>
                </td>
                <td>
                  <Button
                    onClick={() => removeFromFavorites(recipe)}
                    className="btn btn-primary"
                    variant="danger"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Favorites;
