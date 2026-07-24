import React, { memo } from "react";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import {
  useStackedPagesProvider,
  StackedPagesProvider,
} from "react-stacked-pages-hook";
import { dataToNote, dataToSlug } from "gatsby-theme-garden/src/utils/data-to-note";
import Note from "gatsby-theme-garden/src/components/note";
import NoteWrapper from "./note-wrapper";
import Header from "./header";
import SEO from "gatsby-theme-garden/src/components/seo";

import "./theme.css";
import "gatsby-theme-garden/src/components/stacked-layout.css";
import "./custom.css";

const Content = ({ windowWidth, scrollContainer, stackedPages, index, pageWidth }) => {
  return (
    <div className="layout">
      <SEO title={stackedPages[stackedPages.length - 1].data.title} />
      <Header />
      <div className="note-columns-scrolling-container" ref={scrollContainer}>
        <div
          className="note-columns-container"
          style={{ width: pageWidth * (stackedPages.length + 1) }}
        >
          {stackedPages.map((page, i) => (
            <NoteWrapper
              key={page.slug}
              i={typeof index !== "undefined" ? index : i}
              slug={page.slug}
              title={page.data.title}
              pageWidth={pageWidth}
            >
              <Note {...page.data} />
            </NoteWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};
const MemoContent = memo(Content);

const NotesLayout = ({ location, slug, data }) => {
  const windowWidth = useWindowWidth();
  const widthVal = windowWidth || (typeof window !== "undefined" ? window.innerWidth : 1400);
  const pageWidth = Math.min(1280, Math.max(850, Math.floor(widthVal * 0.72)));

  const [state, scrollContainer] = useStackedPagesProvider({
    firstPage: { slug: dataToSlug(data), data },
    location,
    processPageQuery: dataToNote,
    pageWidth,
  });

  let pages = state.stackedPages;
  let activeIndex;
  if (widthVal <= 900) {
    const activeSlug = Object.keys(state.stackedPageStates).find(
      (s) => state.stackedPageStates[s].active
    );
    activeIndex = state.stackedPages.findIndex(
      (page) => page.slug === activeSlug
    );
    if (activeIndex === -1) {
      activeIndex = state.stackedPages.length - 1;
    }

    pages = [state.stackedPages[activeIndex]];
  }

  return (
    <StackedPagesProvider value={state}>
      <MemoContent
        windowWidth={widthVal}
        scrollContainer={scrollContainer}
        stackedPages={pages}
        index={activeIndex}
        pageWidth={pageWidth}
      />
    </StackedPagesProvider>
  );
};

export default NotesLayout;
