export const frontendInfra = `
# CSR FE:
**Framework**: React

**Flow**:
Browser -> DNS -> Akamai (CDN & WAF) -> Lambda@Edge/EdgeWorker (for logic at edge) -> AWS S3

**Deployment**:
Bitbucket -> Jenkins -> Docker -> AWS S3

## 1. Web Application Firewall (WAF)
**Placement**: WAF is typically placed between the CDN (like Akamai or CloudFront) and the origin server (S3 or backend servers). When integrated with Akamai, you can use Akamai’s own WAF, or if using AWS CloudFront, AWS WAF can be configured directly on CloudFront.

**How to Add It**:
- For Akamai, you would configure the WAF through Akamai’s management console, specifying rules to block malicious traffic, SQL injection, XSS attacks, etc.
- For AWS CloudFront, you’d create and associate an AWS WAF web ACL with CloudFront. This filters incoming requests based on custom rules (e.g., IP blocking, rate limiting).

## 2. Application Load Balancer (ALB)
**Usage**: ALB is mainly used for handling dynamic requests directed toward backend servers. In a server-based setup, ALB distributes incoming traffic across EC2 instances, ECS containers, or Lambda functions.

**When to Use It**: If the application has server-side logic or needs dynamic responses (e.g., user sessions, database interactions), ALB manages that traffic. For purely static frontend content served via S3, ALB is typically unnecessary unless dynamic API calls are part of the frontend.

## 3. Lambda@Edge (or Akamai EdgeWorkers)
**Purpose**: Lambda@Edge (AWS) or EdgeWorkers (Akamai) allow for custom code execution closer to the user’s location, reducing latency.

**Use Cases**:
- **Header Manipulation**: Adding or modifying headers (e.g., security headers or for A/B testing).
- **Authentication**: Checking tokens or session information to validate users before requests hit the origin.
- **Localized Content**: Serving region-specific content by redirecting based on the user’s geographic location.

### Example Workflow with WAF and Lambda@Edge
1. **User Request**: Browser request goes through DNS, resolving to Akamai or CloudFront.
2. **WAF Layer**: Web Application Firewall filters out malicious requests based on set rules.
3. **Edge Processing**: If enabled, Lambda@Edge or EdgeWorkers executes any custom logic (e.g., authentication) before reaching the origin.
4. **Origin Server**: Static content is fetched from S3 or dynamic responses from a backend server through an ALB if necessary.

# SSR:
**Flow**:
Browser -> DNS -> CDN -> Edge Processing (Lambda@Edge / EdgeWorkers) -> Application Server (Backend) -> API Calls (if needed) -> Rendered HTML -> CDN -> Browser

**Detailed Flow**:
1. Browser -> DNS -> CDN (Akamai/CloudFront) [Cache Static Assets]
    - **Cache Hit**: Serve Pre-Rendered HTML + Static Assets
    - **Cache Miss**: Origin Server (SSR Processing)
      - [Authentication & Data Fetching] -> Fully Rendered HTML with Data -> Return HTML to Browser (Initial Load)
2. Browser Receives HTML -> Hydration (React, Vue) -> Client-Side Interactions (AJAX/API Calls) -> Dynamic Content (React updates)

**When to Choose**:
- **CSR**: If your application prioritizes high interactivity and users tend to stay within the app for an extended period.
- **SSR**: If you need quick initial content display, especially for SEO-driven or content-heavy applications.
- **Hybrid Approach**: If you need both fast initial loads and high interactivity, which is ideal for many modern web applications.
`;
