import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'
import Head from 'next/head'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    /* background-color: #010a1a; */
    background-color: #021729;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
    backgroundMain: '#021729',
    backgroundHeader: '#010a1a',
    horizontalLine: '#021729',
    backgroundLight: '#7499b96e',
    backgroundMenu: '#334f67',
    title: '#ffffff'
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Alurakut</title>
        <meta property="og:title" content="Alurakut" key="title" />
        <meta property="og:description" content="Imersão React Next by Alura - 3ª edição" key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alurakut-danilok.vercel.app" />
        <meta property="og:image" content="https://alurakut.vercel.app/logo.svg" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
