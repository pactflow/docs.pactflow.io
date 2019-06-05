#!/bin/bash

set -e
set -o pipefail

if [ "" = "$1" ]; then
  echo "Usage: "
  echo "  deploy-build-container.sh environment"
  echo "  where environment=dev|prod"
  exit 1
fi

environment=$1
ScriptDir=$(dirname $0)

AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-ap-southeast-2}

IMAGE_NAME="build-container-yarn"

if [ "$environment" == "prod" ]; then
  REPOSITORY="$PROD_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
  ECR_ACCOUNT=$PROD_ACCOUNT
else
  REPOSITORY="$DEV_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
  ECR_ACCOUNT=$DEV_ACCOUNT
fi

$(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION --registry-ids $ECR_ACCOUNT)

CurrentTag=$(docker images $REPOSITORY/$IMAGE_NAME --format '{{.Tag}}' | awk '/[0-9]/' | sort -g | tail -n 1)

pushd $ScriptDir/../build-container

docker build . -t $IMAGE_NAME
docker tag $IMAGE_NAME:latest $REPOSITORY/$IMAGE_NAME:$((CurrentTag+1))
docker tag $IMAGE_NAME:latest $REPOSITORY/$IMAGE_NAME:latest
docker push $REPOSITORY/$IMAGE_NAME:$((CurrentTag+1))
docker push $REPOSITORY/$IMAGE_NAME:latest

popd
