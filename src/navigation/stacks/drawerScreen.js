/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
  const { navigate } = props.navigation;
  const { items, ...rest } = props;

  const profile = store.getState().profile.data;
  const firstName = profile ? profile[0].profile.firt_name : '';
  const lastName = profile ? profile[0].profile.last_name : '';
  const shortName = lastName.split(' ');
  // Remover item Profile
  const filteredItems = items.filter(item => item.key !== 'ScreenProfile');
  return (
    <Container>
      <Content contentContainerStyle={{ height: '100%' }}>
        <ImageBackground
          source={require('../../Images/MenuCargapp.png')}
          style={{ width: '130%', height: '100%' }}
        >
          <AvatarProfile
            avatar={require('../../Images/profile.jpg')}
            // avatar={{ uri: 'https://avatars3.githubusercontent.com/u/25873769?s=460&v=4' }}
            press={() => navigate('ScreenProfile')}
            text={firstName}
            secondText={shortName[0]}
          />
          <DrawerItems
            items={filteredItems}
            {...rest}
            /* {...props} */
          />
        </ImageBackground>
      </Content>
    </Container>
  );
}

function DrawerIcon({ urlicon, tint }) {
  return (
    <View
      style={{
        height: 50,
        width: '300%',
        display: 'flex',
        justifyContent: 'center',
        borderLeftWidth: 3.5,
        borderLeftColor: tint === '#fff' ? 'rgb(0, 255, 119)' : 'rgba(255, 255, 255, 0)',
      }}
    >
      <DrawIconMenu
        fillAll
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
        drawerLabel: 'Retos',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-points.svg', tint: tintColor }),
      },
    },
    ScreenCoupons: {
      screen: CouponsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Cupones',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-cupon.svg', tint: tintColor }),
      },
    },
    ScreenStats: {
      screen: AnalyticsStackNavigator,
      navigationOptions: {
        drawerLabel: 'Estadísticas',
        drawerIcon: ({ tintColor }) => DrawerIcon({ urlicon: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-stad.svg', tint: tintColor }),
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
        /* lineHeight: 17, */
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
