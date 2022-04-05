echo "Downloading projects"
echo "=> downloading consumer project"
git clone https://github.com/pactflow/example-bi-directional-consumer-mountebank

echo "=> downloading provider project"
git clone https://github.com/pactflow/example-bi-directional-provider-dredd

echo "Changing into directory of the consumer project: /root/example-bi-directional-provider-dredd"
cd /root/example-bi-directional-provider-dredd
npm i