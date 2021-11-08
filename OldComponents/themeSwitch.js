import * as Switch from "@radix-ui/react-switch";
import styled from "styled-components";

const StyledSwitch = styled(Switch.Root, {
  all: "unset",
  width: 42,
  height: 25,
  backgroundColor: "grey",
  borderRadius: "9999px",
  position: "relative",
  boxShadow: `0 2px 10px grey`,
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  "&:focus": { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: "black" },
});

const StyledThumb = styled(Switch.Thumb, {
  display: "block",
  width: 21,
  height: 21,
  backgroundColor: "white",
  borderRadius: "9999px",
  boxShadow: `0 2px 2px grey`,
  transition: "transform 100ms",
  transform: "translateX(2px)",
  willChange: "transform",
  '&[data-state="checked"]': { transform: "translateX(19px)" },
});

// Exports
export const SwitchStyled = StyledSwitch;
export const SwitchThumb = StyledThumb;

// Your app...
const Flex = styled("div", { display: "flex" });
const Label = styled("label", {
  color: "white",
  fontSize: 15,
  lineHeight: 1,
  userSelect: "none",
});

const ThemeSwitch = () => (
  <form>
    <Flex css={{ alignItems: "center" }}>
      <Label htmlFor="s1" css={{ paddingRight: 15 }}>
        Toogle theme
      </Label>
      <SwitchStyled defaultChecked id="s1">
        <SwitchThumb />
      </SwitchStyled>
    </Flex>
  </form>
);

export default ThemeSwitch;
