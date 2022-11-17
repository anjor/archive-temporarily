import '../styles/globals.css'
import { css } from '@emotion/css'
import Link from 'next/link'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }) {
  return (
    <div className={containerStyle}>
        <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-CPYN5JNGKZ');
        `}
        </Script>
      <Component {...pageProps} />
      <footer className={footerStyle}>
        <p className={footerText}><Link href="/how-it-works">How it works. </Link> Built with &nbsp;<a rel="noopener" href="https://estuary.tech/" target="_blank">Estuary</a>
         <a href="https://github.com/anjor/archive-temporarily" rel="noopener" target="_blank"><img className={githubLinkStyle} src='/github.svg' alt='loading...' /></a></p>
      </footer>
      <Analytics />
    </div>
  )
}

const githubLinkStyle = css`
  width: 32px;
  height: 32px;
  margin-bottom: -12px;
  margin-left: -2px;
`

const containerStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const footerStyle = css`
  border-top: 1px solid rgba(255, 255, 255, .2);
  padding: 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-top: auto;
  @media (max-width: 450px) {
    height: 80px;
  }
`

const footerText = css`
  font6px;
  margin: 0;
  a {
    color: #4975f0;
  }
`


export default MyApp
