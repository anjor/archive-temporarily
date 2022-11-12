import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [link, setLink] = useState('')
  async function onClick() {
    let data = await fetch('/api/fetch-html')
    data = await data.json()
    console.log({ data })
  }
  async function post() {
    if (!url || (!url.startsWith('http') && !url.startsWith('https'))){
      console.log('must be a valid url')
      console.log('url ', url)
      return
    }
    const response = await axios.post('/api/fetch-html', {
      url
    })
    console.log({ response })
    setLink(response.data.link)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <input
          onChange={e => setUrl(e.target.value)}
          placeholder="Archive a web page"
        />
        <button onClick={post}>Post</button>
        {
          link && (
            <a href={link}>Link</a>
          )
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}