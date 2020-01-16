/* eslint-disable global-require */
import React from 'react';
import { createDrawerNavigator, createAppContainer, DrawerItems } from 'react-navigation';
import { Dimensions, ImageBackground } from 'react-native';
import { Container, Content, View } from 'native-base';
import PropTypes from 'prop-types';

import AppStack from './bottomNavigator';
import { DrawIconMenu } from '../style';
import AvatarProfile from '../components/AvatarProfile';
import { store } from '../../redux/store';

// StackMenu
import {
  homeStackNavigator, travelsStackNavigator, myTravelsStackNavigator,
  myVehicleStackNavigator, PointsStackNavigator, AnalyticsStackNavigator,
  ProfileStackNavigator, CouponsStackNavigator, chatStackNavigator,
  ConfigStackNavigator,
} from './stackScreen';

const { width } = Dimensions.get('screen');

function CustomDrawerContentComponent(props) {
  let profile = store.getState().profile.data;
  let first_name = profile ? profile[0].profile.firt_name : "";
  let last_name = profile ? profile[0].profile.last_name : "";
  return (
    <Container>
      <Content contentContainerStyle={{ height: '100%'}}>
        <ImageBackground 
          source={require('../../Images/MenuCargapp.png')}
          style={{width: '115%', height: '100%'}}>
          <AvatarProfile 
            avatar={require('../../icons/camion_1.png')}
            press={() => console.log(props)}//() => props.navigation.navigate('ScreenProfile')}
            text={`${first_name} ${last_name}`}
          />
          <DrawerItems
            {...props}
          />
        </ImageBackground>
      </Content>
    </Container>
  );
}

function DrawerIcon({ urlicon, tint, v }) {
  return (
    <View 
      style={{
        height: 50,
        width: '300%',
        display: 'flex',
        justifyContent: 'center',
        borderLeftWidth: 3.5, 
        borderLeftColor: tint === '#fff' ? 'rgb(0, 255, 119)' : 'rgba(255, 255, 255, 0)',
      }}>
      <DrawIconMenu
        style={{ opacity: tint === '#fff' ? 1 : 0.7}}
        fill={tint === '#fff' ? 'rgb(0, 255, 119)' : '#fff'}
        source={{ uri: urlicon }}
      />
    </View>
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
      screen: travelsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Chat',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-chat.svg', tint: tintColor }),
      },
    },
    ScreenConfig: {
      screen: travelsStackNavigator,
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
        // drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-profile.svg', tint: tintColor }),
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: require('../../icons/icon-cupon.svg'), tint: tintColor, v: 'chat' }),
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
        drawerLabel: 'Estadísticas',
        // drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-analytics.svg', tint: tintColor }),
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: require('../../icons/icon-stad.svg'), tint: tintColor, v: 'chat' }),
      },
    },
    ScreenChat: {
      screen: chatStackNavigator,
      navigationOptions: {
        drawerLabel: 'Chat',
        // drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-chat.svg', tint: tintColor }),
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: require('../../icons/icon-chat.svg'), tint: tintColor, v: 'chat' }),
      },
    },
    ScreenConfig: {
      screen: ConfigStackNavigator,
      navigationOptions: {
        drawerLabel: 'Configuraciones',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-settings.svg', tint: tintColor }),
      },
    },
  }, {
    initialRouteName: 'ScreenHome',
    drawerPosition: 'left',
    drawerBackgroundColor: '#fff',
    drawerWidth: width * 0.7,
    contentComponent: CustomDrawerContentComponent,
    unmountInactiveRoutes: true,
    contentOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: 'rgba(255, 255, 255, 0.7)',
      activeBackgroundColor: 'rgba(0, 122, 255, 0.6)',
      labelStyle: {
        fontFamily: 'Roboto',
        fontSize: 17,
        fontWeight: '300',
        marginLeft: 0,
      },
      iconContainerStyle: {
        opacity: 1,
        marginLeft: 25,
      },
      itemStyle: {
        height: 50,
        marginVertical: 0,
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
