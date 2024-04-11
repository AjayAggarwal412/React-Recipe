import uuid from "react-uuid";
import { Col, Row, Container } from "react-bootstrap";
import Recipe from "./Recipe";

const RecipeList = ({ recipes, addToFavorites, removeFromFavorites }) => {
  return (
    <Container fluid>
      <Row xs={1} md={2} lg={3} xl={4} className="">
        {recipes?.map((recipe) => (
          <Col key={recipe.recipe.label}>
            <Recipe
              recipe={recipe}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
