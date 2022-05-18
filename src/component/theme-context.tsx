import React, { createContext, ReactChild, useEffect, useState } from "react";

const themes = {
  dark: {
    backgroundColor: "black",
    color: "white",
  },
  light: {
    backgroundColor: "white",
    color: "black",
  },
};

interface InitialStateType {
  dark: boolean;
  theme: {
    backgroundColor: string;
    color: string;
  };
  toggle: () => void;
}

const initialState: InitialStateType = {
  dark: false,
  theme: themes.light,
  toggle: () => {},
};

interface ChildPropsType {
  children: ReactChild;
}

const ThemeContext = createContext<InitialStateType>(initialState);

function ThemeProvider({ children }: ChildPropsType) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("dark") === "true";
    setDark(isDark);
  }, [dark]);

  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("dark", JSON.stringify(isDark));
    setDark(isDark);
  };

  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        dark,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
export { ThemeProvider, ThemeContext };
