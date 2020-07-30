#/!bin/sh

# Work around for https://github.com/pactflow/docs.pactflow.io/issues/8

index_pages=$(find build -name index.html)

for index_page in ${index_pages}; do        # eg. foo/index.html
  directory=$(dirname "${index_page}")      # eg. foo
  unclean_page="${directory}.html"          # eg. foo.html
  if [ ! -f "${unclean_page}" ]; then
    echo "Copying ${index_page} to ${directory}/index/index.html"
    mkdir -p "${directory}/index"
    cp "${index_page}" "${directory}/index" # eg foo/index/index.html
  fi
done
