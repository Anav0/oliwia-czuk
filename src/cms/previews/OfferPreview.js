import React from "react";
import OfferTemplate from "src/components/Offer";
import PrevLayout from "src/components/PrevLayout";
import styled from "styled-components";

const PaddedWrapper = styled.div`
  padding-top: 25vh;
  background-color: ${({ theme }) => theme.colors.pink};
  height: 100vh;
  width: 100vw;
`;

export default ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <PrevLayout>
      <PaddedWrapper>
        <OfferTemplate {...data} />;
      </PaddedWrapper>
    </PrevLayout>
  );
};
