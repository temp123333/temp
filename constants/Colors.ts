// constants/Colors.ts

const tintColorLight = '#1E40AF';
const tintColorDark = '#60A5FA';

export default {
  light: {
    text: '#1E293B',
    subtext: '#64748B',
    background: 'white',
    tint: tintColorLight,
    tabIconDefault: 'black',
    tabIconSelected: tintColorLight,
    primary: '#1E40AF',
    secondary: '#B91C1C',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    card: '#FFFFFF',
    border: '#E2E8F0',
    tabBarBackground: 'white', // 💙 Dark blue for visible contrast
  },
  dark: {
    text: '#F8FAFC',
    subtext: '#CBD5E1',
    background: '#0F172A',
    tint: tintColorDark,
    tabIconDefault: '#64748B',
    tabIconSelected: tintColorDark,
    primary: '#60A5FA',
    secondary: '#F87171',
    accent: '#FBBF24',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    card: '#1E293B',
    border: '#334155',
    tabBarBackground: '#F8FAFC', // 🌒 Deep gray-blue for contrast
  },
};
