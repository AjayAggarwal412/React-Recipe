import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import "./RecipeInfo.css";

const RecipeInfo = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.recipe.label === id);

  return (
    <Container>
      <Row className="justify-content-center">
        <div className="label">
          <h2> Recipe of {recipe?.recipe.label}</h2>
        </div>

        <Col md={12}>
          {recipe ? (
            <Card className="recipe_info_card">
              <Row>
                <Col md={4} className="d-flex flex-column align-items-center">
                  <Card.Img
                    variant="top"
                    src={recipe?.recipe.image}
                    className="recipe_info_image"
                  />
                  <Card.Title className="mt-5 recipe_info_title">
                    {recipe?.recipe.label}
                  </Card.Title>
                </Col>
                <Col md={8}>
                  <Card.Body className="recipe_info_table_card">
                    <Table striped bordered>
                      <tbody>
                        <tr>
                          <td>Calories</td>
                          <td>{recipe?.recipe.calories}</td>
                        </tr>
                        <tr>
                          <td>Servings</td>
                          <td>{recipe?.recipe.yield}</td>
                        </tr>
                        <tr>
                          <td>Ingredients</td>
                          <td>
                            <ul style={{ listStyleType: "none" }}>
                              {recipe?.recipe.ingredients.map(
                                (ingredient, index) => (
                                  <li key={index}>{ingredient.text}</li>
                                )
                              )}
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ) : (
            <h1>Recipe not found</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeInfo;
