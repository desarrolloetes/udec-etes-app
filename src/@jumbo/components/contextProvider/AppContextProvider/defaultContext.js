import defaultTheme from '../../../../theme/defaultTheme';
import {
  DRAWER_BREAK_POINT,
  HEADER_TYPE,
  LAYOUT_STYLES,
  LAYOUT_TYPES,
  SIDEBAR_TYPE,
  SIDEBAR_WIDTH,
  THEME_TYPES,
} from '../../../constants/ThemeOptions';

export default {
  theme: defaultTheme,
  defaultLng: {
    languageId: 'spanish',
    locale: 'es',
    name: 'Espa&ntilde;ol',
    icon: 'es',
  },
  layout: LAYOUT_TYPES.VERTICAL_DEFAULT,
  layoutType: LAYOUT_STYLES.FULL_WIDTH,
  themeType: THEME_TYPES.LIGHT,
  drawerBreakPoint: DRAWER_BREAK_POINT.SX,
  headerType: HEADER_TYPE.FIXED,
  sidebarType: SIDEBAR_TYPE.DRAWER,
  isSidebarFixed: false,
  sidebarWidth: SIDEBAR_WIDTH.DEFAULT,
  showFooter: false,
};
