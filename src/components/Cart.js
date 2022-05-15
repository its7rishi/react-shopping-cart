import React from "react";
import { Container, ListGroup } from "react-bootstrap";

export const Cart = ({ cartItems, total }) => {
  return (
    <Container>
      <ListGroup>
        {cartItems.map((item) => (
          <ListGroup.Item className="bg-light d-flex justify-conent-center align-items-center mb-2 shadow">
            <div className="w-50 me-2 text-left">{item.product}</div>
            <div className="w-25 me-2 text-center">Qty:&nbsp;{item.qty}</div>
            <div className="w-25 me-2 text-right fw-bold text-primary">
              ${`${item.price}`}
            </div>
          </ListGroup.Item>
        ))}
        <Container className="text-warning fs-1 mt-3 shadow p-3 bg-dark text-right d-flex justify-content-between align-items-center">
          <span>Total:</span> <span>${total}</span>
        </Container>
      </ListGroup>
    </Container>
  );
};
