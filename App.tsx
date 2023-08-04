/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button
} from 'react-native';
import './shim.js'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { getKeyFromPasswordWithArgon2 } from './utils';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const tryThisStuff = () => {
    try {
      const options = {
        password: 'Password',
        salt: '1',
        parallelism: 4,
        iterations: 1,
        memorySize: 2097023,
        hashLength: 32,
        outputType: 'binary',
      }
      getKeyFromPasswordWithArgon2(options)
    } catch (error) {
      console.log({error})      
    }
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button title='Try me out' onPress={tryThisStuff} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
