import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryClient } from './api/react-query/queryClient';
import { IndexProvider } from './pages/IndexPageProvider';

export const App = (): JSX.Element => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <div className='App'>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path='/' element={<IndexProvider />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};
