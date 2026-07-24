import React from "react";
import { Link } from "gatsby";

import useSiteMetadata from "gatsby-theme-garden/src/use-site-metadata";
import DarkModeToggle from "./dark-mode-toggle";
import GraphButton from "./graph-button";
import { Search } from "./search";

import "./header.css";

const Header = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <header className="gitbook-header">
      <div className="header-brand">
        <Link to="/" className="brand-link">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="brand-title">{siteMetadata.title || "Autonomic KB"}</span>
          <span className="brand-badge">Knowledge Hub</span>
        </Link>
      </div>

      <div className="header-actions">
        <Search />
        <GraphButton />
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
