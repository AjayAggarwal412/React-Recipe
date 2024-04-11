import { Col, Container, Row, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";
import "./Recipe.css";
import { FadeLoader } from "react-spinners";

const Recipe = ({ recipe, addToFavorites, removeFromFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeFavorite = favorites.some(
      (fav) => fav.recipe.uri === recipe.recipe.uri
    );
    setIsFavorite(isRecipeFavorite);
    setLoading(false);
  }, [recipe.recipe.uri]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      addToFavorites(recipe);
    } else {
      removeFromFavorites(recipe);
    }
  };

  return (
    <>
      <Container fluid className="container">
        <Row xs={1} md={2} lg={3} xl={4}>
          <Col>
            <Card className="card_hover">
              {loading ? (
                <div className="image-loader">
                  <FadeLoader color={"#fab73d"} height={15} width={5} />
                </div>
              ) : (
                <Card.Img
                  variant="top"
                  src={recipe.recipe.image}
                  className="recipe_image"
                />
              )}
              <Card.Body>
                <Card.Title>{recipe.recipe.label}</Card.Title>
                <Card.Text>
                  {recipe?.recipe?.dietLabels &&
                  recipe.recipe.dietLabels.length > 0
                    ? recipe.recipe.dietLabels[0]
                    : "N/A"}
                </Card.Text>

                <Row>
                  <Col>
                    <Link
                      to={`/recipe/${recipe.recipe.label}`}
                      className="btn btn-primary"
                      style={{
                        marginTop: "40px",
                        backgroundColor: "#fab73d",
                        borderColor: "black",
                        color: "black",
                      }}
                    >
                      View Recipe
                    </Link>
                  </Col>
                  <Col>
                    <Button
                      onClick={toggleFavorite}
                      className="btn btn-primary"
                      style={{
                        marginTop: "40px",
                        marginLeft: "10px",
                        color: "black",
                        borderColor: "black",
                        backgroundColor: isFavorite ? "lightgreen" : "white",
                      }}
                    >
                      {isFavorite ? "Unfavorite" : "Favorite"}
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Recipe;
