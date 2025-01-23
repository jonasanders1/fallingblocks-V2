const colorScheme = {
  // General Backgrounds
  background: {
    primary: "#1E1E2C", // Main background color
    secondary: "#2C2C3A", // Slightly lighter background for containers
    tertiary: "#3A3A48", // Even lighter for contrast
    overlay: "#000000AA", // Transparent black for overlays
  },

  // Text Colors
  text: {
    primary: "#FFFFFF", // Main text color (white)
    secondary: "#B0B0C3", // Subtle text color (light gray)
    accent: "#66FCF1", // Accent text color (light teal)
    danger: "#FF6B6B", // For error or warnings
  },

  // Tetromino Block Colors
  blocks: {
    I: "#4DD9E7", // Tweaked cyan for the I piece
    O: "#F6DC7B", // Softened yellow for the O piece
    T: "#C58EFF", // Relaxing purple for the T piece
    S: "#9BEF99", // Calming green for the S piece
    Z: "#FF9C9C", // Gentle red for the Z piece
    J: "#7C9FFF", // Cool blue for the J piece
    L: "#FFC78F", // Warm orange for the L piece
  },

  // Borders and Outlines
  borders: {
    light: "#444455", // Light border for subtle outlines
    medium: "#666680", // Medium border for containers
    strong: "#FFFFFF", // Strong white border for high contrast
  },

  // Containers and Boxes
  containers: {
    primary: "#29293A", // Main container background
    secondary: "#353542", // Slightly lighter for nested containers
    hover: "#3D3D50", // Hover effect on containers
    active: "#4A4A66", // Active container state
  },

  // UI Buttons
  buttons: {
    primary: "#66FCF1", // Main button background (teal)
    primaryHover: "#4FC8C1", // Hover state for primary buttons
    danger: "#FF6B6B", // Danger button background (red)
    dangerHover: "#D65353", // Hover state for danger buttons
    disabled: "#555555", // Disabled button state
  },

  // Shadows and Highlights
  shadows: {
    light: "rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
    medium: "rgba(0, 0, 0, 0.4)", // Medium shadow for focus elements
    strong: "rgba(0, 0, 0, 0.6)", // Strong shadow for modals or overlays
  },

  // Overlays and Effects
  overlay: {
    dim: "rgba(0, 0, 0, 0.6)", // Dimmed overlay for modals
    blur: "rgba(46, 46, 68, 0.8)", // Background blur effect
  },

  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #4DD9E7, #4A4A66)",
    secondary: "linear-gradient(135deg, #C58EFF, #2C2C3A)",
  },
};

export default colorScheme;
