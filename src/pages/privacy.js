import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from 'src/components/Layout'
import Content, { HTMLContent } from 'src/components/Content'
import styled from "styled-components";
import PrevLayout from "../components/PrevLayout";

const PrivacyWrapper = styled.div`
  width:100%;
  min-height:100vh;
  display:flex;
  justify-content: center;
  align-items: center;
`

const PrivacyContent = styled.div`
  width:50%;
  height:75%;
  
  
  h2{
  font-size:2.5rem;
  margin-top:3rem;
  }
  p{
  font-size:1.5rem;
  text-align: justify;
  }
`

const PrivacyTitle = styled.h1`

font-size:3.5rem;
`

export const PrivacyTemplate = ({ title, content, contentComponent }) => {
    const PageContent = contentComponent || Content

    let PickedLayout = null;
    if(contentComponent)
        PickedLayout = Layout;
    else PickedLayout = PrevLayout;

    return (
        <PickedLayout>
            <PrivacyWrapper>
                <PrivacyContent>
                    <PrivacyTitle>
                        {title}
                    </PrivacyTitle>
                    <PageContent className="content" content={content} />
                </PrivacyContent>
            </PrivacyWrapper>
        </PickedLayout>
    )
}

PrivacyTemplate.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    contentComponent: PropTypes.func,
}

const PrivacyPage = ({ data }) => {
    console.log(data)
    const { markdownRemark: post } = data

    return (
        <PrivacyTemplate
            contentComponent={HTMLContent}
            title={post.frontmatter.title}
            content={post.html}
        />
    )
}

PrivacyPage.propTypes = {
    data: PropTypes.object.isRequired,
}

export default PrivacyPage

export const privacyPageQuery = graphql`
    query AboutPage($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            html
            frontmatter {
                title
            }
        }
    }
`