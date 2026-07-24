import React from "react";
import {
  LinkToStacked,
  PageIndexProvider,
  useStackedPage,
} from "react-stacked-pages-hook";

import "./note-wrapper.css";

function noteContainerClassName({ overlay, obstructed, highlighted } = {}) {
  return `note-container ${overlay ? "note-container-overlay" : ""} ${
    obstructed ? "note-container-obstructed" : ""
  } ${highlighted ? "note-container-highlighted" : ""}`;
}

const NoteWrapper = ({ children, slug, title, pageWidth = 850 }) => {
  const [, state, i] = useStackedPage();

  const handlePrintPDF = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div
      className={noteContainerClassName(state)}
      style={{ left: 40 * (i || 0), right: -(pageWidth - 40) }}
    >
      <div className="note-content">
        <div className="note-actions-bar">
          <button
            onClick={handlePrintPDF}
            className="note-pdf-btn"
            title="Download / Print Article as PDF"
            type="button"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download PDF</span>
          </button>
        </div>
        {children}
      </div>
      <LinkToStacked to={slug} className="obstructed-label">
        {title}
      </LinkToStacked>
    </div>
  );
};

const ContextProvider = ({ i, ...rest }) => (
  <PageIndexProvider value={i}>
    <NoteWrapper {...rest} />
  </PageIndexProvider>
);

export default ContextProvider;
