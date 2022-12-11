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
        page.goto("http://www.naver.com"),
        page.waitForNavigation()
    ])

    let target = "//span[text()='쇼핑']/ancestor::a"
    await page.waitForXPath(target)
    let s = await page.$x(target)
    s = s[0]

    await Promise.all([
        await s.click(),
        page.waitForNavigation()
    ])

    target = "//ul[@class='category_set_list__cseqS']//li/button"
    await page.waitForXPath(target)
    s = await page.$x(target)

    for ( item of s ){
        const value = await item.evaluate(el => el.textContent);
        console.info('value', value.trim())
        console.log(typeof(value))
    }
    
    target = "//input[@title='검색어 입력']"
    await page.waitForXPath(target)
    s = await page.$x(target)
    s = s[0]
    await s.type('핫한 아이템 찾아줘')

    await page.waitForResponse(3000)
    await browser.close();
})(); 