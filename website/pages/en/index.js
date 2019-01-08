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

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <div>
      <div className="projectTitle">
      <div className="logoSection">
      <img src={`${baseUrl}img/ken-logo-large.png`} alt="Logo"/>
      </div>
      <div className="logoSection">
      <h1 >
        {siteConfig.title}
      </h1>
      <small>{siteConfig.tagline}</small>
      <p>Ken is a collection of minimalist standards and tools that use linked data. It's optimized for human readability, static content, and interoperability. All public Ken projects are free & open source.</p>
      </div>
      </div>
      </div>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
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
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Feature Callout</h2>
        <MarkdownBlock>These are features of this project</MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: 'Talk about trying this out',
            image: ``,
            imageAlign: 'left',
            title: 'Try it Out',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: ``,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: 'Talk about learning how to use this',
            image: ``,
            imageAlign: 'right',
            title: 'Learn How',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <div>
      <Block layout="threeColumn" background="light">
        {[
          {
            title: 'Static',
            imageAlign: 'top',
            content: "Data is stored in raw TOML files. There are no databases necessary.",
          },
          {
            title: 'Human Readable',
            imageAlign: 'top',
            content: 'The Ken Standard and KenML are optimized for human readability. This helps for using git and similar to manage knowledge bases.',
          },
          {
            title: 'Modular',
            imageAlign: 'top',
            content: 'A unique ID system helps make sure that separate knowledge bases can be combined.',
          },
        ]}
        </Block>
      <Block layout="threeColumn" background="light">
        {[
          {
            title: 'Minimalist',
            imageAlign: 'top',
            content: "The Ken ecosystem is made of several small parts, favoring flexibility over standardization. It's possible to use any number of these parts.",
          },
          {
            title: 'Optional Privacy',
            imageAlign: 'top',
            content: 'Because all data can be stored in static files, whatever access restrictions apply to those files can apply to the data. The current Ken explorer application can be run locally.',
          },
          {
            title: 'Optional Decentralization',
            imageAlign: 'top',
            content: 'There are no necessary trusted parties or organizations. All of the relevant information can optionally be shared using decentralized tooling.',
          },
        ]}
        </Block>
      </div>
    );

    const KenParts = () => (
      <div className="ken-parts">
      <h1> Primary Components </h1>
      <Block layout="twoColumn">
        {[
          {
            title: 'Ken Standard',
            imageAlign: 'top',
            content: `A simple standard for knowledge bases with linked data.  
            [See Docs](/docs)`,
          },
          {
            title: 'KenML',
            imageAlign: 'top',
            content: `A markup language for the Ken Standard, aimed at convenient writing & editing.  
            [See Docs](/docs)`,
          },
        ]}
        </Block>
      <Block layout="twoColumn">
        {[
          {
            title: 'KenJs',
            imageAlign: 'top',
            content: `A Javascript library for importing KenML and using Ken compatible data in Javascript applications.   
            [See Docs](/docs)`,
          },
          {
            title: 'Ken Explorer',
            imageAlign: 'top',
            content: `An interface for browsing Ken compatible data.  
            [See Docs](/docs)`,
          },
        ]}
        </Block>

      </div>
    )

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
      <Block id="not-done-yet-flag">
        {[
          {
            content: 'Feedback is highly appreciated. Please leave feedback in issues on the [Github page](https://github.com/kenstandard/ken-js). Please do not share Ken publicly.',
            image: ``,
            imageAlign: 'left',
            title: 'This project is in-progress'
          },
        ]}
      </Block>
      <Features/>
      <KenParts/>
      </div>
    );
  }
}

module.exports = Index;
