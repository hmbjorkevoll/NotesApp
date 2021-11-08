import { Switch } from "@headlessui/react";

export default function Toggle({ theme, setTheme, themeToggle }) {
  function changeMode() {
    setTheme(!theme);
    console.log(theme);
  }

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">
          {theme === true ? "Switch to dark mode" : "Switch to light mode"}
        </Switch.Label>
        <Switch
          checked={theme}
          onChange={() => changeMode()}
          className={`${
            !theme ? "bg-gray-200" : "bg-gray-600"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
        >
          <span
            className={`${
              !theme ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
}
