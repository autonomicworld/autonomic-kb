import React from "react";
import { LinkToStacked } from "react-stacked-pages-hook";

import "./reference.css";

const Reference = ({ node }) => {
  return (
    <div className="reference-card-wrapper">
      <LinkToStacked to={node.slug} className="reference-card">
        <div className="reference-card-header">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <h5 className="reference-card-title">{node.title}</h5>
        </div>
        {node.content && <div className="reference-card-content">{node.content}</div>}
      </LinkToStacked>
    </div>
  );
};

export default Reference;
