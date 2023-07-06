import { createContext, useState, useEffect } from "react";
import { lightTheme, darkTheme } from "../styles/theme";
import { ThemeProvider as StyledProvider } from 'styled-components';

export const ThemeContext = createContext({});

const ThemeProvider = ({children}) => {
    // 로컬 스토리지에서 테마 설정 가져오기
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme ? JSON.parse(savedTheme) : false;

    const [isDark, setIsDark] = useState(initialTheme);
    const themeObject = isDark ? darkTheme : lightTheme;

    // 테마 설정이 변경될 때 로컬 스토리지 업데이트
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(isDark));
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <StyledProvider theme={themeObject}>{children}</StyledProvider>
        </ThemeContext.Provider>
    );
};

export { ThemeProvider };
