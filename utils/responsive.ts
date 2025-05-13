// utils/responsive.ts
import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screenWidth = width;
export const screenHeight = height;

export const wp = (percentage: number) => PixelRatio.roundToNearestPixel((width * percentage) / 100);
export const hp = (percentage: number) => PixelRatio.roundToNearestPixel((height * percentage) / 100);
