export const Security = `
# Security

## 1. Security

### HTTPS
- Input/Output sanitization
- Security headers
- CORS
- Authorization, Authentication
- Web storage
- XSS (cross site scripting)
- CSRF
- Iframe protection

### XSS (cross site scripting)
Attacker injecting script in website in any possible way (through URL, query params, forms).

- User session hijacking
- Unauthorized activities
- Capturing keystrokes
- Stealing critical information
- Phishing attack

Example:
\`\`\`html
<div id="username"></div>
<script>
    const name = new URLSearchParams(window.location.search).get('name');
    document.getElementById('username').innerHTML = name;
</script>
\`\`\`

#### Solution:
- List all possible ways to take user input
- Replace \`innerHTML\` with \`innerText\`
- Escaping
- Using libraries like React
- Sanitize: dompurify
- CSP headers

Allowed sources: decided from where scripts/fonts can be loaded (same source/external)
Script nonces: even if someone adds some script, only the nonces which we have added will be executed.
Report only: report the injections

\`Content-Security-Policy: 'default-src self'\`: only load from our own server
\`script-src 'self' "external-url"\`: load from our server and external-url

Example:
\`\`\`html
<script nonce="myKey"></script>
\`script-src 'self' 'nonce-myKey' "external-url"\`: load from our server and external-url
\`\`\`

### b. Security headers:

- \`X-powered-by\`: This header says the server, this should not be exposed, use \`removeHeader('X-powered-by')\`
- \`Referrer-policy\`: This is used to hide unwanted query params or other info in URL when redirecting from one page to another. There are multiple options, we can keep origin so that it will share only origin in referrer value. Or no-referrer (no referrer will be added)
- \`X-Content-Type-Options\`: no-sniff (If someone changes the file server sent to browser, e.g., instead of jpg to html, the Browser assumes based on the content of response and execute, to avoid this over smartness, we should keep no-sniff, so that whatever server sends will be used).
- \`X-XSS-Protection\`: used for blocking, blocking and reporting
- \`HSTS\`: strict transport security -> suppose we have a system running on https and http, when user redirects to http it will redirect to https.
    When we don't want to expose http server, but when user redirects to http, we can set this header, initially the server will redirect to https, then subsequent requests will be taken care of by the server to redirect to https.
    Even if we don't want to go the first http request to server, we can use hsts preload, browser will cache it no request made to server.

Example:
\`\`\`javascript
Strict-Transport-Security: max-age=value; includeSubDomains; preload
if (req.headers['x-forwarded-proto'] !== 'https') { 
    return res.redirect(301, 'https://req.headers.host}req.originalUrl'); 
}
\`\`\`

### c. Client side security
- Storing sensitive data on client storage
    - try storing at server
    - encrypt data
    - token expiry
- Authentication
    - JWT/OAuth
    - Session token expiry
    - MFA: OTP or other 2-factor authentication
- Data Integrity
    - checksum: suppose if we are using encryption and attacker knows the encryption logic, now introducing a checksum adds a new layer of security to decrypt data.
- Storage limit: we need to consider the storage limit, and check storage left before saving
    - localStorage (5-10mb)
    - sessionStorage (5-10mb)
    - indexedDB: (50-100mb)
    - cookie (4kb-20kb)
    - cache (~100mb)
- Session Management
    - httponly: true

### d. HTTPS
- Data encryption: the data transferred between client and server through TLS is encrypted and unreadable.
- Authentication: An SSL certificate provided to client (certificate authority) which is used for authentication, when the certificate provided by server to client has some issues, we will get warnings/errors
- Data integrity: using checksum/encryption to ensure the data transferred is not manipulated (MAC: message authentication code)
- Protection against phishing attacks: creating an exact replica of a website which is having http, can be immediately understandable, most of the company original website use https
- Data privacy: data cannot be read by anyone between client and server when there is 
- Compliance with security standards: some of the compliances say until the website has https they are not going to accept.
- Trust and reputation: when we visit a website with https, it shows a protection symbol for customers
- Search engine ranking: website with https will have more ranking than http.
- Protection against browser warnings: browser shows a warning in case of http, you still want to proceed?
- Faster website loading 

### e. Dependency security
- We have some dependency on some packages, and those packages depend on other packages. All these packages can have vulnerabilities other than the code we write.
- Regular audit of dependencies: npm audit, npm update (A regular checking of dependencies and vulnerabilities, don't blindly use \`npm audit fix\`: which can break logics)
- Enforcing audits: we can make use of \`dependabot.yml\` in GitHub which will audit weekly or in an interval given. Also, we can write a config so that in a particular branch when someone commits run npm audit.
- Code & dependency audits: codeql 
- Dependency locking: \`package-lock.json\` (we can lock dependency versions for unwanted updating packages and introducing vulnerabilities)
- Security penetration testing using tools: App scanner, Burp suite

### f. Compliance & regulations
- Data protection: data encryption, consent before getting user details, data access limitations (like admin access, user access)
- Health care: encrypt patient details, MFA for accessing patient records, if data no longer required delete it
- Financial services: use tokenization for sensitive data, monitor log all access (who all accessing user logs), implement secure coding for payment
- Government:
- Cloud services:
- Accessibility: conduct accessibility tests, for users with disabilities should be able to access
- Cyber security

### g. Input Validation
- Use framework library
- Whitelist validation: define valid data and restrict unwanted character/input from user
- Regular expression: use regular expressions for validating user input
- Escape user input: check user input, don't allow input with script tag (\`< >\`)
- Parameterized URLs: taking data from query param and shouldn't process without validation
- Validate data types: before processing the data, check the data type of inputs (don't accept buffer where number is expected)
- Length & size check: always add length restriction for user input
- Images & files: restrict file size while upload
- Add client-side validation: don't blindly depend on server-side validation
- Error handling: global error handling
- Security headers
- Regular updates & patch: if dependency using vulnerability fixes update package
- Security audits and testing
- Educate
- Avoid third-party library: depending on third-party package which has vulnerabilities will be a bottleneck

### h. Server side javascript injection (SSJI)
This will happen when the input given by the user executed at server side and exposed sensitive data to attackers.
- Inadequate input validation

Example:
\`\`\`javascript
const userInput = '{"username":"admin", "password":{"$ne":null}}';
const query = 'SELECT * FROM users WHERE data = userInput';
\`\`\`
This will execute query and share sensitive information

Example:
\`\`\`javascript
const userCode = req.body.code;
eval(userCode); // do not execute user input directly
\`\`\`
Direct execution of user-provided code

Example:
\`\`\`javascript
const serializedData = req.body.code;
const deserializedData = deserialize(serializedData); // do not execute without validating
Check JSON.parse(serializedData) first
\`\`\`

### i. Feature policy | Permission policy
[Permission Policy Demo](https://permissions-policy-demo.glitch.me/demo/)
Suppose if we are using iframe inside our website, that can collect user location, camera or any other information. We can control this behavior with the permission policy header,
Go to application in developer tools and check the permissions allowed.

### j. iFrame protection
This happens when our website loaded inside an iframe in another website, we need to take care of data theft from parent, or parent trying to Click hijacking. 
- Click hijacking: malicious technique where an attacker tricks a user into clicking on something different from what the user perceives, effectively hijacking clicks meant for another web page.
- Data theft via javascript
- Session & cookie theft

#### Mitigations:
- \`X-Frame-Options: DENY\`: older option to disable your website loaded in iframe in another website
- \`CSP - frame-ancestor\`: this can be set to self, so that no one can load website in another iframe
- Sandbox iframe
- \`httpOnly: true\`: cookies only accessible by 
- \`Secure: true\`: only sent on https network
- \`sameSite: 'strict'\`: do not include cookies to other domain requests.

### k. Subresource integrity (SRI)
- Browser downloads the resource
- Generate cryptographic hash (using algo sha284, 256 ..etc)
- Generate hash using content + algo + crypto algo
- Compares the generated hash with integrity attribute 

## l. Server Side Request Forgery (SSRF)

This occurs when a public system has access to private systems. A hacker can pass some payload through a public website. Due to unhandled user input/validation, the hacker can run logic in private systems and access databases or get sensitive data.

### Unvalidated User Input

If there is an API which gives an image from a URL query parameter:

\`https://localhost:3001/user/image?imgUrl=http://169.254.169.254/latest/meta-data\`

If this is not properly handled, an attacker can make API calls to any private system and get data.

**Example for validation:**

\`\`\`typescript
const userUrl = req.query.url;
if (isValidUrl(userUrl)) {
    // Do something
}
\`\`\`

### Lack of Whitelisting

Always check the URL is in allowed domains. We should not allow users to make calls to any private systems.

\`\`\`typescript
const allowedDomains = ["www.google.com"];
if (isAllowedDomains(userUrl)) {
    // Do something
}
\`\`\`

### Insufficient Access Control
There are libraries to set access control like \`node-fetch\` or \`axios\`.

### XML External Entity (XXE)
SVG, HTML, etc., look like XML. While serializing, we should validate the input. Either HTML or XML with vulnerabilities may leak data.

**Example:**
\`\`\`xml
<!DOCTYPE foo [
    <!ELEMENT foo ANY >
    <!ELEMENT xxe SYSTEM "file:///etc/password" >
]>
<foo>&xxe;</foo>
\`\`\`

## 2. CORS (Cross-Origin Resource Sharing)
By default, the browser blocks cross-origin requests and throws a CORS error. This can be fixed with a CORS extension. Even if the client side is passed, from the server level, we can add a CORS package and add \`alloworigin\`, and only those allowed origins can call APIs. The rest will be thrown a CORS error again.

Whenever the protocol, port, subdomain, or domain changes, the browser first calls an OPTIONS API to the server to check whether this client can call this API or not. If yes, then the original request is sent to the server; otherwise, a CORS error occurs.

### SOP (Same Origin Policy)
The browser by default applies this. We can make requests to the same origin, not to other origins.

### Cross-Origin Requests
Different protocol, port, subdomain, or domain changes are considered as different origins, and the browser doesn't permit requests by default.

### CORS Headers
- \`Access-Control-Allow-Origin\`: Controls the origin requests can be made
- \`Access-Control-Allow-Methods\`: Controls the methods (only GET, not DELETE or any other methods)
- \`Access-Control-Allow-Headers\`: Controls the headers to be passed in requests
- \`Access-Control-Allow-Credentials\`: Defines whether the session cookie or credential should be sent in requests
- \`Access-Control-Expose-Headers\`: Controls custom headers (e.g., X-useragent, x-username)

## 3. CSRF (Cross-Site Request Forgery)
This happens when, for example, we receive an email containing a button that opens a bank website with query parameters. It contains the account number and amount, and it will redirect. Since the user is already logged in to the bank website, it will call bank APIs to make a transaction.

### Reason
- Statelessness of HTTP: The server doesn't understand where this request comes from; it only checks if the cookie is valid
- User authentication

### Vulnerabilities
- GET API call to update data or perform action:

\`\`\`html
<a href="https://banksite?accid=12&amt=10000">offer</a>
<form method="POST">
    <input type="hidden" name="accId" value="1121"/>
    <input type="hidden" name="amount" value="1000000"/>
    <input type="submit" value="get iphone"/>
</form>
\`\`\`

### Mitigation
- **Anti CSRF Token**: A CSRF token is generated at the server and added as a hidden field inside the form. When the user submits the form, this value is passed in the payload, and the server validates it. The CSRF token is stored in the user session at the server.
- **Same Site Cookies**: When an attacker redirects a user from their website to the bank, ideally the bank website shouldn't add cookies in the request.
    \`Set-Cookie: SameSite=Strict; Secure\`
    - \`lax\`: Allow cross-site
    - \`strict\`: Only same site (not subdomain or anything)
    - \`none\`: Anything will add cookies
- **Referer Based Validate**: Check at the server if the request originated from the same origin
- **Use Captcha**: While doing transactions or requests, add captcha
- **CSP Header**
- **Try to Logout** whenever things are done (e.g., bank website)
- **Don't Ask Browser to Remember Password** (for bank websites)
- **Don't Use GET for Data Update**

## Fraud Activities Mitigation

### 1. Input Validation and Sanitization
**Why**: Prevent malicious input and ensure only valid data is processed.

**How**:
- Use libraries like Yup or Zod for client-side validation
- Validate all user inputs, including forms, query parameters, and uploaded files
- Sanitize user input to prevent SQL injection or XSS attacks

### 2. Secure Authentication and Authorization
**Why**: Ensure only legitimate users access sensitive areas.

**How**:
- Multi-Factor Authentication (MFA): Use SMS, email, or authenticator apps
- Use OAuth2/OpenID Connect for secure login flows
- Enforce role-based access control (RBAC) for sensitive actions
- Use HTTP-only cookies or Secure Local Storage to store tokens

### 3. Prevent Automated Attacks
**Why**: Prevent bots from abusing login, signup, or transaction features.

**How**:
- Implement CAPTCHA (e.g., reCAPTCHA) for forms
- Use rate-limiting and throttling at the backend (e.g., API Gateway or middleware like Nginx)
- Monitor unusual patterns (e.g., many requests from the same IP)

### 4. Data Encryption
**Why**: Protect sensitive data in transit and at rest.

**How**:
- Use HTTPS with TLS for secure data transmission
- Encrypt sensitive data at rest using AES or similar algorithms
- Avoid exposing sensitive information (e.g., financial details) in client-side JavaScript

### 5. Device Fingerprinting
**Why**: Detect unusual devices or locations during user actions.

**How**:
- Use libraries like FingerprintJS to create unique identifiers for devices
- Track user behavior for anomalies (e.g., frequent device or IP changes)

### 6. Monitor and Detect Fraudulent Patterns
**Why**: Detect and block suspicious activities proactively.

**How**:
- Use behavioral analytics (e.g., monitor user login times, locations, and actions)
- Leverage tools like Kibana, Grafana, or Splunk to analyze logs
- Implement machine learning models for fraud detection
    - Example: Track and compare geolocation/IP data with past user activity

### 7. Implement Transaction Monitoring
**Why**: Flag or block suspicious financial transactions.

**How**:
- Set up rules for transaction limits, frequency, or patterns
- Use APIs like FraudLabs Pro or Sift for real-time fraud detection

### 8. Protect Against Cross-Site Scripting (XSS)
**Why**: Prevent attackers from injecting malicious scripts.

**How**:
- Escape user input using libraries like DOMPurify
- Use Content Security Policy (CSP) headers
- Avoid using \`dangerouslySetInnerHTML\` in React unless absolutely necessary

### 9. Secure APIs and Backend

**Why**: React alone cannot fully secure a fintech app; the backend must also be robust.

**How**:
- Validate and sanitize all inputs at the backend.
- Use token-based authentication (e.g., JWT).
- Secure sensitive endpoints with IP whitelisting or VPNs.
- Ensure APIs have proper CORS policies.

### 10. Prevent Man-in-the-Middle (MITM) Attacks

**Why**: Protect data from being intercepted during transmission.

**How**:
- Always use HTTPS.
- Enable HSTS (HTTP Strict Transport Security).
- Verify SSL/TLS certificates regularly.

### 11. Implement Logging and Alerts

**Why**: Identify and respond to fraud attempts in real time.

**How**:
- Log all critical user actions (e.g., login, transaction).
- Use monitoring tools to detect anomalies and alert admins.
    - Example: Use Prometheus with Grafana to monitor patterns.

### 12. Educate Users

**Why**: Reduce phishing and social engineering attacks.

**How**:
- Notify users of login attempts or suspicious activity.
- Encourage strong passwords and provide tools for password management.

## Default React Considerations

- **Error Boundaries**: Catch app-level errors to prevent exposing stack traces.
- **Strict Mode**: Helps identify unsafe lifecycle methods or deprecated practices.

## Recommended Tools for Fraud Prevention

- **Behavior Analytics**: Sift, Riskified, Kount.
- **Device Fingerprinting**: FingerprintJS.
- **CAPTCHA**: Google reCAPTCHA.
- **Monitoring**: Kibana, Grafana, Prometheus.
- **Encryption**: OpenSSL for backend encryption.

## Conclusion

Handling fraud in fintech web applications requires a layered approach combining frontend security practices, backend validations, and real-time monitoring. React can be used effectively for input validation and user-side safeguards, but robust backend and API security are equally critical.
`;
