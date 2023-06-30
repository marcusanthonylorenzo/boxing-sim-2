import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  // QueryClient,
  QueryClientProvider,
  // QueryCache
} from 'react-query'
import { queryCache, queryClient } from '../hooks/useSharedState'
import { ClickedBoxerCardContext } from '../services/Context'
import useActiveBoxerSelection from '../hooks/useActiveBoxerSelection'
import fightStartContext from '../context/fightStartContext'
import { FightStartProvider } from '../hooks/useFightStart'

function MyApp({ Component, pageProps }: AppProps) {

  const { clickedBoxerCards, setClickedBoxerCards } = useActiveBoxerSelection();

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ClickedBoxerCardContext.Provider value={{ clickedBoxerCards, setClickedBoxerCards }}>
        <FightStartProvider>
          <Component {...pageProps} />
        </FightStartProvider>
      </ClickedBoxerCardContext.Provider>
    </QueryClientProvider>
  )
}

export default MyApp
