import React, { useState } from "react";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
import AuthenticationService from "../AuthenticationService";
import { Form, Input } from "formik-semantic-ui";

function LoginComponent(props) {
  const [loginDefaults, setLoginDefaults] = useState({
    username: "username",
    password: "12345678",
    isLoggedIn: false,
    isIncorrectPassword: false,
  });

  function onSubmit(values) {
    AuthenticationService.executeJwtAuthenticationService(
      values.username,
      values.password
    )
      .then((response) => {
        AuthenticationService.registerSuccessFulLoginForJWT(
          values.username,
          response.data.jwt
        );

        setLoginDefaults((prevValue) => {
          return {
            ...prevValue,
            isIncorrectPassword: false,
          };
        });
        props.history.push(`/welcome/${values.username}`);
      })
      .catch(() => {
        setLoginDefaults((prevValue) => {
          return {
            ...prevValue,
            isIncorrectPassword: true,
          };
        });
      });
  }

  return (
    <div>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form
              initialValues={{
                username: loginDefaults.username,
                password: loginDefaults.password,
              }}
              onSubmit={onSubmit}
              validateOnChange={false}
              validateOnBlur={false}
              enableReinitialize={true}
              ignoreLoading={true}
            >
              {loginDefaults.isIncorrectPassword && (
                <div>Incorrect Password</div>
              )}
              <Input
                className="form-control"
                type="text"
                name="username"
                label="Username"
              />
              <Input
                className="form-control"
                type="password"
                name="password"
                label="Password"
              />
              <Button type="submit">Login</Button>
            </Form>
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button content="Sign up" icon="signup" size="big" />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </div>
  );
}

export default LoginComponent;
