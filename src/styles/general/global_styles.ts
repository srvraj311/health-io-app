import { useColorScheme } from "react-native";
import { DefaultTheme } from "react-native-paper";

let isDark = false;
const GlobalStyles = {
    // Primary Colours
    primaryColour: '#02B875',
    secondaryColor: '#1F274A',
    cardBgColor: '#D3F2DC',

    // Warn, success, error
    warn: '#E2B93B',
    success: '#02B875',
    error: '#EB5757',

    // Input Background
    inputBackground: '#ECF8F1',

    // Backgrounds Colours
    pagBackground: '#fafafa',
    pagBackgroundDark: '#09090b',

    // pagBackground: '#E1F2E5',
    // Grey Colours
    white: '#FFFFFF',
    grey50: '#fafafa',
    grey100: '#f4f4f5',
    grey200: '#e4e4e7',
    grey300: '#d4d4d8',
    grey400: '#a1a1aa',
    grey500: '#71717A',
    grey600: '#52525b',
    grey700: '#313135',
    grey800: '#1e1e1e',
    grey900: '#18181b',
    grey950: '#09090b',
    black: '#000000',


    // Font Styles and sizes
    baseFont: 'BeVietnamPro-Regular',


    //

    theme: {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#a1a1aa',
            secondary: '#1F274A',
        }
    },
}



export default GlobalStyles;