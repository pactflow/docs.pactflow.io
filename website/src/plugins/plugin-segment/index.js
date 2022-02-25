module.exports = function (context, options) {
  return {
    name: "segment-plugin",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
              !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="x4IJFcuQiM9mUgD1msMDyYvGmdNPC2pG";analytics.SNIPPET_VERSION="4.13.2";
              analytics.load("x4IJFcuQiM9mUgD1msMDyYvGmdNPC2pG");
              analytics.page();
              }}();`,
          },
          {
            tagName: "script",
            innerHTML: `const uuid = localStorage.getItem('ajs_user_id'); if (analytics && uuid) {analytics.identify(uuid.replaceAll(/[^a-zA-z0-9\-]/ig, '').replaceAll('\\\\', ''));}`,
          },
        ],
      };
    },
  };
};
