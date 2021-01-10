import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
function Welcome(props) {
  return (
    <div>
      <Container>
        <h1>Welcome {props.match.params.name}!</h1>
        <Link to="/todos"> You can manage your todos here</Link>
      </Container>
    </div>
  );
}
export default Welcome;
