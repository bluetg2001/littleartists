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
  },
});

export default theme;
