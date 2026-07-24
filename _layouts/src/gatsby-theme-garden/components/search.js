import React, { useState, useCallback, useEffect } from "react";
import { navigate } from "gatsby";
import Downshift from "downshift";
import useSearch from "gatsby-theme-garden/src/use-search";

import "./search.css";

export function Search() {
  const [query, setQuery] = useState("");
  const results = useSearch(query);

  const handleChange = useCallback((e) => setQuery(e.target.value), [setQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.querySelector(".searchWrapper input");
        if (input) input.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Downshift
      onChange={(selection) => selection && navigate(selection.path)}
      itemToString={(item) => (item ? item.title : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
        getRootProps,
      }) => (
        <div
          className="searchWrapper"
          {...getRootProps({}, { suppressRefError: true })}
        >
          <SearchBar
            query={query}
            onChange={handleChange}
            getInputProps={getInputProps}
          />
          <Results
            isOpen={isOpen}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            results={results}
            highlightedIndex={highlightedIndex}
          />
        </div>
      )}
    </Downshift>
  );
}

function SearchBar({ query, onChange, getInputProps }) {
  return (
    <div className="inputWrapper">
      <svg
        className="searchIcon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        {...getInputProps({
          placeholder: "Search articles or topics...",
          onChange: onChange,
        })}
        type="text"
      />
      <span className="searchHotkey">⌘K</span>
    </div>
  );
}

function Results({
  isOpen,
  results,
  getItemProps,
  getMenuProps,
  highlightedIndex,
}) {
  return (
    isOpen && (
      <ul className="results" {...getMenuProps()}>
        {results.length === 0 ? (
          <li className="no-results">No articles found matching query</li>
        ) : (
          results.map((r, index) => (
            <li
              key={r.id || r.path || index}
              {...getItemProps({
                index,
                item: r,
                className: `result-item ${highlightedIndex === index ? "highlighted" : ""}`,
              })}
            >
              <div className="title">{r.title}</div>
              {r.excerpt && <div className="excerpt">{r.excerpt}</div>}
            </li>
          ))
        )}
      </ul>
    )
  );
}
