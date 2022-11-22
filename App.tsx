import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

const API_KEY =
  'liangxiang::stepzen.net+1000::3ef17ec0cf586f4404bd8776e497a7e208a05f1c81423876dd27ec24ef9b8e3f';

// Initialize ApolloClient
const client = new ApolloClient({
  uri: 'https://liangxiang.stepzen.net/api/nonexistent-camel/__graphql',
  headers: {
    Authorization: `Apikey ${API_KEY}`
  },
  cache: new InMemoryCache()
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
