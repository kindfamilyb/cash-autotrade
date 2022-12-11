const puppeteer = require('puppeteer');

( async() => {
    console.info('start...')
    console.info('puppetter', puppeteer)

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1920,1080'],
        slowMo: 1,
    })
    
    const page = await browser.newPage()

    await page.setViewport({
        width: 1920,
        height: 1080
    })

    await Promise.all([
        page.goto("https://kr.investing.com/currencies/usd-krw"),
        page.waitForNavigation()
    ])

    let target = "//span[@data-test='instrument-price-last']"
    await page.waitForXPath(target)
    dolla = await page.$x(target)

    const dalla_value = await dolla[0].evaluate(el => el.textContent);
    console.info('원달러환율', dalla_value.trim())

    // 원달러 환율 db에 저장하는 요청

    await browser.close();


    // const browser_index = await puppeteer.launch({
    //     headless: false,
    //     args: ['--window-size=1920,1080'],
    //     slowMo: 1,
        
    // })
    
    // const page_index = await browser_index.newPage()

    // await page_index.setViewport({
    //     width: 1920,
    //     height: 1080
    // })

    // await Promise.all([
    //     page_index.goto("https://kr.investing.com/currencies/usd-krw"),
    //     page_index.waitForNavigation()
    // ])

    // let target_index= "//span[@data-test='instrument-price-last']"
    // await page_index.waitForXPath(target_index)
    // dolla = await page_index.$x(target_index)

    // const dalla_index_value = await dolla[0].evaluate(el => el.textContent);
    // console.info('원달러환율', dalla_index_value.trim())
    // await browser_index.close();
})(); 