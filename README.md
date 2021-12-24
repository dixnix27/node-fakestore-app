# node-fakestore-app

Guided project for **Node API** Module.

In this project we will learn how to create a simple Web API using `Node.js` and `Express`, and cover the basics of server-side routing using global middleware.

## Prerequisites

- an HTTP client like [Postman](https://www.getpostman.com/downloads/) or [Insomnia](https://insomnia.rest/download/).

## Project Setup

- [ ] Clone this repository.
- [ ] Open the project folder in VSCode.

## Assignment

Build a RESTful Web API for an online store to Create, Read, Update and Delete _"Products"_ .

A Product has:

- a unique `id`.
- a `title`.
- a `price`.
- - a `description`.
- - a `category`.
- - an `image`.
- - a `rating`.

### Features

The Web API must provide a set of `endpoints` to fulfill the following needs:

- add a new Product.
- view a list of existing Products.
- view the details of a single Product.
- update the information of an existing Product.
- remove a Product.

Here is a table with the `endpoint` descriptions:

| Action                    | URL                    | Method | Response          |
| :------------------------ | :--------------------- | :----- | :---------------- |
| Add a Product             | /api/products          | POST   | the new Dog       |
| View list of Products     | /api/products          | GET    | array of Dogs     |
| View Product details      | /api/products/{id}     | GET    | a Dog             |
| Update Product            | /api/products/{id}     | PUT    | updated Dog       |
| Remove a Product          | /api/products/{id}     | DELETE | deleted Dog       |

#### 1 [GET] /api/products 

- If there's an error in retrieving the _products_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The products information could not be retrieved" }`.

#### 2 [GET] /api/products/:id

- If the _product_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.

- If there's an error in retrieving the _product_ from the database:
  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The product information could not be retrieved" }`.

#### 3 [POST] /api/products

- If the request body is missing the `title` or `description` or any other required property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON: `{ message: "Please provide the required fields for the product." }`.

- If the information about the _product_ is valid:

  - save the new _product_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _product_.

- If there's an error while saving the _product_:
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON: `{ message: "There was an error while saving the product to the database" }`.

#### 4 [PUT] /api/products/:id

- If the _product_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.

- If the request body is missing the `title` or `description` or any other required property:

  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON: `{ message: "Please provide the required fields for the product." }`.

- If there's an error when updating the _product_:

  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The product information could not be modified" }`.

- If the product is found and the new information is valid:

  - update the product document in the database using the new information sent in the `request body`.
  - return HTTP status code `200` (OK).
  - return the newly updated _product_.

#### 5 [DELETE] /api/products/:id

- If the _product_ with the specified `id` is not found:

  - return HTTP status code `404` (Not Found).
  - return the following JSON: `{ message: "The product with the specified ID does not exist" }`.

- If there's an error in removing the _product_ from the database:

  - respond with HTTP status code `500`.
  - return the following JSON: `{ message: "The product could not be removed" }`.
