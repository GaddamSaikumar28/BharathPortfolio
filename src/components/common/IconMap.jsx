import React from 'react';
import {
  Palette, Zap, LayoutGrid, Lightbulb, Package,
  DraftingCompass, PenTool, Camera, Clapperboard, Box, View,
  Star, ChevronLeft, ChevronRight, ChevronDown, ArrowRight,
  Twitter, Instagram, Linkedin, Loader2
} from 'lucide-react';

/**
 * A centralized map of all icons.
 * This prevents importing icons in every component.
 */
const iconMap = {
  Palette: Palette,
  Zap: Zap,
  LayoutGrid: LayoutGrid,
  Lightbulb: Lightbulb,
  Package: Package,
  DraftingCompass: DraftingCompass,
  PenTool: PenTool,
  Camera: Camera,
  Clapperboard: Clapperboard,
  Box: Box,
  View: View,
  Star: Star,
  ChevronLeft: ChevronLeft,
  ChevronRight: ChevronRight,
  ChevronDown: ChevronDown,
  ArrowRight: ArrowRight,
  Twitter: Twitter,
  Instagram: Instagram,
  Linkedin: Linkedin,
  Loader2: Loader2,
  Default: Lightbulb, // Default icon
};

/**
 * Renders a Lucide icon based on a string name.
 * @param {Object} props
 * @param {string} props.name - The name of the icon (e.g., "Palette").
 * @param {Object} props.rest - Other props to pass to the icon (size, className, etc.).
 * @returns {React.Component}
 */
export const Icon = ({ name, ...rest }) => {
  const IconComponent = iconMap[name] || iconMap.Default;
  return <IconComponent {...rest} />;
};

export default Icon;