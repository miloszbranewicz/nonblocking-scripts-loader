# nonblocking-scripts-loader

Load third-party scripts in a non-blocking, performance-friendly way.

## Overview

**nonblocking-scripts-loader** is a lightweight JavaScript utility for loading external scripts (like analytics, maps, or widgets) without blocking the initial render or delaying critical resources. It leverages `requestIdleCallback` for efficient loading when possible, and falls back to window events otherwise.

## Features

- **Non-blocking loading:** Uses browser idle time or page load events.
- **Flexible script options:** Supports async, defer, custom attributes, and IDs.
- **Promise-based:** Handles load errors gracefully.
- **Zero dependencies:** Simple, pure JavaScript.

## Usage

1. **Configure the scripts you want to load**  
   Edit the `scriptsToLoad` array in `index.js`:
   ```js
   const scriptsToLoad = [
     {
       src: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&callback=initMap",
       async: true,
       defer: true,
       id: null,
     },
     // Add more scripts here
   ];
   ```
2. **Include the loader in your project**  
   Add `index.js` to your build or include it directly in your HTML.

3. **How it works**  
   - If `requestIdleCallback` is available, scripts load during browser idle periods.
   - Otherwise, scripts load after the `window`'s `load` event.
   - Each script is appended to `<head>` and resolves/rejects via Promise.

## Example

```js
const scriptsToLoad = [
  {
    src: "https://example.com/widget.js",
    async: true,
    defer: true,
    id: "widget-script",
    attributes: { "data-custom": "value" }
  }
];
```

## Error Handling

If a script fails to load, an error is printed to the console.

## Customization

- Add/remove scripts in the `scriptsToLoad` array.
- Pass custom attributes via the `attributes` object.
