import DrawerLayout from './drawernavigation/index';
import TabLayout from './(tabs)/_layout';
import { Platform } from 'react-native';

const AppNavigation = () => {
  return Platform.OS === 'android' ? <DrawerLayout /> : <TabLayout />;
};

export default AppNavigation;
