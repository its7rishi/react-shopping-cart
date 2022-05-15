import React from "react";
import { Form, Button, Container } from "react-bootstrap";
export const Login = ({ updateUser }) => {
  return (
    <Container className="w-50">
      <h1 className="text-primary text-center">Please Login</h1>

      <Form
        className="p-4 rounded-2 shadow-lg border border-0"
        onSubmit={updateUser}
      >
        <Form.Group className="mb-2">
          <Form.Label>UserName: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            autoComplete="off"
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" placeholder="Enter username" required />
        </Form.Group>
        <Button className="btn btn-primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};
