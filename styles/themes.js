import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "whitesmoke",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#101010",
  fontColor: "whitesmoke",
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;
