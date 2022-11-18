import { css } from '@emotion/css'
import Link from 'next/link'
import Head from 'next/head'

export default function HowItWorks() {
  return (
    <div>
      <Head>
        <title>Archive Temporarily</title>
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <div className={wrapperStyle}>
        <div className={mainContainerStyle}>
          <nav className={navStyle}>
            <Link href="/">Home</Link>
          </nav>
          <h1 className={titleStyle}>HOW IT WORKS.</h1>
          <div className={textContainerStyle}>
            <p>
              This is a h/t to <a href="https://www.archiveforever.xyz/" target="_blank" rel="noopener">Archive Forever</a> built by the inimitable <a href="https://twitter.com/dabit3" target="_blank" rel="noopener">Nader</a>.
            </p>
            <p>
              The key difference is that this website is built on top of <a href="https://filecoin.io/" target="_blank" rel="noopener">Filecoin</a> using <a href="https://estuary.tech/" target="_blank" rel="noopener">Estuary</a>.
              </p>
            <p>
            Estuary is currently in alpha and is invite-only, but if you mention this website in the <a href="https://docs.estuary.tech/get-invite-key" target="_blank" rel="noopener">request form</a> we'll make sure you get access!
            </p>

            <p>Want to support this project? Send Matic, ETH, or stablecoins to <a href="https://polygonscan.com/address/0x40696c3503CD8248da4b0bF9d02432Dc22ec274A" target="_blank" rel="noopener">this address.</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

const navStyle = css`
  width: 800px;
  @media (max-width: 820px) {
    width: 100%;
    padding: 0px 40px;
  }
  @media (max-width: 520px) {
    padding: 0px 20px;
  }
`

const mainContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 720px) {
    padding: 0px 20px;
  }
`

const wrapperStyle = css`
  margin-top: 50px;
`

const titleStyle = css`
  margin-bottom: 0px;
  font-size: 64px;
  font-weight: 800;
  letter-spacing: 5px;
  text-align: center;
  @media (max-width: 720px) {
    font-size: 50px;
    padding: 0px 40px;
  }
  @media (max-width: 520px) {
    font-size: 40px;
    padding: 0px 20px;
  }
`

const textContainerStyle = css`
  width: 800px;
  margin-bottom: 50px;
  p {
    font-size: 20px;
  }
  a {
    color: #668bf9;
  }
  @media (max-width: 820px) {
    width: 100%;
    padding: 0px 40px;
    p {
      font-size: 16px;
    }
  }
  @media (max-width: 520px) {
    padding: 0px 20px;
  }
`