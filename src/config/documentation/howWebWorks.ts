export const howWebWorks = `
# Complete Workflow: From Typing URL to Rendering Web Page

## Typing URL in Browser
When a user enters a URL in the browser (e.g., https://www.google.com/api/search?que=home), the browser identifies different components:
- **Scheme**: https or wss (indicating secure communication).
- **Domain**: www.google.com
- **Path**: /api/search
- **Query Parameters**: que=home (additional information).

## DNS Lookup
Since users type domain names instead of IP addresses, the browser initiates a DNS lookup to resolve the domain into an IP address. The process involves:
1. **Browser Cache**: Checks for a cached IP address.
2. **OS Cache**: If not found in the browser, the OS cache is checked.
3. **DNS Resolver**: Contacts the DNS resolver (configured by the router or ISP).
4. **Root Server**: The DNS resolver queries one of the 13 globally distributed root servers for the TLD server's IP.
5. **TLD Server**: The TLD server provides the IP address of the authoritative name server for the domain.
6. **Authoritative Name Server**: Returns the final IP address for the requested domain.

### Example Resolution:
- **Resolver → Root Server**: "Where is .com?"
- **Root Server**: "Ask the .com TLD server at IP 192.5.6.30."
- **Resolver → TLD Server**: "Where is google.com?"
- **TLD Server**: "Ask google.com's authoritative server at IP 216.239.32.10."
- **Resolver → Authoritative Server**: "What is the IP of www.google.com?"
- **Authoritative Server**: "The IP is 142.250.64.78."

### DNS Records Stored:
- **Root Servers**: Map TLDs to TLD server IPs (e.g., .com -> 192.5.6.30).
- **TLD Servers**: Map domains to authoritative name server IPs (e.g., google.com -> 216.239.32.10).
- **Authoritative Name Servers**: Store full DNS records (e.g., www.google.com -> 142.250.64.78).

## TCP Connection
Once the IP address is resolved, the browser establishes a TCP connection with the server. The purpose of the TCP connection is to:
- Ensure reliable data transmission by dividing data into packets and retransmitting lost packets.
- Maintain data order by reassembling packets in the correct sequence.
- Use a three-way handshake (SYN, SYN-ACK, ACK) to establish the connection.

## SSL/TLS Handshake
If the URL uses HTTPS, the browser initiates an SSL/TLS handshake:
- The client and server exchange certificates to establish trust.
- A secure session key is generated for encryption.

## HTTP Request and Response
The browser sends an HTTP request formatted according to the HTTP specification, including details like the URL, method, headers, and body.
The server processes the request and responds with the appropriate content type (e.g., text/html, application/json).

## Returning HTML
The server's response contains the requested HTML, which the browser begins to render.

## Parsing and Rendering

### HTML Parsing:
- The browser parses raw HTML bytes into characters, tokens, and objects.
- These objects are organized into nodes and a DOM (Document Object Model) tree.

### CSS Parsing:
- Linked CSS files are downloaded and parsed into a CSSOM (CSS Object Model).

### Render Tree:
- The DOM and CSSOM are combined to create a render tree, which is passed to the browser engine.
- The render tree determines how elements will be displayed.

### JavaScript Execution:
- When a <script> tag is encountered, HTML parsing stops, and JavaScript execution begins.
- JavaScript execution halts until the CSSOM is ready if it manipulates styles.

## Painting and Display
- The render tree is used to paint pixels onto the screen.
- The browser continues making requests for additional resources (images, videos, etc.) as needed.

## Additional Notes
- If the response is a file type (e.g., PDF), the browser downloads it instead of rendering it.
- **Caching**: DNS and resource caching at various levels (browser, OS, server) speeds up future requests.

## Domain Purchase and Zone Configuration
When purchasing a domain, the registrar allows adding DNS records (e.g., A, MX, CNAME) to configure mappings.
These records are stored in the authoritative name servers and propagated to other DNS servers over time.
By following this sequence, the browser renders the complete web page for the user.

# Protocols, API Architectures, and Communication Methods: A Comprehensive Guide

## 1. HTTP Protocol
HTTP (Hypertext Transfer Protocol) is the foundation of data exchange on the web. It defines how a client (like a web browser) and a server communicate. HTTP is stateless, meaning each request is independent of previous ones, and connectionless, meaning connections are opened and closed for each request.

### HTTPS:
HTTPS is the secure version of HTTP, using SSL/TLS encryption to secure data transmission. It ensures the integrity, confidentiality, and authenticity of the data, which is especially important for sensitive transactions like logins, payments, or personal data exchange.

## 2. API Architectures
API architectures define the rules and structures for building web services that facilitate communication between clients and servers. While HTTP is commonly used as the protocol for communication in these architectures, each has its unique characteristics and best-use cases:

### REST (Representational State Transfer)
REST is an architectural style for designing networked applications that use standard HTTP methods (GET, POST, PUT, DELETE). It relies on stateless communication and is designed around the concept of resources, each of which is identified by a URL.
- **Protocol**: HTTP
- **Best for**: Simple, stateless interactions (e.g., CRUD operations for data).
- **Use Cases**: Fetching user data, creating a new post, or updating product details.

### GraphQL
GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define. Unlike REST, where the server defines the structure of responses, GraphQL allows the client to specify the data it needs, reducing over-fetching or under-fetching of data.
- **Protocol**: HTTP
- **Best for**: Optimized and flexible queries, especially for complex data models or frontend-heavy applications.
- **Use Cases**: Fetching a user’s details, posts, and comments in a single query.

### gRPC
gRPC (Google Remote Procedure Call) is a high-performance RPC framework that uses HTTP/2 and Protocol Buffers for communication. gRPC is designed for low-latency, high-throughput communication and supports bidirectional streaming, making it suitable for microservices communication and real-time applications.
- **Protocol**: HTTP/2, Protocol Buffers
- **Best for**: High-performance applications requiring bidirectional streaming and low latency.
- **Use Cases**: Microservices architectures, internal communication between services.

## 3. Communication Methods
Communication methods describe how data is exchanged between clients and servers or between different systems. These methods can be layered on top of a protocol like HTTP and determine how data is transmitted and handled. Below are the most commonly used communication methods:

### Short Polling
Short polling is a method where the client sends repeated HTTP requests to the server at regular intervals to check for updates. If no updates are available, the server responds with an empty or default response.
- **Protocol**: HTTP
- **API Architecture**: REST
- **Best for**: Use cases with periodic, but infrequent, updates (e.g., a notification system where updates are not critical).
- **When to Use**: Use when updates are infrequent and real-time data is not critical. It’s simple and can be easily implemented but is inefficient due to constant request intervals.
- **Examples**: Checking for new posts in a forum every few seconds, refreshing content.

### Long Polling
Long polling is a variation of polling where the client sends a request to the server and waits for a response. The server holds the request open until there is new data to send, at which point it responds. The client immediately sends a new request to continue the process.
- **Protocol**: HTTP
- **API Architecture**: REST
- **Best for**: Real-time communication with minimal overhead compared to short polling.
- **When to Use**: Use when near real-time updates are needed but you want to avoid the overhead of WebSockets. It's more efficient than short polling but still involves waiting for a response.
- **Examples**: Real-time chat apps, systems needing frequent updates (e.g., stock prices, auction updates).

### WebSockets
WebSockets is a protocol that provides full-duplex communication over a single TCP connection. After an initial handshake over HTTP, the connection is upgraded to WebSockets, and both the client and server can send data at any time without re-establishing a connection.
- **Protocol**: WebSocket (upgraded from HTTP)
- **API Architecture**: REST, gRPC
- **Best for**: Real-time, low-latency communication where both parties need to send data asynchronously.
- **When to Use**: Ideal for applications that require low-latency, real-time, full-duplex communication where both the client and server send data asynchronously.
- **Examples**: Online multiplayer games, real-time stock market feeds, collaborative tools like Google Docs.

### Server-Sent Events (SSE)
Server-Sent Events is a one-way communication protocol where the server sends updates to the client over a single long-lived HTTP connection. The client opens a connection, and the server pushes data when it becomes available.
- **Protocol**: HTTP
- **API Architecture**: REST
- **Best for**: One-way real-time updates from the server to the client.
- **When to Use**: Use when you need real-time updates sent from the server to the client, but only in one direction. It’s simpler than WebSockets for many use cases where bidirectional communication isn’t necessary.
- **Examples**: Live score updates, news websites with live updates, and social media feeds.

### Webhooks
Webhooks are user-defined HTTP callbacks. They are often used in event-driven architectures where a server needs to notify another server or service that an event has occurred, without the need for polling. The server sends a message (usually in the form of an HTTP POST request) to a specified URL.
- **Protocol**: HTTP
- **API Architecture**: REST
- **Best for**: Event-driven systems where one service needs to notify others of events or updates asynchronously.
- **When to Use**: Use when you need an event-driven mechanism where a system (usually a server) needs to notify another system asynchronously when an event occurs.
- **Examples**: Payment gateways sending notifications for completed transactions, GitHub sending commit notifications.

## 4. Query Params, Body, URL, and Headers in HTTP
In the context of HTTP requests, query parameters, body, URL, and headers are integral parts of the request structure. These are components that are often used in both API architectures and communication methods.
- **URL**: The URL identifies the resource or endpoint the client wants to interact with. It typically includes the domain and the path to the resource.
    - **Example**: https://api.example.com/users/123
- **Query Parameters**: Key-value pairs appended to the URL, often used for filtering or passing data to the server in a GET request.
    - **Example**: https://api.example.com/users?active=true
- **Body**: The body of an HTTP request contains the data that needs to be sent to the server. This is typically used for POST and PUT requests, where data (e.g., user information) is submitted to the server.
    - **Example**: JSON data like { "name": "Gokul Janardhanan", "email": "john@example.com" }
- **Headers**: HTTP headers contain metadata about the request. These can include content type, authorization tokens, etc.
    - **Example**: Content-Type: application/json, Authorization: Bearer <token>

## 5. Encryption and Encoding of Data
- **Query Parameters, Body, URL, and Headers**: These elements are typically encoded when sent over HTTP to ensure that data can be safely transmitted. However, encoding (such as URL encoding or Base64) does not provide encryption, meaning data could still be intercepted and read by unauthorized parties if not transmitted over a secure connection.
- **HTTPS**: Only HTTPS encrypts the data, ensuring that the entire HTTP request (including query parameters, headers, and body) is secure during transmission. It’s crucial for protecting sensitive data like login credentials, personal information, or payment details.

## Conclusion
By understanding the distinctions between protocols, API architectures, and communication methods, you can better choose the appropriate tools for your application’s needs. Webhooks, as a communication method, help with asynchronous event-driven notifications, while WebSockets and SSE provide real-time communication solutions.
Each communication method has its ideal use cases depending on whether your application requires real-time updates, one-way communication, or event-driven responses. Similarly, each API architecture, such as REST or GraphQL, serves specific types of interactions and data retrieval, and you can leverage these to optimize how your application communicates with servers.
This structured approach to understanding HTTP protocols, API architectures, and communication methods will guide you in selecting the right technology stack based on the requirements of your project.

## FAQs

### 1. While parsing HTML, does the browser create the DOM in parallel, or does it wait for complete parsing to start DOM creation?
**Answer**:
The DOM is built incrementally as the browser parses the HTML. This means the browser creates the DOM tree in parallel with HTML parsing and doesn't wait for the entire HTML document to be parsed.
- For each element and text node encountered in the HTML, the browser adds it to the DOM tree.
- If the browser encounters external resources (like CSS, JavaScript, or images), it requests those resources and continues parsing HTML (with some exceptions, like blocking scripts).

### 2. Does painting start only after the entire DOM is created, or does it happen progressively as the DOM is being built?
**Answer**:
Painting and rendering can happen progressively as parts of the DOM become available and CSSOM is constructed.
- As soon as the browser has enough information (a combination of DOM and CSSOM), it begins rendering parts of the page.
- The user can start seeing content on the screen before the full DOM is built or all resources are loaded. This is called progressive rendering, which improves perceived performance for users.
- However, some actions can block rendering:
    - **CSS Blocking**: The browser won’t render content until it has parsed all the CSS needed for that part of the DOM. This is why missing or slow-loading CSS can delay visual updates.
    - **JavaScript Blocking**: If JavaScript is encountered and not marked as async or defer, it halts HTML parsing and delays rendering.

### 3. What happens if a CSS file loads after some time, and it contains styles for an existing DOM element?
**Answer**:
If a CSS file is loaded after some time and it includes styles for an already-existing DOM element, the following happens:
- The CSSOM is updated with the new styles.
- The browser recalculates the styles for affected DOM elements.
- If the styles cause changes in layout (e.g., affecting width, height, or position), the browser triggers a reflow (also called layout recalculation).
- If the style changes only involve visual appearance (e.g., color, background), the browser triggers a repaint (without recalculating layout).
- The updated content is rendered to the screen.

For example:
- If the CSS file adds a new background color to a <div>, the browser will repaint that part of the page.
- If it adds margin or width, the browser will reflow and repaint the affected elements.

### 4. Are HTML parsing, DOM creation, CSSOM creation, render tree construction, and painting done synchronously?
**Answer**:
The steps in the rendering pipeline are partially synchronous and partially asynchronous. Here's how they work:
- **HTML Parsing and DOM Creation**: These happen synchronously. The DOM is built incrementally as the HTML is parsed.
- **CSSOM Creation**: CSS parsing is typically done in parallel with HTML parsing, but the rendering of the page may wait for CSS to complete. CSS is considered a "render-blocking resource."
- **Render Tree Construction**: Render Tree creation happens after both the DOM and CSSOM are ready. This is a synchronous process because the browser needs both trees to calculate the visual structure of the page.
- **Layout (Reflow)**: Layout calculations are done synchronously to ensure elements are positioned correctly before being displayed.
- **Painting and Compositing**: Painting and compositing happen asynchronously in most modern browsers, enabling the browser to prioritize rendering visible content and defer offscreen content or animations.

In summary:
- Parsing and tree construction (DOM, CSSOM, and Render Tree) are mostly synchronous.
- Painting and compositing are asynchronous to improve rendering performance.

### Additional Notes
- **CSS and JS Blocking Behavior**: If the browser encounters a <script> tag in the HTML without async or defer, it halts parsing to fetch and execute the script. Similarly, the browser waits for CSS to be fully parsed before continuing with the Render Tree creation to avoid rendering unstyled content (known as a "flash of unstyled content" or FOUC).
- **Progressive Rendering**: Modern browsers optimize rendering to display content as quickly as possible. For example, if the DOM and CSSOM for the first part of the page are ready, the browser may start rendering above-the-fold content even if the rest of the page is still loading.

### Best Practices to Avoid Rendering Delays
- **Inline Critical CSS**: Include the most important CSS inline in the HTML to style the above-the-fold content immediately.
- **Defer Non-Critical CSS**: Use media="print" or load event handlers to load non-essential CSS after rendering.
- **Optimize Delivery**: Use resource hints like <link rel="preload"> to load CSS earlier in the pipeline.
- **Minify and Compress CSS**: Reduce the size of CSS files to speed up downloads.
`;
