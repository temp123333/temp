// styles/GlobalStyles.ts
import { StyleSheet } from 'react-native';
import { wp, hp } from '@/utils/responsive';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5), // 5% of screen width
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: wp(5.5), // scales with width
    fontWeight: '600',
    marginVertical: hp(2),
  },
  text: {
    fontSize: wp(4),
    lineHeight: hp(2.5),
  },
});
