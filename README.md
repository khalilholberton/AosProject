# AOS Project : Todo List Back-end

This is a back-end application for a To-do List with users, posts, and comments - developed using  
 a GraphQL server that uses Node and Express to communicate to a MongoDB Database
and fetch and persist data to the app back-end.

### USAGE

You can try the API by following these steps:

> Step 1: Clone my repository using this command, (you need to have git installed on your machine first)

```sh
# Have access problem use sudo or run terminal with adminstration
$ git clone https://github.com/khalilholberton/AosProject.git
```

> Step 2: Change directory to AosProject

```sh
# AosProject folder
$ cd AosProject
```

> Step 3: Install dependencies and devDependencies: (you need to have npm and node installed on your machine):

```sh
# commands
$ yarn install / npm install
```

> Step 4: Run the application

```sh
$ npm run serve
```

> Step 5: Open this URL http://localhost:4000/graphql in your browser
> Step 6: Now you can send queries
> Step 7: In order to stop the application from running, press Control and c.

```sh
$ Crtl+c
```

### Essential operations

- **Queries** are the GraphQL equivalent to GET calls in REST.
- **Mutations** represent the state-changing methods in REST (like DELETE, PUT, PATCH, etc).
- **Subscriptions** are a way to create and maintain real time connection to the server. This enables the client to get immediate information about related events.

### Examples of USAGE

#### register

```sh
mutation {
  register(registerInput:{
      username: "khalil"
  	password: "1234"
    confirmPassword:"1234"
    email:"khalil@gmail.com"

  }){
  id
  username
  token
  }
 }
```

#### login

```sh
mutation {
  login(
      username: "khalil"
  	  password: "1234"
 		){
  id
  username
  token
  }
 }
```

#### getPosts

```sh
query{
  getPosts{
  id
  body
  username
  createdAt
  comments{
    id
    createdAt
    username
  }
  likes{
    id
    username
    createdAt}
}}
```

#### createPost

```sh
mutation {
  createPost(body:"my second task"){
    id
    body
    username
    createdAt
  }
 }
```

#### donePost

```sh
mutation {
  donePost(
      postId:"60a420d74503c278ae1e22e5"
 		){
  done
  }
 }
```

#### likePost

```sh
mutation{
  likePost(postId:"60a5b1f3c8c8513b6416b786"){
      id
      body
      username
      likes{
          id
          username
      }
  }
  }
```

#### createComment

```sh
mutation {
createComment(postID:"60a5b1f3c8c8513b6416b786"){
    id
    body
    comments{
        id
        createdAt
        username
    }
}
 }

```

#### deleteComment

```sh
mutation{
  deleteComment(postId:"60a5b1f3c8c8513b6416b786" commentId:"60a5b5e9c8c8513b6416b788"){
      id
      comments{
          id
          username
          body
      }
  }
  }
```

#### deletePost

```sh
mutation{
  deletePost(postId:"60a5b1f3c8c8513b6416b786")
  }
```
