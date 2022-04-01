import {extendTheme} from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#009fe8',
    },
    secondary: {
      500: '#ffd500',
    },
    // 배경색
    gray: {
      100: '#f4f4f4',
    },
    // font
    dark: {
      // 기본 컬러
      50: '#4c4d4d',
      // 연한 회색 컬러
      100: '#707070',
    },
  },
});

export default theme;
