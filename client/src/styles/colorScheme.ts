const themes = {
  dark: {
    background: {
      primary: "#1E1E2C",
      secondary: "#2C2C3A",
      tertiary: "#3A3A48",
      overlay: "#000000AA",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0C3",
      accent: "#66FCF1",
      danger: "#FF6B6B",
    },
    blocks: {
      I: "#4DD9E7",
      O: "#F6DC7B",
      T: "#C58EFF",
      S: "#9BEF99",
      Z: "#FF9C9C",
      J: "#7C9FFF",
      L: "#FFC78F",
      ghostBorderColor: "#F8F8F8",
    },
    borders: {
      light: "#444455",
      medium: "#666680",
      strong: "#FFFFFF",
    },
    containers: {
      primary: "#29293A",
      secondary: "#353542",
      hover: "#3D3D50",
      active: "#4A4A66",
    },
    buttons: {
      primary: "#66FCF1",
      primaryHover: "#4FC8C1",
      danger: "#FF6B6B",
      dangerHover: "#D65353",
      disabled: "#555555",
    },
    shadows: {
      light: "rgba(0, 0, 0, 0.2)",
      medium: "rgba(0, 0, 0, 0.4)",
      strong: "rgba(0, 0, 0, 0.6)",
    },
    overlay: {
      dim: "rgba(0, 0, 0, 0.6)",
      blur: "rgba(46, 46, 68, 0.8)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #2C2C3A, #1E1E2C)",
      secondary: "linear-gradient(135deg, #C58EFF, #2C2C3A)",
    },
    gameboard: {
      background: "#1e1e1e",
      secondary: "#2c2c2c",
      cellColorDark: "#353542",
      cellColorLight: "#3D3D50",
    },
  },
  light: {
    background: {
      primary: "#F8F8F8",
      secondary: "#EDEDF0",
      tertiary: "#EAEAEC",
      overlay: "#00000077",
    },
    text: {
      primary: "#1E1E2C",
      secondary: "#4A4A66",
      accent: "#008B85",
      danger: "#DC3545",
    },
    blocks: {
      I: "#00CDE1",
      O: "#FFD700",
      T: "#9B30FF",
      S: "#32CD32",
      Z: "#FF4444",
      J: "#4169E1",
      L: "#FFA500",
      ghostBorderColor: "#3A3A48",
    },
    borders: {
      light: "#E0E0E0",
      medium: "#CCCCCC",
      strong: "#1E1E2C",
    },
    containers: {
      primary: "#FFFFFF",
      secondary: "#F0F0F0",
      hover: "#F0F0F0",
      active: "#E8E8E8",
    },
    buttons: {
      primary: "#008B85",
      primaryHover: "#006D67",
      danger: "#DC3545",
      dangerHover: "#BD2130",
      disabled: "#CCCCCC",
    },
    shadows: {
      light: "rgba(0, 0, 0, 0.1)",
      medium: "rgba(0, 0, 0, 0.2)",
      strong: "rgba(0, 0, 0, 0.3)",
    },
    overlay: {
      dim: "rgba(255, 255, 255, 0.8)",
      blur: "rgba(255, 255, 255, 0.9)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #F5F5F7, #F8F8F8)",
      secondary: "linear-gradient(135deg, #9B30FF, #F5F5F7)",
    },
    gameboard: {
      background: "#FFFFFF",
      secondary: "#F5F5F7",
      cellColorDark: "#F5F5F7",
      cellColorLight: "#EAEAEC",
    },
  },
} as const;

export type ThemeType = keyof typeof themes;
export type ColorScheme = typeof themes.dark;

export default themes;
