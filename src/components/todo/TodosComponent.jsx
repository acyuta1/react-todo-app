import React, { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import TodoService from "../../api/todo/TodoService";
import { USER_NAME_SESSION_ATTRIBUTE } from "../AuthenticationService";
function TodosComponent(props) {
  const [todoItems, setToDoItems] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState(null);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
    TodoService.getAllTodosOfUser(username).then((respone) => {
      setToDoItems((prevValue) => respone.data);
    });
  }

  function updateTodo(id) {
    props.history.push(`/todos/${id}`);
  }

  function addTodo() {
    props.history.push("/todos/-1");
  }

  function deleteTodo(id) {
    const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE);
    TodoService.deleteATodoOfUser(username, id).then((response) => {
      setDeleteMessage((prevValue) => id);
      getAll();
    });
  }

  return (
    <div>
      {deleteMessage && <div>deleted todo {deleteMessage}</div>}
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Describe your todo</Table.HeaderCell>
            <Table.HeaderCell>isDone?</Table.HeaderCell>
            <Table.HeaderCell>Target Date</Table.HeaderCell>
            <Table.HeaderCell>Update Todo</Table.HeaderCell>
            <Table.HeaderCell>Delete Todo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {todoItems.map((i) => {
            console.log(i);
            return (
              <Table.Row key={i.id}>
                <Table.Cell>{i.description}</Table.Cell>
                <Table.Cell>{i.isDone}</Table.Cell>
                <Table.Cell>{i.targetDate}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => updateTodo(i.id)}>update</Button>
                </Table.Cell>
                <Table.Cell>
                  <Button secondary onClick={() => deleteTodo(i.id)}>
                    delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Button onClick={addTodo}> Add </Button>
    </div>
  );
}
export default TodosComponent;
