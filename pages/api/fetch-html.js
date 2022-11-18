import puppeteer from 'puppeteer'

export default async function handler(req, res) {
  const { body } = req
  let screenshotUri = null
  
  if (body.screenshotEnabled) {
    const IS_PRODUCTION = process.env.NODE_ENV === 'production'
    let browser
    /* begin puppeteer */
    if (IS_PRODUCTION) {
      browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_KEY}`,
        defaultViewport: null
      })
    } else {
      browser = await puppeteer.launch()
    }

    try {
      const page = await browser.newPage()
      await page.goto(body.url, { waitUntil: 'networkidle0', timeout: 0 })

      const example = await page.$('html')
      const bounding_box = await example.boundingBox()
      let height = bounding_box.height > 5000 ? 5000 : Math.round(bounding_box.height)

      await page.setViewport({
        width: Math.round(bounding_box.width),
        height
      })
      const screenshot = await page.screenshot()
      await browser.close()
      /* end puppeteer */

      //const response = uploadToEstuary(screenshot)
      const formData = new FormData();
      const blob = new Blob([screenshot])
      formData.append('data', blob)
      const response = await fetch('https://upload.estuary.tech/content/add',
          {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + process.env.ESTUARY_KEY,
            },
            body: formData
          }
      )
      const resp = await response.json()
      screenshotUri = resp['retrieval_url']
    } catch (err) {
      res.status(200).json({
        error: err
      })
    }
  }

  const baseUrl = body.url.split('/')[2]
  const fullUrl = `https://${baseUrl}`
  const response = await fetch(body.url)
  const text = await response.text()
  let arr = text.split(' ')
  arr = arr.map(item => {
    if (item.includes('.css')) {
      if (item.startsWith('href="/')) {
        item = item.replace('/', `${fullUrl}/`)
      }
      if (item.startsWith("href='/")) {
        item = item.replace('/', `${fullUrl}/`)
      }
      if (item.startsWith('href="./')) {
        item = item.replace('.', `${fullUrl}`)
      }
      if (item.startsWith("href='.")) {
        item = item.replace('.', `${fullUrl}`)
      }
    }
    return item
  })
  let finalText = arr.join(" ")
  finalText = finalText.replace(/(^[ \t]*\n)/gm, "")
  finalText = finalText.replace(/(^"|"$)/g, '')

  //const resp = uploadToEstuary(finalText)
  const formData = new FormData();
  const blob = new Blob([finalText])
  formData.append('data', blob)
  const resp = await fetch('https://upload.estuary.tech/content/add',
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + process.env.ESTUARY_KEY,
        },
        body: formData
      }
  )
  const data = await resp.json()
  const cid = data['cid']
  const dataURI = 'https://api.estuary.tech/gw/ipfs/' + cid

  res.status(200).json({
    link: dataURI,
    screenshotUri,
    cid
  })
}
