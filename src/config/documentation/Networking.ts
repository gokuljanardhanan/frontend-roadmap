export const Networking = `
# Overview

Communication and data exchange between the client-side (frontend) and server-side (backend) of a web application with different protocols, different strategies.

## Frontend Networking

- **HTTP Requests**: GET, POST, PUT, and DELETE.
- **AJAX**: Asynchronous JavaScript and XML (AJAX) allows for sending and receiving data asynchronously without refreshing the webpage.
- **APIs**: The frontend interacts with APIs (Application Programming Interfaces) provided by the backend to fetch data, usually in JSON format.
- **WebSockets**: For real-time communication, WebSockets provide a persistent connection between the client and server, allowing for continuous data exchange.
- **Fetch API / Axios**: Tools and libraries like the Fetch API and Axios are used to make HTTP requests from the frontend.
- **CORS (Cross-Origin Resource Sharing)**: A mechanism that allows resources on a web page to be requested from another domain.

## Backend Networking

- **Handling HTTP Requests**: The backend receives HTTP requests from the frontend, processes them, and sends back the appropriate responses.
- **API Development**: Creating APIs that the frontend can use to interact with the backend. These can be RESTful APIs or GraphQL.
- **Database Communication**: The backend communicates with databases to store, retrieve, and manipulate data as requested by the frontend.
- **Authentication and Authorization**: Ensuring that the requests made from the frontend are secure and that the users are authenticated and authorized to access specific resources.
- **WebSockets**: Similar to the frontend, WebSockets on the backend are used for real-time communication.
- **Server Configuration**: Setting up and maintaining server configurations, handling network requests, load balancing, and ensuring the server's security.

## Technologies

- **Frontend**: HTML, CSS, JavaScript, React, Angular, Vue.js, Axios, Fetch API.
- **Backend**: Node.js, Express.js, Django, Flask, Ruby on Rails, Java, Spring, .NET, SQL/NoSQL databases, REST APIs, GraphQL.

## 1. How Web Works

When we open a browser and type www.google.com, it will get an HTML file from the web server. This HTML is responsible for the template/contents of the web browser, which will contain the list of scripts/JS and style file URLs. Style files are responsible for beautifying the HTML contents, and for dynamic behavior/DOM updation, JS is used. Most of the web is now SPA (single page applications), previously different HTML files were used for different web pages.

- **HTML**: contents/template
- **CSS**: beautify the web page
- **JS**: dynamic behavior / DOM update

### Step 1: Mobile browser -> Cell Tower -> Phone company -> DNS Server

In this step, our phone/laptop connected to mobile data/WiFi and when we open a web browser and type any website address, the request will go through the cell tower to the phone company and then to the DNS server. The DNS server is responsible for returning the IP address of the website. It will contain a map of DNS and IP address.

### Step 2: Mobile browser -> Cell Tower -> Phone company -> Web server

Once the IP address is received, the browser will make a request to the corresponding IP address which will be a web server hosted on Nginx/Apache/Akamai.

The entire internet is a mixture of wired and wireless connections. The reason being wired connection is too complex to distribute all over the world, at the same time wireless is being affected by weather conditions and all. So internet connection is a combination of both and implemented in an efficient way.

Every website name contains 3 parts, it will go to each level and return the IP address.
- **Eg**: www.google.com
    - **Root domain**: . (the dot)
    - **Top level domains**: edu, com, au, gov, org
    - **Second level domains**: google.com, microsoft.com
    - **Third level domains**: www, download.microsoft.com, sales.microsoft

There may not be one single server, billions of users are using Google or Netflix, so one single machine/server couldn't handle this, there are multiple servers all over the world and the request redirected to the nearest server.

- **User -> browser -> request -> local ISP -> Regional ISP -> Global ISP 1 (India) -> Global ISP 2 (USA) -> Regional ISP -> Local ISP -> Server**

When a user makes a request, the request flows from the browser to the local ISP and then to a regional ISP, then a global ISP for a particular country. If the server is in a different country, it connects to the global ISP of the USA then redirects the request to the Regional, Local ISP, and then to the machine with the required IP address. The data comes back to the user in different packets.

Even before reaching the request from the browser to the router, it first checks the browser cache and then the service worker if any cache exists. If yes, it will return the data otherwise it will make an original request.

- **Operating system**: Proxy can be added here, where in etc/hosts we can map google.com to localhost, so it won't create a request to the server, it will point to our localhost.
- **Router**: domain/IP mapping can be done.
- **ISP**: 

- **304**: If we make a request to the server and the server returned 304, it means the data remains the same, no change in the data which you have already in the browser cache.

Now if some website needs to be blocked in India, this can be done at the global ISP of India. Now each country is connected to each other with cables through the sea. (global ISP connected with wired connection through the sea)

Google has added a proxy at the ISP level, so this peering reduced the level of request traveling (it's not about the web server at each country or nearest location, it is adding proxy the DNS map at the local ISP). Netflix hosted the videos at regional ISP on a rental basis, for faster video streaming.

- **ICANN**: authority for DNS (first, second, third level)
- **whois.com**: for checking domain name and registered and expire dates.

While sending a request from client to server, it first sends a SYN, once SYN is received at the server it acknowledges.

- **DNS Lookup**: First checks DNS for getting the IP address from the website name.
- **TCP handshake**: Now a Handshake (acknowledgment) happens between client and server.
- **SSL handshake (https)**: Now for secure communication server sends an SSL certificate to the client, encrypted no one can understand in between. (first acknowledgment then transfer of certificate)
- **14Kb, 28Kb, 56Kb**: if the initial HTML size is 14kb, it requires only 1 round to get the data, otherwise, it will get 14kb data packet and in consecutive rounds other packages will be received.

### Getting HTML and rendering

- **Loading**: loading the HTML, CSS, JS file and parsing.
- **Get CSS**: render blocking.
- **Get JS**: parser blocking (defer, async to fix this) - it halts when it sees the script tag and until it is loaded.
- **Creates a DOM tree and CSSOM tree and both of them merged creating a render tree.**
- **Scripting**: Load script -> Parse (done in script streamer thread, rest of them in the main thread) -> AST internalization -> compile -> bytecode finalization -> execute.
- **Rendering**: Layout -> placing the contents in the web page.
- **Painting**: Paint + compositing (the layer of pages, eg: modal on top of page, the layering).

### Getting HTML -> parsing HTML -> creating DOM nodes (html, head, body, script ..etc) -> while parsing CSS (render blocking), JS (parsing blocking) -> parse CSS and build CSSOM -> JS execute -> render tree -> calculate layout and paint -> compositing (layering eg: based on z-index placing on top of another).

## 2. Communication Protocols

This defines how communication between two systems should happen. There are some rules, regulations, and guidelines while communicating, there should be some fundamental architecture that helps it.

### HTTP

One of the mother tongues used to communicate between 2 systems is HTTP. 
- **Eg**: While traveling on a highway there are some signs, tolls, directions to travel from one place to another. Similarly, what needs to be done, how it needs to be done, the structure of data is controlled with protocols like HTTP. The below steps are common for every HTTP request. HTTPS uses TCP to ensure no data is lost with the help of an acknowledgment number. 
- **Eg**: Web browsing.
    - **TCP Connection**: A TCP handshake is done, saying to the server, I'm going to make a connection are you ready? Once the server acknowledges this, then an HTTP request and response are sent between client and server.
    - **HTTP REQ**
    - **HTTP RESP**

### HTTP/3 (QUIC)

It makes use of a UDP connection where the TCP handshake won't be there, and the intention is to make things faster. 
- **Eg**: IoT, Virtual Reality.
    - **Adv**: Header compression, faster, improved performance, better network congestion.

### HTTPS

Along with the TCP handshake, it uses one more HTTPS handshake to protect the data by encrypting it with the certificate (using a public key), the client receives an SSL certificate from the server, which is used for further communication. 
- **Eg**: web browsing.

### WebSocket

- **HTTP Upgrade**: the first connection will be HTTP, and then convert the connection to WebSocket (ws), with a status of 101.
- **Full duplex**: There will be a single connection, no repeated connection required, in a single connection client and server send data.

### TCP

- **Client sends a TCP handshake request**, and the server responds with an acknowledgment saying I'm available, with an acknowledgment number, and the client again sends an acknowledgment to the server saying I have accepted the number you have sent. This acknowledgment number is important in consecutive requests to ensure no data is missing while transferring. When the server sends data in packets, this number ensures not to lose any packets.
- **Eg**: Web browsing, email protocols (Suppose in a highway vehicles move slowly and ensure every vehicle reaches the destination).

### UDP

- In UDP, there is no handshake happens, to make it faster, it skips the handshake and directly sends request and response, but does not guarantee that the data is received by the client.
- **Eg**: Video conferencing (Suppose in a highway vehicles move very fast and some of the vehicles may not reach the destination).

### SMTP

This is used to send email to receivers. The sender sends a request to the SMTP server with the email address and content and then it sends the email to receivers.

### FTP

This is used in case of large file transfer, eg: Downloading uploading files.

## 3. REST API

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on stateless, client-server communication using standard HTTP methods, such as GET, POST, PUT, DELETE, etc., to interact with resources.

### Characteristics of REST

- **Stateless**: Each request from a client to a server must contain all the information the server needs to fulfill the request. The server does not store any state about the client.
- **Client-Server Architecture**: The client (e.g., a web browser) interacts with the server via HTTP, requesting resources.
- **Uniform Interface**: RESTful APIs have a consistent and predefined set of rules for interaction, typically involving HTTP methods (GET, POST, PUT, DELETE).
- **Resource-Based**: In REST, every piece of data (e.g., user, order) is a resource that can be accessed using a unique identifier, usually a URL.
- **Stateless Communication**: Each request is independent, with no memory of previous requests.

### Example of REST API

A URL like https://api.example.com/users/123 may represent a user resource with the ID 123.
- To retrieve the user's information, a GET request is made.
- To create a new user, a POST request is used.

### Other API Types

#### SOAP (Simple Object Access Protocol)

- **Definition**: SOAP is a protocol for exchanging structured information in web services, using XML as the message format. It is highly extensible and provides features like security (WS-Security), reliability, and transactions.
- **Real-Life Example**: A banking system using SOAP to transfer money between accounts securely.
- **Key Difference from REST**: SOAP is more rigid and requires a strict set of standards, while REST is more flexible and can use multiple data formats like XML, JSON, or even plain text.

#### GraphQL

- **Definition**: A query language for APIs that allows clients to request exactly the data they need. Instead of multiple endpoints, GraphQL has a single endpoint for accessing various types of data.
- **Real-Life Example**: A social media app that allows users to request specific data like their timeline posts, friend list, or notifications using a single GraphQL endpoint.
- **Key Difference from REST**: REST requires multiple endpoints, but GraphQL provides a more flexible approach where clients can specify the shape of the data they need.

#### gRPC (Google Remote Procedure Call)

- **Definition**: A high-performance RPC (remote procedure call) framework that uses HTTP/2 for transport, Protocol Buffers for serialization, and provides features like bidirectional streaming.
- **Real-Life Example**: Microservices communication in large-scale systems where services need to exchange data efficiently.

### What is REST API

### Why REST

### Building blocks

#### Request

- **HTTP request line** (eg: GET https://127.0.0/style/nav.css HTTP/1.1) + HTTP headers + HTTP body

#### Response

- **HTTP response status line** (HTTP/1.1 200 OK) + HTTP response headers + body

- **URL**: https://www.example.com/forum/questions/?tag=networking&order=newest#top
    - **Https**: scheme
    - **Host**: in order to reach the right server
        - **A. Www**: subdomain
        - **B. Example**: domain
        - **C. .com**: TLD (top level domain)
    - **Path**: right place in server code 
        - **Forum**: subdirectory
        - **Questions**: subdirectory
    - **Query string**: to pass some info 
        - **Tag=networking**: parameter (key/value)
    - **Hash/fragment**: to share some extra data while sharing URL (eg: user scrolled to a particular section of the document, and want to scroll while redirecting)
        - **Top**: this part doesn't send from client to server 

### Methods

- **POST**: To create something (eg: /todos) req body can be sent here
- **GET**: To get some data (eg: /todos, /todos/:id)
- **PUT**: To update something (update user) (eg: /todos/:id) req body can be sent here
- **PATCH**: To update part of a data (update user firstname) 
- **DELETE**: To delete some data (eg: /todos/:id)
- **HEAD**: No data sent to server or return back, eg: Just to check some modification in headers happened
- **OPTIONS**: Suppose making a req from one endpoint to another, a preflight OPTIONS req is sent in order to check if the client can make a request.
- **CONNECT**: Used to make a connection to the server which makes a faster connection in the future, the extra handshake time is saved
- **TRACE**: Used for trace purpose (diagnosis)

### Headers

#### Req Headers

- **Host**: Target host
- **Origin**: From where we are making the request
- **Referer**: Indicate the previous web page making the request, from where it redirected from
- **User agent**: The client device/browser details
- **Accept**: Response content type (passing in request header, saying this is my expected content type)
- **Accept-Language**: preferred language (expected language in client)
- **Accept-encoding**: Encoding algo (gzip, brottli (best))
- **Connection**: keep TCP connection open, keep-alive or close
- **Authorization**: Send creds, Authorization: Bearer - 
- **Cookie**: Server Token
- **If-modified-since**: send data only if data modified after a particular time
- **Cache-control**: store/cache data in the browser for a max-age

#### Response headers

- **Date**: the response generated
- **Server**: provides server info (apache, nginx, akamai): better not to expose
- **Content-type**: the type of response type
- **Content-length**: original body response length (when downloading if we want to show a loader, the percentage of content loaded, total length can be received from this and from the amount of content loaded)
- **Set-cookie**: inform about cookie need to store for future response
- **Content-encoding**: response content encoding (gzip, br)
- **Cache control**
- **Last-modified**
- **Etag**
- **Expires**: the expiry of data, after that we need to request new data

### Requests

### Response

## Status Code

Client made a request, and response is sent to client, to identify what kind of data is sent we use status code, suppose error, success, moved permanently, etc.

### 1XX: Information
- **100**: Continue, processing the request
- **101**: Switching (e.g., REST is switched to WebSocket)

### 2XX: Success
Indicates the activity is successful.
- **200**: OK (request is successful, response is shared)
- **201**: Created (insert data to DB)
- **202**: Accepted (e.g., bank statement, server accepted request, statement will be triggered later)
- **204**: No content (e.g., delete request, successfully deleted)
- **206**: Partial content (large content, sending data partially, which means response not completed)

### 3XX: Redirection
Suppose the service moved to a different endpoint, it will redirect.
- **301**: Moved permanently (e.g., website moved permanently to a different endpoint, suppose company acquired by another company)
- **302**: Temporary moved (e.g., maintenance, for now redirecting to a different endpoint)
- **307**: Equal to 302 (both of them saying even if you moved, keep my methods and pass to new endpoint while redirection)
- **308**: Equal to 301 (same, retains method)

### 4XX: Client error
- **400**: Bad request (sending data in wrong format to server)
- **401**: Unauthorized (not logged in, token is missing)
- **403**: Forbidden (e.g., user requesting for admin panel)
- **404**: Not found (e.g., path unavailable/content not available)
- **405**: Method not allowed (e.g., making a POST request on a URL, which is not supported)

### 5XX: Server error
- **500**: Internal server error (something happened at server)
- **502**: Bad gateway (API gateway down or proxy)
- **503**: Service unavailable (server down)
- **504**: Gateway timeout
- **507**: Insufficient storage (server run out of space)

## Build app

## Postman

## HTTP 1/2/3

## Best practices

## Advance

## Architecture

### 1-Tier architecture
Initially, frontend and backend were residing in a single repo and using the same framework/language, and then when wanted to scale the application, it was very difficult.

### 2-Tier Architecture
Then frontend and backend are separated.

### 3-Tier Architecture
Client, Server, and storage (DB)

- Now to communicate between frontend and backend, there should be some way. For this purpose, API is used.
- REST is one of the APIs = Representational State Transfer application programming interface.
- GRPC, GraphQL other APIs.
- REST is built on top of HTTP (Hypertext Transfer Protocol), HTTPS defines how data is transferred between.
- REST API: it provides some rules/conventions to build APIs, used to communicate between any 2 web services.
- HTTP: It provides how the data should transfer (in a restaurant maybe in a train food is delivered).

### UI vs Backend
- **Restaurant**: Kitchen

### Benefits
- **Ease of use**
- **Stateless**: Every time when a request comes, it should contain a token, and required request details, the REST API doesn’t maintain any kind of state.
- **Scalability**
- **Flexibility with data**: XML or JSON, multiple data formats can be done.
- **Uniform interface**: Defines the URL, the query params, hashes in a predefined way.
- **Caching**: Cache response data on client or server side (e.g., menu card).
- **Separation of concerns**: Backend and frontend can be in different frameworks/languages.
- **Interoperability**: Language agnostic.
- **Ease of testing**
- **Security**: We can use HTTPS and other security headers.

## GraphQL (Graph Query Language) by Facebook

### What is GraphQL
GraphQL helps to get data in a very efficient way, with fewer requests, and returns only the required set of data, and the query can be sent from the frontend. Frontend can control the data required from the backend.

#### Example
Suppose frontend requires continents, countries, and languages, with REST it exposes 3 APIs: /api/continents, /api/countries, /api/languages. But with GraphQL frontend can request just one request with the data needed as a query and the GraphQL search DB or respective data sources/server and return the data required to frontend.

### Benefits (Why GraphQL)
- **Avoid over-fetching**: To get a product name, no need to fetch all the product details.
- **Avoid under-fetching**: Single endpoint club required info.
- **Better mobile performance**: Less storage compared to desktop, GraphQL helps here by fetching less data/required data.
- **Declarative data fetching**: From FE we are defining the data we need.
- **Structured/hierarchical structure**: Define the structure of data, (countries inside continent, language inside country).
- **Strongly typed**: Well defined types, in query only defined fields can be added.
- **Introspection**: Documentation.
- **Realtime capabilities**: Subscription.

HTTP status code, method, headers all those will be present in case of GraphQL as well, it builds on top of it, it leverages HTTP, but enhances the experience. Most of GraphQL methods will be POST.

### REST vs GraphQL

| Aspect                | REST                                      | GraphQL                                      |
|-----------------------|-------------------------------------------|----------------------------------------------|
| Data fetching         | Multiple endpoints                        | Single endpoint                              |
| Request structure     | Fixed structure + defined HTTP methods    | Flexible (query + mutation)                  |
| Over fetching/under fetching | Issues                                | Resolved                                      |
| Response size         | Fixed size                                | Flexible size                                |
| API versioning        | Explicit versioning (/v1/v2)              | Flexible nature (can make changes in same schema and make others deprecated) |
| Schema                | Not well defined                          | Explicit schema definition                   |
| Realtime              | Polling, WebSocket                        | Out of scope support (subscription)          |
| Tooling support       | Postman                                   | Playground                                   |
| Caching               | Relies on HTTP cache                      | Fine-grained (make use of Apollo client libraries for caching) |
| Client control        | Client can't decide response              | Client can decide                            |
| Adoption and community| Widely adopted                            | Rapidly growing                              |

# GraphQL Building Blocks

## Core Components

### Server and Client
- **Server**: Many libraries, always library (Apollo)
- **Client**: Fetch or advanced libraries (fetch or Apollo client)

### Schema Definition
- **Schema/types**: The type or structure of data (SDL: GraphQL schema definition language)

\`\`\`graphql
type Country {
    Code: String
    Currency: String
    Phone: String
    Name: String
}
\`\`\`

### Types
- Scalar/inbuilt: ID, String, Int, Boolean
- Custom types

### Operations
#### Query
GET DATA operations:

\`\`\`graphql
type Query {
    Countries: [Country]
}
\`\`\`

#### Mutation
Update data operations (uses POST method):

\`\`\`graphql
type Mutation {
    language(id: ID): Language
}
\`\`\`

### Resolver Implementation
Resolver has the logic to call downstream APIs/get data from DB. It includes:
- **Parent**: Suppose country residing inside continent, those parent details
- **Args**: The parameters sent by client
- **Context**: Suppose it comes from different resolver and other methods, those context details

\`\`\`javascript
Query: {
    Countries: (parent, args, context) => {
        return // whatever returned from here will be the output of countries
    }
}
\`\`\`

## Summary
1. The schema defines the type of data
2. The query or mutation defines the data to send to client or mutation or update to make in DB or server
3. The resolver associated with query will have the logic to execute and get data from DB/downstream systems or update data in DB/server

# Building a GraphQL Application

## Setup and Installation

1. Create a folder for GraphQL
2. Initialize project:
   \`\`\`bash
   npm init --yes && npm pkg set type=module
   npm install @apollo/server graphql
   \`\`\`

## Server Setup

\`\`\`javascript
const server = new ApolloServer(typeDef, resolver);
// Create an express server, install Apollo server instance as middleware
const { url } = await startStandAloneServer(server, {});
\`\`\`

## Type Definitions

### Basic Schema
\`\`\`graphql
const typeDef = #graphql
type Author {
    id: ID!
    name: String!
}

type Book {
    id: ID!
    title: String!
    publishYear: Int
}

type Query {
    authors: [Author]
    books: [Book]
}

type Mutation {
}
\`\`\`

### Basic Resolver
\`\`\`javascript
const resolvers = {
  Query: {
    authors: () => {
      return [
        {
          id: 1,
          name: 'chirag',
        },
      ];
    },
    books: () => {
      return [
        {
          id: 1,
          title: 'namaste',
          publishedYear: 2024
        },
      ];
    },
  },
};
\`\`\`

## Relationships Between Types

### Enhanced Schema with Relations
\`\`\`graphql
type Author {
    id: ID!
    name: String!
    books: [Book]
}

type Book {
    id: ID!
    title: String!
    publishYear: Int
    author: Author
}

type Query {
    authors: [Author]
    books: [Book]
}
\`\`\`

### Sample Data Structure
\`\`\`javascript
const data = {
  authors: [
    {
      id: 1,
      name: 'chirag',
      bookIds: ['101', '102'],
    },
    {
      id: 2,
      name: 'akshay',
      bookIds: ['103'],
    },
  ],
  books: [
    {
      id: 1,
      title: 'namaste',
      publishedYear: 2024,
      authorId: '1',
    },
  ],
};
\`\`\`

### Basic Query Resolver
\`\`\`javascript
const resolvers = {
  Query: {
    authors: () => {
      return data.authors;
    },
    books: () => {
      return data.books;
    },
  },
};
\`\`\`

## Implementing Relations

When implementing relations between authors and books:
- For finding author of a book: Add book resolver with author field
- For finding books of an author: Add author resolver with books field

\`\`\`javascript
const resolvers = {
  Book: {
    author: (parent) => {
      return data.authors.find((authorDetail) => authorDetail.id === parent.authorId)
    }
  },
  Author: {
    books: (parent) => {
      return data.books.filter((book) => parent.bookIds.includes(book.id))
    }
  },
  Query: {
    authors: () => {
      return data.authors;
    },
    books: () => {
      return data.books;
    },
  },
};
\`\`\`

## Mutations

### Adding a Book
\`\`\`graphql
type Mutation {
    addBook(title: String!, publishedYear: Int, authorId: ID!): Book
}
\`\`\`

### Mutation Resolver
\`\`\`javascript
Mutation: {
    addBook: (parent, args) => {
        // Ideally updating db
        const newBook = { ...args }
        data.books.push(newBook)
        return newBook
    }
}
\`\`\`

## Additional Topics
- Frontend Integration
- GraphQL Tools
- Advanced Concepts

5. gRPC (Google Remote Procedure Call)

gRPC is used to call functions written in server B from server A (browser to gRPC server is also possible). It internally uses RPC.

### Key Components
- gRPC
- RPC (Remote Procedure Call)
- ProtoBuf (Protocol Buffers)
- REST vs gRPC comparison
- Pros/Cons

### Architecture
\`\`\`
Client functions        Server functions
      |                       |
Client stub            Server stub
      |                       |
RPC runtime    ->    RPC runtime
\`\`\`

### Protocol and Data Transfer
- Uses HTTP/2 (compressed headers, faster communication, single connection to stream data)
- Protocol Buffers (protobuf) for data serialization
- Binary data format for communication
- Single long-lived connection with bidirectional streaming

### Benefits
- Less CPU resource usage
- Mobile-friendly
- Faster due to binary data format
- Efficient for microservices

### Implementation Example

#### Proto File Definition
\`\`\`protobuf
syntax = "proto3"

service CustomerService {
    rpc GetAll(Empty) returns (CustomerList) {}
    rpc Get(CustomerRequestId) returns (Customer) {}
    rpc Insert(Customer) returns (Customer) {}
    rpc Update(Customer) returns (Customer) {}
    rpc Remove(CustomerRequestId) returns (Empty) {}
}

message Empty {}

message CustomerRequestId {
    string id = 1;
}

message CustomerList {
    repeated Customer customers = 1;
}

message Customer {
    string id = 1;
    string name = 2;
    int32 age = 3;
    string address = 4;
}
\`\`\`

#### Server Implementation
\`\`\`javascript
const PROTO_PATH = './customer.proto';
const grpc = require("grpc");
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const customerProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

server.addService(customersProto.CustomerService.service, {
    getAll: (call, callback) => {
        callback(null, { customers })
    },
    // Other method implementations...
});

server.bind("127.0.0.1", grpc.ServerCredentials.createInsecure())
server.start();
\`\`\`

### Advantages and Disadvantages

#### Advantages
- Performance (10x faster with protobuf)
- Bidirectional streaming
- Code generation
- Language agnostic
- Service discovery
- Security

#### Disadvantages
- Non-human readable format (binary)
- Limited browser support
- No edge caching (due to POST method)
- Steeper learning curve

## Push vs Pull Communication

### Push Mechanism
**Definition**: Server actively sends data to receiver without request.

#### Characteristics
- Automatic data pushing
- Real-time updates
- May have synchronization challenges

#### Examples
- Push notifications
- Email delivery
- Server-Sent Events (SSE)
- Webhooks

### Pull Mechanism
**Definition**: Client requests data from server when needed.

#### Characteristics
- Client controls timing
- On-demand data retrieval
- Better for periodic updates

#### Examples
- Web browsing
- API polling
- Database queries

### Comparison

| Aspect | Push | Pull |
|--------|------|------|
| Initiator | Server pushes | Client requests |
| Data Transfer | Automatic, real-time | On-demand |
| Latency | Lower | Higher (depends on polling) |
| Use Cases | Real-time updates | Periodic data fetch |
| Examples | Webhooks, SSE | REST APIs, Polling |

### Real-World Applications

#### News/Notifications
- **Push**: Breaking news alerts
- **Pull**: Manual app refresh

#### Social Media
- **Push**: Instant notifications
- **Pull**: Manual feed refresh

#### Data Synchronization
- **Push**: Automatic file sync
- **Pull**: Manual sync button

## Summary
- REST: Lightweight, stateless communication
- gRPC: Efficient binary protocol for service communication
- Push: Active data sending (notifications)
- Pull: On-demand data retrieval (HTTP requests)
`;
