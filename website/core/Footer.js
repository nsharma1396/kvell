const React = require("react");

function Footer(props) {
  const { config, language } = props;
  function docUrl(doc, language) {
    const baseUrl = config.baseUrl;
    const docsUrl = config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  // function pageUrl(doc, language) {
  //   const baseUrl = config.baseUrl;
  //   return baseUrl + (language ? `${language}/` : "") + doc;
  // }

  const repoUrl = `https://github.com/${config.organizationName}/${config.projectName}`;
  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <a href={config.baseUrl} className="nav-home">
          {config.footerIcon && (
            <img
              src={config.baseUrl + config.footerIcon}
              alt={config.title}
              width="66"
              height="58"
            />
          )}
        </a>
        <div className="doc-links">
          <h5>Docs</h5>
          <a href={docUrl("getting-started/introduction", language)}>Getting Started</a>
          <a href={docUrl("guide/folder-structure", language)}>Guides</a>
          <a href={docUrl("database-plugins/overview", language)}>Database Plugins</a>
        </div>
        <div />
        <div className="social-links">
          <h5>Social</h5>
          <a
            className="github-button"
            href={repoUrl}
            data-count-href={`/${config.organizationName}/${config.projectName}/stargazers`}
            data-show-count="true"
            data-count-aria-label="# stargazers on GitHub"
            aria-label="Star this project on GitHub"
          >
            kvell
          </a>
          {config.twitterUsername && (
            <div className="social">
              <a
                href={`https://twitter.com/${config.twitterUsername}`}
                className="twitter-follow-button"
              >
                Follow @{config.twitterUsername}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* <section className="copyright">{config.copyright}</section> */}
    </footer>
  );
}

module.exports = Footer;
