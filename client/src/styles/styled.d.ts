import 'styled-components';
import { ColorScheme } from './colorScheme';

declare module 'styled-components' {
  export type DefaultTheme = ColorScheme;
} 