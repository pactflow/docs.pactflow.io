// Workaround to fix Docusaurus issue with internal links when there is a trailing slash in the URL
// For more info: https://github.com/facebook/docusaurus/issues/2394
if (window && window.location && window.location.pathname.endsWith('/') && window.location.pathname !== '/') {
  window.history.replaceState('', '', window.location.pathname.substr(0, window.location.pathname.length - 1))
}