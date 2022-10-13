const languages = {
  js: {
    iconTitle: 'JavaScript',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/javascript-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/javascript',
    contentUrl: '',
    content: ''
  },
  java: {
    iconTitle: 'Java',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/java-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/jvm',
    contentUrl: '',
    content: ''
  },
  golang: {
    iconTitle: 'Golang',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/go-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/go',
    contentUrl: '',
    content: ''
  },
  ruby: {
    iconTitle: 'Ruby',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/ruby-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/ruby/readme',
    contentUrl: '',
    content: ''
  },
  dotnet: {
    iconTitle: '.NET',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/csharp-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/net',
    contentUrl: '',
    content: ''
  },
  docker: {
    iconTitle: 'Docker',
    iconLocation: 'https://www.svgrepo.com/show/331370/docker.svg',
    iconLink: 'https://docs.pact.io/docker',
    contentUrl: '',
    content: ''
  },
  kotlin: {
    iconTitle: 'Kotlin',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/kotlin-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/jvm',
    contentUrl: '',
    content: ''
  },
  scala: {
    iconTitle: 'Scala',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/scala-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/jvm',
    contentUrl: '',
    content: ''
  },
  clojure: {
    iconTitle: 'Clojure',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/clojure-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/jvm',
    contentUrl: '',
    content: ''
  },
  python: {
    iconTitle: 'Python',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/python-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/python',
    contentUrl: '',
    content: ''
  },
  swift: {
    iconTitle: 'Swift and Objective-C',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/swift-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/swift',
    contentUrl: '',
    content: ''
  },
  php: {
    iconTitle: 'PHP',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/php-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/php',
    contentUrl: '',
    content: ''
  },
  cplusplus: {
    iconTitle: 'C++',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact.io/master/pages/assets/img/languages/csharp-original.svg',
    iconLink: 'https://docs.pact.io/implementation_guides/cpp',
    contentUrl: '',
    content: ''
  }
};

const testing_tools = {
  readyapi: {
    iconTitle: 'ReadyAPI',
    iconLocation:
      'https://static0.smartbear.co/smartbearbrand/media/images/logos/icons/ra_icon-clr.svg',
    iconLink: '/docs/examples/bi-directional/provider/readyapi/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'provider'
  },
  soapui: {
    iconTitle: 'SoapUI',
    iconLocation:
      'https://www.soapui.org/smartbearbrand/media/images/home/soapui-icon.svg',
    iconLink: '/docs/examples/bi-directional/provider/soapui/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'provider'
  },
  postman: {
    iconTitle: 'Postman',
    iconLocation: 'https://cdn.worldvectorlogo.com/logos/postman.svg',
    iconLink: '/docs/examples/bi-directional/provider/postman/',
    contentUrl: '',
    content: '',
    iconType: 'svg',
    side: 'provider'
  },
  restassured: {
    iconTitle: 'REST-assured',
    iconLocation: 'https://rest-assured.io/img/logo-transparent.png',
    iconLink: '/docs/examples/bi-directional/provider/restassured/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'provider'
  },
  dredd: {
    iconTitle: 'Dredd',
    iconLocation: 'https://dredd.org/en/latest/_images/dredd.png',
    iconLink: '/docs/examples/bi-directional/provider/dredd/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'provider'
  },
  schemathesis: {
    iconTitle: 'Schemathesis',
    iconLocation:
      'https://res.cloudinary.com/apideck/image/upload/w_200,f_auto/v1626657729/icons/schemathesis.png',
    iconLink: '/docs/examples/bi-directional/provider/dotnet/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'provider'
  },
  cypress: {
    iconTitle: 'Cypress',
    iconLocation: 'https://seekicon.com/free-icon-download/cypress_1.svg',
    iconLink: '/docs/examples/bi-directional/consumer/cypress/',
    contentUrl: '',
    content: '',
    iconType: 'svg',
    side: 'consumer'
  },
  wiremock: {
    iconTitle: 'Wiremock',
    iconLocation: 'https://wiremock.org/images/wireMockLogo.png',
    iconLink: '/docs/examples/bi-directional/consumer/wiremock/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'consumer'
  },
  nock: {
    iconTitle: 'Nock',
    iconLocation: 'https://www.svgrepo.com/show/263799/replay.svg',
    iconLink: '/docs/examples/bi-directional/consumer/recordreplay/',
    contentUrl: '',
    content: '',
    iconType: 'svg',
    side: 'consumer'
  },
  mountebank: {
    iconTitle: 'Mountebank',
    iconLocation: 'https://www.mbtest.org/images/mountebank.png',
    iconLink: '/docs/examples/bi-directional/consumer/mountebank/',
    contentUrl: '',
    content: '',
    iconType: 'png',
    side: 'consumer'
  },
  pact: {
    iconTitle: 'Pact',
    iconLocation:
      'https://raw.githubusercontent.com/pact-foundation/pact-logo/master/media/link.svg',
    iconLink: '/docs/examples/bi-directional/consumer/dotnet/',
    contentUrl: '',
    content: '',
    iconType: 'svg',
    side: 'consumer'
  },
  msw: {
    iconTitle: 'Mock Service Worker',
    iconLocation:
      'https://raw.githubusercontent.com/mswjs/msw/main/media/msw-logo.svg',
    iconLink: '/docs/examples/bi-directional/consumer/msw/',
    contentUrl: '',
    content: '',
    iconType: 'svg',
    side: 'consumer'
  }
};

const testing_tools_providers = [
  'dredd',
  'restassured',
  'postman',
  'schemathesis'
];
const testing_tools_consumers = [
  'cypress',
  'wiremock',
  'nock',
  'mountebank',
  'pact',
  'msw'
];

const testing_tools_provider_side = Object.keys(testing_tools)
  .filter((key) => testing_tools_providers.includes(key))
  .reduce((obj, key) => {
    obj[key] = testing_tools[key];
    return obj;
  }, {});
const testing_tools_consumer_side = Object.keys(testing_tools)
  .filter((key) => testing_tools_consumers.includes(key))
  .reduce((obj, key) => {
    obj[key] = testing_tools[key];
    return obj;
  }, {});

export const meta = {
  languages,
  testing_tools,
  testing_tools_provider_side,
  testing_tools_consumer_side
};
