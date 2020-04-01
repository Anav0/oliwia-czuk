import React, { createRef, useEffect } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "src/components/Layout";
import Content, { HTMLContent } from "src/components/Content";
import styled from "styled-components";
import PrevLayout from "../components/PrevLayout";
import { TimelineMax } from "gsap";

const PrivacyWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 3rem;
  margin-top: 20vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 15vh;
    margin-top: 15vh;
  }
`;

const PrivacyContent = styled.div`
  width: 100%;
  height: 75%;
  margin: 0 20px;

  .content {
    margin-top: 3rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: 4rem;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 75%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 75%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 60%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 45%;
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    margin-top: 3rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: 4rem;
      margin-bottom: 2rem;
      font-size: 3rem;
    }
  }
  a {
    text-decoration: none;
    font-weight: 700;
  }
  p,
  li,
  s,
  span,
  a {
    font-size: 1.5rem;
    padding: 1rem 0;
    text-align: justify;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 2rem;
    }
  }
  ul,
  ol {
    list-style: inside;
    padding-left: 1.25rem;
  }
`;

const PrivacyTitle = styled.h1`
  font-size: 3.5rem;
  margin: 1rem 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 4rem;
  }
`;

export const PrivacyTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content;

  let PickedLayout = null;
  if (contentComponent) PickedLayout = Layout;
  else PickedLayout = PrevLayout;

  const privacyContentRef = createRef();
  useEffect(() => {
    const { current: privacyContent } = privacyContentRef;

    new TimelineMax().fromTo(
      privacyContent.children,
      1,
      { autoAlpha: 0 },
      { autoAlpha: 1, stagger: 0.5 }
    );
  }, []);
  return (
    <PickedLayout>
      <PrivacyWrapper>
        <PrivacyContent ref={privacyContentRef}>
          <PrivacyTitle>{title}</PrivacyTitle>
          <PageContent className="content" content={content} />
        </PrivacyContent>
      </PrivacyWrapper>
    </PickedLayout>
  );
};

PrivacyTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const PrivacyPage = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <PrivacyTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  );
};

PrivacyPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default PrivacyPage;

export const privacyPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
