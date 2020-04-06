import React from "react";
import styled from "styled-components";
import { useStaticQuery } from "gatsby";
import { node } from "prop-types";
import Offer from "src/components/offer";

const OffersWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.pink};
  position: relative;
  padding: 30px;
  * {
    font-family: "Advent Pro", sans-serif;
  }
`;

const OfferHeader = styled.h1`
  font-size: 4rem;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.white};
  color: transparent;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: absolute;
    top: 70px;
    left: 60px;
    font-size: 5.3rem;
  }
`;

const OfferList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  .offer:first-child {
    margin-top: 15vh;
  }
  .offer {
    margin-top: 35vh;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 20vh;
  }
`;

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "offer" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              templateKey
              title
              desc
              btnText
              mainImage {
                childImageSharp {
                  fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const destiledData = data.allMarkdownRemark.edges;

  return (
    <OffersWrapper>
      <OfferHeader className="default-text-shadow">My Offer</OfferHeader>
      <OfferList>
        {destiledData.map(({ node }, index) => (
          <Offer key={node.id} {...node.frontmatter} index={index + 1} />
        ))}
      </OfferList>
    </OffersWrapper>
  );
};
