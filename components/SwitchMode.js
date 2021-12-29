import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

export default function SwitchMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <IconButton
      ml={8}
      aria-label="Toggle dark mode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={colorMode === "light" ? "black" : "white"}
    />
  );
}
