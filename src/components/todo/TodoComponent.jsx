import React, { useState, useEffect } from "react";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "semantic-ui-react";
import TodoService from "../../api/todo/TodoService";

function TodosComponent(props) {
  const [initValues, setInitValues] = useState({
    id: props.match.params.id,
    description: "",
    isDone: false,
    targetDate: moment(new Date()).format("YYYY-MM-DD"),
    username: "",
  });

  useEffect(() => {
    fetchATodo();
  }, []);

  function fetchATodo() {
    let user = sessionStorage.getItem("authenticatedUser");

    if (initValues.id === "-1") {
      return;
    }

    TodoService.getATodoOfUser(user, props.match.params.id).then((respone) => {
      setInitValues((prevValues) => {
        return {
          ...prevValues,
          description: respone.data.description,
          targetDate: moment(respone.data.targetDate).format("YYYY-MM-DD"),
        };
      });
      console.log(respone);
    });
  }

  function onSubmit(values) {
    console.log(values);
    let user = sessionStorage.getItem("authenticatedUser");

    values.username = user;
    if (initValues.id === "-1") {
      TodoService.addATodo(user, values).then(() =>
        props.history.push(`/todos`)
      );
    } else {
      TodoService.updateATodoOfUser(
        user,
        props.match.params.id,
        values
      ).then(() => props.history.push(`/todos`));
    }
  }
  function validate(values) {
    let errors = {};
    if (!values.description) {
      errors.description = "description should be present";
    } else if (values.description.length < 5) {
      errors.description = "description should be more than 5";
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = "invalid date provided";
    }
    console.log(values);
    return errors;
  }

  let { description, targetDate } = initValues;
  return (
    <div>
      <h1>Todo</h1>
      <Formik
        initialValues={{
          description,
          targetDate,
        }}
        onSubmit={onSubmit}
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        enableReinitialize={true}
      >
        {(props) => (
          <Form>
            <ErrorMessage name="description" component="div" />
            <ErrorMessage name="targetDate" component="div" />
            <fieldset className="form-group">
              <label>description</label>
              <Field className="form-control" type="text" name="description" />
            </fieldset>
            <fieldset>
              <label>targetDate</label>
              <Field type="date" name="targetDate" />
            </fieldset>
            <Button type="submit">Save</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TodosComponent;
