import React from 'react';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';

import LinearGradient from 'react-native-linear-gradient';
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
      // fill={tint}
      style={{ opacity: tint === '#fff' ? 1 : 0.4 }}
      fillAll
      source={{ uri: urlicon }}
    />
  );
}

const DrawerScreen = createDrawerNavigator(
  {
    ScreenHome: {
      screen: homeStackNavigator,
      navigationOptions: {
        drawerLabel: 'Inicio',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-home.svg', tint: tintColor }),
        headerTintColor: 'red',
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
    ScreenVehicule: {
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
    contentComponent: CustomDrawerContentComponent,
    drawerWidth: width * 0.6,
    contentOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#ffffff61',
      activeBackgroundColor: '',
      labelStyle: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: '300',
        marginLeft: 0,
        // backgroundColor: 'blue',
      },
      itemsContainerStyle: {
        marginVertical: 32,
        // backgroundColor: 'gray',
      },
      iconContainerStyle: {
        opacity: 1,
        marginLeft: 25,
        // backgroundColor: 'green',
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

export default createAppContainer(DrawerScreen);
