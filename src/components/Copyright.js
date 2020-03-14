import React from "react";
import styled from "styled-components";

const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.55;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 20px 0;
  z-index: 10;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: relative;
    width: 100%;
    height: auto;
    bottom: auto;
    left: auto;
    transform: none;
    * {
      font-size: 1.25rem;
    }
  }
`;

const CopyrightEmail = styled.span`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: absolute;
    right: 40px;
    text-align: center;
    padding: 20px;
  }
`;
const CopyrightAuthor = styled.span`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    padding: 20px;
  }
`;

export default function Copyright() {
  return (
    <CopyrightWrapper>
      <CopyrightAuthor>© Copryright • Oliwia Czuk</CopyrightAuthor>
      <CopyrightEmail>dummy.mail@mail.com</CopyrightEmail>
    </CopyrightWrapper>
  );
}
