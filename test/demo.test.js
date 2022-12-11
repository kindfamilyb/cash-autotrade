const { expect } = require('chai')

const puppeteer = require('puppeteer');

describe("ui 자동화 테스트 툴", function() {

    let browser;
    let page;

    before(async function() {
        console.info("before")
        browser = await puppeteer.launch({
            headless: false,
            args: ['--window-size-1920,1080'],
            slowMo: 30,
        });

        page = await browser.newPage();

        page.waitForResponse(10000);

        await page.setViewport({
            width: 1920,
            height: 1080
        });
    
    
        await Promise.all([
            page.goto("http://www.naver.com"),
            page.waitForNavigation()
        ]);
    });

    beforeEach(function(){
        console.info("beforeEach")
    });

    afterEach(function(){
        console.info("beforeEach")
    });


    after(async function(){
        console.info("after")
        await browser.close()
    });

    it("쇼핑 클릭하기 테스트", async function() {
        let target = "//span[text()='쇼핑']/ancestor::a"
        await page.waitForXPath(target)
        let s = await page.$x(target)
        s = s[0]

        await Promise.all([
            await s.click(),
            page.waitForNavigation()
        ])


    });
    it("두번째...", async function() {
        let target = "//ul[@class='category_set_list__cseqS']//li/button"
        await page.waitForXPath(target)
        s = await page.$x(target)

        for (item of s) {
            const value = await item.evaluate(el => el.textContent);
            console.info('value: ', value.trim())
        }

        expect(s.length).to.lessThan(20)
        expect(s.length).to.greaterThan(10)

    });

    it("세번째...", async function() {
        let target = "//input[@title='검색어 입력']"
        await page.waitForXPath(target)
        s = await page.$x(target)
        s = s[0]
        await s.type('핫한 아이템 찾아줘')
    });

})