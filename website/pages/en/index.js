/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <img src="/img/logo-white.png" alt="Pactflow Documentation"/>
        <small>{siteConfig.tagline}</small>
      </h2>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const {baseUrl, docsUrl} = siteConfig;

    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const supportLinks = [
      {
        content: `Learn more using the [documentation on this site](${docUrl(
          'docs/getting-started.html',
        )}) as well as the [general Pact documentation](https://docs.pact.io). Check out the [Pactflow user interface help](${
          docUrl('user-interface.html')}) for documentation on the Pactflow screens.`,
        title: 'Browse the Docs',
      },
      {
        content: `Check the [troubleshooting documentation](${docUrl(
          'docs/troubleshooting.html',
        )}) if you are having problems.`,
        title: 'Troubleshooting',
      },
      {
        content: "Find out what's new with the [Pactflow blog](https://blog.pactflow.io).",
        title: 'Stay up to date with our blog.',
      },
    ];

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={supportLinks}
          layout={props.layout}
        />
      </Container>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Block/>
        </div>
      </div>
    );
  }
}

module.exports = Index;
