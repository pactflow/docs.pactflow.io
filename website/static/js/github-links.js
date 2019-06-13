window.addEventListener('load', function() {
  document.querySelectorAll('.docLastUpdate').forEach(function(block) {
    let doc = window.location.pathname;
    if (doc.endsWith('.html')) {
      doc = doc.substring(0, doc.length - 5)
    }
    if (doc.endsWith('/')) {
      doc = doc.substring(0, doc.length - 1)
    }
    block.innerHTML = '<a href="https://github.com/pactflow/docs.pactflow.io/blob/master' + doc + '.md">' + 
      block.innerHTML + '&nbsp;<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" /></a>'
  });
});
