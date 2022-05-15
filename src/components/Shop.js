import React, { useState, useEffect } from "react";
import { Button, Card, Container, Modal, Spinner } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Cart } from "./Cart";

export const Shop = ({ user }) => {
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // console.log(products);
      });
  };

  useEffect(() => {
    fetchProducts();
    products ? setIsLoading(true) : setIsLoading(false);
  }, []);

  // ADD CART ITEMS

  const addCartItem = (item, price) => {
    let id = Math.floor(Math.random() * 10000);
    let newList = [...cartItems];

    let newItem = {
      id: id,
      product: item,
      price: price,
      qty: 1
    };

    let searchItem = newList.find((item) => item.product === newItem.product);

    if (searchItem) {
      searchItem.qty += 1;
      searchItem.price *= searchItem.qty;
    } else {
      newList = [...cartItems, newItem];
    }

    setCartItems(newList);
    calcTotal();
  };

  const calcTotal = () => {
    let total = 0;

    cartItems.forEach((item) => {
      total += item.price;
      setCartTotal(total.toFixed(2));
    });
    console.log(`Final: ${cartTotal}`);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      calcTotal();
    }
  }, [cartItems]);

  return (
    <>
      {isLoading ? (
        <Container
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Container className="container-fluid">
          <h1 className="display-4 text-center text-primary">The Shop</h1>

          <Container className="mt-3 mb-3 p-3 shadow d-flex justify-content-between align-items-center">
            <h3 className="text-primary">Welcome {user}!</h3>

            <Button
              className="btn btn-danger rounded-pill"
              type="button"
              onClick={handleShow}
            >
              <span className="m-2">
                <FontAwesomeIcon icon={faCartShopping} />
              </span>
              <span className="m-2">{cartItems.length}</span>
            </Button>

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Your Cart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Cart cartItems={cartItems} total={cartTotal} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={handleClose}>
                  Make Payment
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>

          <Container className="mb-3 p-3 container-fluid bg-transparent d-flex flex-wrap justify-content-center align-items-center shadow">
            {products &&
              products.map((product) => (
                <Card
                  style={{ width: "18rem" }}
                  key={product.id}
                  className="p-2 m-2 shadow"
                >
                  <Card.Img
                    variant="top"
                    src={product.image}
                    className="img-fluid"
                    style={{ width: "300px", height: "250px" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>${product.price}</Card.Text>
                    <Button
                      variant="success"
                      onClick={() => addCartItem(product.title, product.price)}
                    >
                      Add To Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </Container>
        </Container>
      )}
    </>
  );
};
