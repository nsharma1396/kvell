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
        <Button href={docUrl("getting-started/introduction")}>Get Started</Button>
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

  const FeatureCallout = () => (
    <div className="productShowcaseSection paddingBottom" style={{ textAlign: "center" }}>
      <h2>Feature Callout</h2>
      <MarkdownBlock>These are features of this project</MarkdownBlock>
    </div>
  );

  const TryOut = () => (
    <Block id="try">
      {[
        {
          content:
            "To make your landing page more attractive, use illustrations! Check out " +
            "[**unDraw**](https://undraw.co/) which provides you with customizable illustrations which are free to use. " +
            "The illustrations you see on this page are from unDraw.",
          image: `${baseUrl}img/undraw_code_review.svg`,
          imageAlign: "left",
          title: "Wonderful SVG Illustrations"
        }
      ]}
    </Block>
  );

  const Description = () => (
    <Block background="dark">
      {[
        {
          content: "This is another description of how this project is useful",
          image: `${baseUrl}img/undraw_note_list.svg`,
          imageAlign: "right",
          title: "Description"
        }
      ]}
    </Block>
  );

  const LearnHow = () => (
    <Block background="light">
      {[
        {
          content: "Each new Docusaurus project has **randomly-generated** theme colors.",
          image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
          imageAlign: "right",
          title: "Randomly Generated Theme Colors"
        }
      ]}
    </Block>
  );

  const Features = () => (
    <Block layout="fourColumn">
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
        {/* <LearnHow />
        <TryOut />
        <Description /> */}
      </div>
    </div>
  );
}

module.exports = Index;
