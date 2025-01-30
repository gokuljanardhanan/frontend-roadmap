export const LoggingMonitoring = `
# Logging And Monitoring

Logging and monitoring are crucial aspects of web development and operations, ensuring that applications run smoothly, efficiently, and securely. They help in identifying issues, understanding user behavior, and maintaining the overall health of the application.

## Overview

### Logging

- **User interactions**: The user interactions are captured and logged to debug the issues.
- **Performance metrics**: Performance metrics/web vitals like LCP, FCP are captured for performance monitoring.
- **Resource errors**: The resource errors are captured, downstream errors/frontend errors captured and alerts triggered if goes beyond threshold.
- **Never add PII data to Logs**

### Monitoring

- **User drop offs/prod errors** should be monitored and alerted.
- **Alerts**: A threshold will be set for API failures or system failures which will trigger an alert (e.g., a Slack message/email), so that the respective on-call/dev can take action. No need to monitor the logs every time.

## Fix

- **Prioritization**
- **Debugging**
- **Mitigation**

## 3 parts

1. **Collect**: Log, error trace, performance metrics, user interactivity, system metrics, debugging data.
2. **Monitor**: Set threshold and trigger alerts.
3. **Fix**: Fix issues so that the same won't happen again.

### 1. Telemetry

- **Performance metric**
    - Eg: User facing performance issues while interacting with web page or user drop offs.
    - **Metrics**: web vitals, API response time, Feature time (drawing in canvas, iteration or heavy calculation logic, Resource timing (Image loading)).
    - **Resources usage (CPU, memory)**: The user device memory and CPU affecting web performance.
    - **Paint timings, Network (API response time), frame rates** (every system has a framerate).

- **Resource errors**
    - Eg: When user trying to add products to cart and failing.
    - **5XX, 4XX**
    - **API failure**
    - **Network error** (internet switching or offline).
    - **Client exception** (JS code throwing errors).

- **User interactions**
    - Understanding where the users spending more time in web page and where drop offs happens is very important, capturing user interaction and making changes will help improve conversion rate.
    - **Clicks**
    - **Scroll**
    - **Form submission**
    - **Browser event**

- **Resource utilization**
    - **Resource usage (CPU, Memory)**

- **Custom Event**
    - Capturing custom events such as purchases or product-specific events will help in debugging and improving conversion rate.
    - **Purchases**
    - **Feature usage**: login (Google login, LinkedIn login)

### Tools

- **MS Clarity**
- **Google Analytics**
- **Sentry**
- **LogRocket**
- **Open telemetry**

These tools will help to see data in a dashboard, where it will show:
- **Referrer**: where the user is coming from.
- **Campaign**: if any campaign is going on.
- **Most visited pages**
- **Browser details**
- **Country traffic**
- **JS exception**
- **User interactions**: The flow user gone through.
- **Percentage of clicks on different parts of page**

### How to add tools in web page

In every tool, there will be a script which we can add in 'index.html', and the rest of the details will be sent to the particular tools.

- **Sentry**: Captures the console errors and traces shown in dashboard with the exact error, and the file and other details.
    - **Performance, web vitals, LCP and other details shown here.**

- **Correlation id**: Suppose FE calls server, server calls downstream systems, in order to track the entire flow, there will be a Correlation id mapped, to track the entire flow.
- **Feature flags**: With these tools, we can enable/disable feature for limited users.

### 2. Monitor

Below are the steps to monitor and alert, logging the event metrics and setting proper thresholds based on the event category. Once threshold exceeds, creates alerts with proper alert type (critical, warning, etc.). Either someone needs to check 24*7 the issues, or keep a proper logging alerting system based on criticality alert on email, SMS, or Slack and the responsible on-call dev can check and fix the issues.

- **Event metrics**
- **Set thresholds**: Setting threshold based on the category (Performance, resources, user action). Attacker trying to click on something, and threshold can be set based on that.
- **Threshold exceeds**
- **Alert**: Mail, Slack, SMS, PagerDuty, Squadcast, Zenduty, on-call.

In tools like Sentry: there will be an option to create alerts, select the rules and select the alert type like critical, warning, etc.

### 3. Fix

- **Prioritize**: The system may encounter thousands of alerts and issues, working on everything will never work, prioritizing the alerts or issues is very important. P0, P1, P2 and based on the priority pick the issues and fix.
- **Debug**:
    - **Source map**: The build will be uglified and minified, keeping source map will be helpful for debugging and understanding where exactly the issue happened.
    - **Session replay**: In these tools, there is an option to replay the user actions for debugging, it will contain the user action, network calls, redux update, etc.
- **Mitigation**:
    - **Rollback**: If the feature is critical and impacting larger customers, rollback.
    - **Hotfix**: If the issue identified and less impacting, create a PR only contains the issue fix and deploy.

### Prevention

- **Unit tests**: Always add unit test cases and test code thoroughly.
- **Linting**: Add linting to avoid issues while developing.
- **Type check**: Always add TypeScript for type check.
- **PR Review**: Proper PR review to avoid future bugs.
- **Rate limiting**: Debounce like rate limiting feature in FE.
- **Security and Performance**: Shouldn't allow PR to be merged if any security issues or reducing performance.
`;
