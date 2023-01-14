import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
  <ThemeProvider enableSystem={true} attribute="class">
  <Navbar />
  <Component {...pageProps} />
  </ThemeProvider>
  </>
  );
}
