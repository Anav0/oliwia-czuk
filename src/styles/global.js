import { createGlobalStyle } from "styled-components";
import colors from "src/styles/colors";
import * as fonts from "src/styles/fonts";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Advent+Pro:400,500,600,700|Srisakdi&display=swap');

    @font-face {
        font-family: 'Bhavuka';
        font-style: normal;
        font-weight: 400;
        src: local('Bhavuka'), url(${fonts.Bhavuka}) format('truetype');
    }

    *,html{
        margin: 0;
        box-sizing: border-box;
        font-size:14px;
        color: ${colors.softBlack};
        background-color: ${colors.wheat};
        font-family: 'Bhavuka';
    }
`;
