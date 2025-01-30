export const communication = `
# Communication (Code implementation)

Communication in web development involves a variety of methods and protocols to exchange data between clients and servers. Eg: In a chat box, user sending msg and everytime users wants to refresh the page to get latest data, its not possible, so web sockets are used. Similarly based on different use cases, various communication methods are used.

## 1. Short Polling 

Client polling or requesting server in an interval if data is ready, once data is ready returning the entire data in response (response is not partial, once it is ready the entire data is sent). An API request made to server, server immediately responded with response (either data is ready or not ready).

- **Short live connection**: A request made from client in each interval immediately responded by server.
- **No persistent connection**: No longer connection whatever server has return immediately to client.
- **Less resource utilization**: Since short live connection less resource utilized.
- **Problem with scale**: Suppose a larger amount of users polling same time, millions of requests are created.

### Use cases: 
- Real time system
- Notification
- Cricinfo
- Analytics
- Version update

**Eg**: A restaurant and kitchen, Customer ordered food, and asking waiter in an interval if food is ready, and once food is ready, it is delivered in one go (not partial).

## 2. Long Polling

Client creates a single request to server and server respond once the entire data is ready, no partial data is sent or no multiple calls to server in each interval.

### Implementation: 
Client send request with current data client has, server checks the data send by client and server are same, if not same, server respond with the data server has. Once client receives response, client again sends a new request with new response data, server now waits and check any new update in server data and respond.

- **Single long lived connection**: One single connection from client to server and expecting a new data to be sent. No unnecessary frequent calls to server.
- **Connection is open until get new data/timeout**: Only terminate when new data is available or timeout.
- **Cons**: Large number of connections and more load at server.

### Use cases:
- Real time collaboration: When real time updates are less, long polling are used.

**Eg**: A restaurant and kitchen, Customer ordered food, Waiter waits in kitchen until the entire food is ready and delivered in response. The number waiters needed here is higher since they are going to wait.

## 3. Web Socket

A 2 way real time communication is created, where client can send requests in the channel and server responds in same channel. Initial connection will be an HTTP REST call then server respond with 101 status code for switching communication to web socket.

- **Ws protocol** is used. Wss: secured version like https.
- **Framing**: Small message go directly, long messages transferred in frames.
- **101 switching protocol**.

### Challenges:
- Resource usage (based on num connection).
- Connection limits (consecutive connection).
- Sticky sessions (one user connected to same server).
- Load balancer (same user, same server redirection).
- Authentication (authentication required for web sockets as well).
- Firewall/proxy.
- Cache.
- Scaling.
- Testing / debugging (realtime connection testing complexity).
- Backward compatibility.
- Resource cleanup (once connection dropped, resource cleanup should be taken place).

Short polling/long polling, anything to retrieve from server a request from client should made, but in case of web sockets a bidirectional communication channel is created and helps to send data from client to server and server to client, No new request to be created from client.

### Implementation: 
Install socket package in server and use socket CDN in client, and use emit and on functions to emit and listen for messages. Based on event type handle events.

### Use cases:
- Analytics
- Financial trading
- Online gaming
- Collab (google doc/sheet)

Web socket is a:
- Full duplex communication.
- Single long live TCP connection.
- Continuous bi-directional communication.

Initially a handshake HTTP upgrade request made to server, and server return 101 status code and HTTP upgrade has been done, HTTP to socket connection migration, a connection is opened now and in a channel using single long live TCP connection bidirectional messages are sent, once logout or any other case, connection is closed.

**Eg**: A restaurant and kitchen, Customer ordered food, And asking waiter to keep the menu card and customer will keep on ordering. Once any food is ready, it is served, and rest of them keep preparing and served once they are finished, also customer can make new food orders, its a 2 way communication not waiting for entire food to prepare and served.

## 4. SSE (Server Sent Event)

An HTTP connection made from client to server, and it is a long live connection similar to long polling but difference is that the data is send in between this connection, not one time entire data and closing it.

- **Long live unidirectional communication**: Whenever there is a change in data server keeps sending the data to client.
- **Single HTTP connection**: Feeds, notification, monitoring dashboard.
- **Connection**: Keep-live.
- **Event-stream**: Small data sent once, large data in frames.
- **Event | data | id**: These are related to event, eg: id used to understand till when the frames are received by client and keep sending the rest of the frames.

### Implementation:
Headers required: 
- Content-type: text/event-stream: events as stream.
- Connection: keep-alive: single long live connection.
- Cache-control: ‘no-cache’: no cache since streaming.

Code: Create an endpoint for SSE, Set above headers for response,
\`res.write('data:welcome to sse');\`
Create a setInterval and \`res.write('new event stream data');\`
Listen to close and clearInterval.

### FE: 
Use EventSource('/sse') and listen to onmessage.

### Challenges:
- Browser compatibility.
- Connection limit: Browser can have only 5-6 simultaneous requests, in case of SSE, it already occupy one connection, now we can have only 4-5 requests simultaneously.
- Connection timeout: Browser is smart enough to handle this, but we should have this handling.
- Background tab behaviour.
- Resource utilization.
- Load balancer.
- Sticky connection.
- Proxy/firewall: Enable these.
- Testing.
- Broadcasting.

**Eg**: A restaurant and kitchen, Customer ordered food, Now someone sponsoring drinks, and since every customers sitting in restaurant receives drinks. Or a bday celebration, every customers getting cake.

## 5. Webhooks

Webhooks are similar to web APIs, but these are triggered based on some events. On a particular event some action is taken.

- **Realtime communication**.
- **Event driven**.
- **Post REST API**: A post API exposed and triggered on some event.
- **Authorization**: A secret will be shared with 3rd parties when they call webhooks use this key.
- **Retry**: Post API failed retry scenarios.
- **Verification/Acknowledgement**: To ack 3rd parties hook/post API success.

### Use cases:
- Notification system (generating a report by 3rd party, 3rd party calls web hook, and then notification is triggered).
- Data synchronization: Eg: Also post on fb (whatever posts on insta triggers to fb).
- Automation: Github CI/CD, once required approval received, start a report generation and notify once generated. In github option for webhooks: Add endpoint secret, it will call webhook post API with required payload on different scenarios (eg: pull request, merge ..etc).

### Implementation: 
Create a new POST API, and provide endpoint and request details and secret to 3rd parties, once activity is done, they will notify by calling this API, and our server can react then and there or pushing kafka queue and do something later.

**Eg**: A restaurant and kitchen, once customers done with food, the leftover should be transferred to hungry people. Based on some events some actions are taken.
`;
