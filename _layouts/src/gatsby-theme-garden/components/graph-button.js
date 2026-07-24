import React, { useState, lazy, Suspense } from "react";
import "./graph-button.css";

const Graph = lazy(() => import("gatsby-theme-garden/src/components/graph-visualisation"));

const GraphButton = () => {
  const [graphState, setGraphState] = useState("hidden");

  return (
    <React.Fragment>
      <button
        title="Explore Topic Graph"
        aria-label="Explore Topic Graph"
        className="gitbook-graph-btn"
        onClick={() => setGraphState("maximized")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
        <span className="btn-text">Graph View</span>
      </button>
      {typeof window !== "undefined" ? (
        <Suspense fallback={null}>
          <Graph graphState={graphState} setGraphState={setGraphState} />
        </Suspense>
      ) : null}
    </React.Fragment>
  );
};

export default GraphButton;
