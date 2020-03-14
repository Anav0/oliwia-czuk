import React from "react";
import styled from "styled-components";

const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.55;
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 20px 0;
`;

export default function Copyright() {
  return (
    <CopyrightWrapper>
      <span>© Copryright • Oliwia Czuk</span>
      <span>dummy.mail@mail.com</span>
    </CopyrightWrapper>
  );
}
