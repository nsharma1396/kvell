const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function HomeSplash(props) {
  const { siteConfig, language = "" } = props;
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
  const langPart = `${language ? `${language}/` : ""}`;
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
      {siteConfig.title}
      <small>{siteConfig.tagline}</small>
    </h2>
  );

  // const PromoSection = props => (
  //   <div className="section promoSection">
  //     <div className="promoRow">
  //       <div className="pluginRowBlock">{props.children}</div>
  //     </div>
  //   </div>
  // );

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
        {/* <PromoSection>
        </PromoSection> */}
        <Button href={docUrl("getting-started/installation")}>Get Started</Button>
      </div>
    </SplashContainer>
  );
}

function Index(props) {
  const { config: siteConfig, language = "" } = props;
  const { baseUrl } = siteConfig;

  const Block = props => (
    <Container padding={["bottom", "top"]} id={props.id} background={props.background}>
      <GridBlock align="center" contents={props.children} layout={props.layout} />
    </Container>
  );

  // const FeatureCallout = () => (
  //   <div className="productShowcaseSection paddingBottom" style={{ textAlign: "center" }}>
  //     <h2>Feature Callout</h2>
  //     <MarkdownBlock>These are features of this project</MarkdownBlock>
  //   </div>
  // );

  const AutoTemplates = () => (
    <Block id="try" background="light">
      {[
        {
          content:
            "Auto templating helps you to create and maintain routes,controllers and models with " +
            "predefined templates from a single configuration.",
          image: `${baseUrl}img/generate_route.gif`,
          imageAlign: "left",
          title: "Auto Templating"
        }
      ]}
    </Block>
  );

  const Compilation = () => (
    <Block>
      {[
        {
          content:
            "Kvell compiles your application before it starts the server using `Eslint` thus helping you" +
            "catch potential errors in your application right away!",
          image: `${baseUrl}img/compilation.gif`,
          imageAlign: "right",
          title: "Compilation"
        }
      ]}
    </Block>
  );

  const EasySetup = () => (
    <Block>
      {[
        {
          content:
            "Setup your kvell app with just one command. Kvell wraps up common dependencies and implementations so you can focus on the main logic of your application.",
          image: `${baseUrl}img/create-app.gif`,
          imageAlign: "right",
          title: "Easily setup a ready to run application"
        }
      ]}
    </Block>
  );

  const Features = () => (
    <Block layout="fourColumn" background="light">
      {[
        {
          content:
            "There is only one dependency that you need to keep your application up-to-date. Kvell makes sure that any complications regarding updating is handled out of the box so that you can focus more on the business logic.",
          image: `${baseUrl}img/undraw_dev_productivity_umsq.svg`,
          imageAlign: "top",
          title: "Easy to setup and maintain"
        },
        {
          content:
            "Internally, Kvell uses commonly used battle-tested packages/libraries to create a pre-configured modern application thus giving you a powerful base to begin your application in no time.",
          image: `${baseUrl}img/undraw_operating_system.svg`,
          imageAlign: "top",
          title: "Modern Toolkit"
        },
        {
          content:
            "Kvell tries to strike a balance between abstracting out the common implementations and making some features configurable.",
          image: `${baseUrl}img/undraw_options_2fvi.svg`,
          imageAlign: "top",
          title: "Configurable"
        }
      ]}
    </Block>
  );

  return (
    <div>
      <HomeSplash siteConfig={siteConfig} language={language} />
      <div className="mainContainer">
        <Features />
        {/* <FeatureCallout /> */}
        <EasySetup />
        <AutoTemplates />
        <Compilation />
      </div>
    </div>
  );
}

module.exports = Index;
