import { createGlobalStyle } from "styled-components";
import colors from "src/styles/colors";
import * as fonts from "src/styles/fonts";

export default createGlobalStyle`

    @font-face {
        font-family: 'Bhavuka';
        font-style: normal;
        font-weight: 400;
        src: local('Bhavuka'), url(${fonts.Bhavuka}) format('truetype');
    }

    @font-face {
        font-family: 'Srisakdi';
        font-style: normal;
        font-weight: 400;
        src: local('Srisakdi'), url(${fonts.Srisakdi}) format('truetype');
    }

    @font-face {
        font-family: 'Sacramento';
        font-style: normal;
        font-weight: 400;
        src: local('Sacramento'), url(${fonts.Sacramento}) format('truetype');
    }
    *,html{
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
        color: ${colors.softBlack};
        font-family: 'Bhavuka';
    }
    html{
        background-color: ${colors.wheat};
    }

    .project-section{
        margin: 100px 20px;
        @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
            margin: 150px 20px;
        }

        @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
            margin: 20% 20px;
        }

    }
    .tl-wrapper{
        transform: none !important;
    }
    .disactive {
      opacity: 0.55;
    }
    .hidden{
        opacity: 0;
    }
    .show{
        opacity: 1 !important;
    }

`;
