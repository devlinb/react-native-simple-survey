import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { 
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import SurveyCompletedScreen from './screens/SurveyCompletedScreen';
import SurveyScreen from './screens/SurveyScreen';


const stackNav = createStackNavigator({
  Survey: {
    screen: SurveyScreen
  }
});

const AppContainer = createAppContainer(stackNav);

export default AppContainer;

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
