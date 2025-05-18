import DrawerLayout from './drawernavigation/index';
import TabsLayout from './(tabs)/_layout';
import { Platform } from 'react-native';

const AppNavigation = () => {
  return Platform.OS === 'android' ? <DrawerLayout /> : <TabsLayout />;
};

export default AppNavigation;
