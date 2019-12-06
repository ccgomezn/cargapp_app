import React from 'react';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';
import AppStack from './bottomNavigator';
import { DrawIconMenu } from '../style';

// StackMenu
import {
  homeStackNavigator, viajesStackNavigator, myTravelsStackNavigator,
  myVehicleStackNavigator, PointsStackNavigator, AnalyticsStackNavigator,
  ProfileStackNavigator, CouponsStackNavigator, chatStackNavigator,
} from './stackScreen';

const { width } = Dimensions.get('screen');

const CustomDrawerContentComponent = props => (
  <Container>
    <Content contentContainerStyle={{ height: '100%' }}>
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 3, y: 1 }}
        // colors={['#3f79eb', '#3f79eb', '#00ff77']}
        colors={['#007aff', '#007aff', '#00ff77']}
      >
        <DrawerItems
          {...props}
        />
      </LinearGradient>
    </Content>
  </Container>
);

function DrawerIcon({ urlicon, tint }) {
  return (
    <DrawIconMenu
      style={{ opacity: tint === '#fff' ? 1 : 0.4 }}
      fillAll
      source={{ uri: urlicon }}
    />
  );
}

const DrawerGenerator = createDrawerNavigator(
  {
    ScreenHome: {
      screen: homeStackNavigator,
      navigationOptions: {
        drawerLabel: 'Inicio',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-home.svg', tint: tintColor }),
      },
    },
    ScreenProfile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mi perfil',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-profile.svg', tint: tintColor }),
      },
    },
    ScreenStats: {
      screen: AnalyticsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Analíticas',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-analytics.svg', tint: tintColor }),
      },
    },
    ScreenMyTravels: {
      screen: myTravelsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mis viajes',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-mytravels.svg', tint: tintColor }),
      },
    },
    ScreenChat: {
      screen: viajesStackNavigator,
      navigationOptions: {
        drawerLabel: 'Chat',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-chat.svg', tint: tintColor }),
      },
    },
    ScreenConfig: {
      screen: viajesStackNavigator,
      navigationOptions: {
        drawerLabel: 'Configuraciones',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-settings.svg', tint: tintColor }),
      },
    },
  },
  {
    initialRouteName: 'ScreenHome',
    drawerPosition: 'right',
    drawerBackgroundColor: '#010935',
    drawerWidth: width * 0.7,
    unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#ffffff61',
      activeBackgroundColor: '',
      labelStyle: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: '300',
        marginLeft: 0,
      },
      itemsContainerStyle: {
        marginVertical: 32,
      },
      iconContainerStyle: {
        opacity: 1,
        marginLeft: 25,
      },
    },
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
  },
);

const DrawerDriver = createDrawerNavigator(
  {
    ScreenHome: {
      screen: AppStack,
      navigationOptions: {
        drawerLabel: 'Inicio',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-home.svg', tint: tintColor }),
      },
    },
    ScreenProfile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mi perfil',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-profile.svg', tint: tintColor }),
      },
    },
    ScreenCoupons: {
      screen: CouponsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Cupones',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-profile.svg', tint: tintColor }),
      },
    },
    ScreenVehicle: {
      screen: myVehicleStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mi Vehículo',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-vehicle.svg', tint: tintColor }),
      },
    },
    ScreenPoints: {
      screen: PointsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mis retos',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-points.svg', tint: tintColor }),
      },
    },
    ScreenStats: {
      screen: AnalyticsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Analíticas',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-analytics.svg', tint: tintColor }),
      },
    },
    ScreenTravels: {
      screen: viajesStackNavigator,
      navigationOptions: {
        drawerLabel: 'Viajes',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-travels.svg', tint: tintColor }),
      },
    },
    ScreenMyTravels: {
      screen: myTravelsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Mis viajes',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-mytravels.svg', tint: tintColor }),
      },
    },
    ScreenChat: {
      screen: chatStackNavigator,
      navigationOptions: {
        drawerLabel: 'Chat',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-chat.svg', tint: tintColor }),
      },
    },
    ScreenConfig: {
      screen: viajesStackNavigator,
      navigationOptions: {
        drawerLabel: 'Configuraciones',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-settings.svg', tint: tintColor }),
      },
    },
  }, {
    initialRouteName: 'ScreenHome',
    drawerPosition: 'left',
    drawerBackgroundColor: '',
    drawerWidth: width * 0.7,
    contentComponent: CustomDrawerContentComponent,
    unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#ffffff61',
      activeBackgroundColor: '',
      labelStyle: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: '300',
        marginLeft: 0,
      },
      itemsContainerStyle: {
        marginVertical: 32,
      },
      iconContainerStyle: {
        opacity: 1,
        marginLeft: 25,
      },
    },
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
  },
);

DrawerIcon.propTypes = {
  tint: PropTypes.string.isRequired,
  urlicon: PropTypes.string.isRequired,
};

export const ContainerGenerator = createAppContainer(DrawerGenerator);
export const ContainerDriver = createAppContainer(DrawerDriver);
