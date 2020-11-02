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

# index_dirs=$(find build -name index -type d)

# for index_dir in ${index_dirs}; do        # eg. index
#   directory=$(dirname "${index_dir}")      # eg. my-page from my-page/index
#   index_page="${directory}/index/index.html"          # eg. path/to/my-page/index/index.html
#   target_page="${directory}/index.html"          # eg. path/to/my-page/index.html
#   echo $index_page
#   if [ -f "${index_page}" ]; then
#     echo "Copying ${index_page} to ${directory}/index.html"
#     cp "${index_page}" "${directory}/index.html" # eg foo/index.html
#   fi
# done