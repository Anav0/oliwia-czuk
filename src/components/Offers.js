import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStaticQuery } from "gatsby";
import Offer, {
  OfferDescWrapper,
  OfferTitle,
  OfferDesc,
  OfferBtn,
  OfferIndex,
} from "src/components/offer";
import Flickity from "react-flickity-component";
import Colors from "src/styles/colors";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import CarouselProgress from "src/components/CarouselProgress";

const OffersWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.pink};
  position: relative;
  padding: 30px;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0;
  }

  * {
    font-family: "Advent Pro", sans-serif;
  }

  .activeWrapper {
    z-index: 5;
    position: absolute;
    left: 35%;
    top: 30%;
    transform: translate(-50%, -50%);
    max-width: 45%;
    @media (min-width: ${({ theme }) => theme.breakpoints["lg+"]}) {
      max-width: 35%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      max-width: 25%;
    }
  }

  .activeIndex {
    position: absolute;
    right: 22%;
    top: -8%;
    z-index: 5;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      right: 24%;
      top: -8%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints["lg+"]}) {
      top: -15%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      right: 25%;
      top: -16%;
      min-width: 280px;
    }
  }

  .activeDesc,
  .activeIndex {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const OfferHeader = styled.h1`
  font-size: 4rem;
  -webkit-text-stroke: 2px ${({ theme }) => theme.colors.white};
  color: transparent;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: absolute;
    top: 20px;
    left: 60px;
    font-size: 5.3rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints["lg+"]}) {
    font-size: 6rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: 8rem;
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
  .carousel {
    cursor: grab;
  }
  .progress {
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      width: 50% !important;
      place-self: center;
      margin-top: 5vh;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      width: 25% !important;
    }
  }
  .carousel .flickity-viewport .flickity-slider .offer {
    width: 70%;
    margin: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
      width: 68%;
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.xl}) {
      width: 60%;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 20vh;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: 25vh;
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

  let [innerWidth, setInnerWidth] = useState(0);
  let [activeIndex, setActiveIndex] = useState(0);
  let [selectedOffer, setSelectedOffer] = useState({
    ...destiledData[activeIndex].node.frontmatter,
    transitionColor: Colors.darkPink,
    link: "projects",
  });
  const flickityOptions = {
    prevNextButtons: false,
    pageDots: false,
    freeScroll: false,
    initialIndex: activeIndex,
  };
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);
  const offers = destiledData.map(({ node }, index) => (
    <Offer
      key={node.id}
      {...node.frontmatter}
      index={index + 1}
      transitionColor={Colors.darkPink}
      link="projects"
    />
  ));

  return (
    <OffersWrapper>
      <OfferHeader className="default-text-shadow">My Offer</OfferHeader>
      {innerWidth >= 1024 ? (
        <OfferList>
          <OfferDescWrapper className="show activeWrapper">
            <OfferTitle className="default-text-shadow">
              {selectedOffer.title}
            </OfferTitle>
            <OfferDesc className="activeDesc default-text-shadow">
              {selectedOffer.desc}
            </OfferDesc>
            <AniLink
              paintDrip
              hex={selectedOffer.transitionColor}
              to={selectedOffer.link}
            >
              <OfferBtn>{selectedOffer.btnText}</OfferBtn>
            </AniLink>
          </OfferDescWrapper>
          <OfferIndex className="default-text-shadow show activeIndex">
            {activeIndex < 9 ? `0${activeIndex + 1}` : activeIndex + 1}
          </OfferIndex>
          <Flickity
            flickityRef={(c) => {
              c.on("change", () => {
                const {
                  node: { frontmatter: selectedOffer },
                } = destiledData[c.selectedIndex];
                setSelectedOffer({
                  ...selectedOffer,
                  transitionColor: Colors.darkPink,
                  link: "projects",
                });
                setActiveIndex(c.selectedIndex);
              });
            }}
            className={"carousel"}
            options={flickityOptions}
          >
            {offers}
          </Flickity>
          <CarouselProgress
            className="progress"
            active={activeIndex + 1}
            total={destiledData.length}
          />
        </OfferList>
      ) : (
        <OfferList>{offers}</OfferList>
      )}
    </OffersWrapper>
  );
};
