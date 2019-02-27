import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import SurveyCompletedScreen from './screens/SurveyCompletedScreen';
import SurveyScreen from './screens/SurveyScreen';

const stackNav = createStackNavigator({
    Survey: {
        screen: SurveyScreen
    },
    SurveyCompleted: {
        screen: SurveyCompletedScreen
    }
});

const AppContainer = createAppContainer(stackNav);

export default AppContainer;
