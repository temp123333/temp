import { Platform } from 'react-native';
import TabLayout from './(tabs)/_layout';
import DrawerLayout from './(drawer)/_layout';

const AppNavigation = () => {
  // Use drawer navigation on Android and tab navigation on iOS
  return Platform.OS === 'android' ? <DrawerLayout /> : <TabLayout />;
};

export default AppNavigation;