var webPage = require('webpage')
var page = webPage.create()

var system = require('system')
var args = system.args

if (args.length === 1) {
  console.log('Usage: task.js <some word>')
  phantom.exit()
}

var result = {}
var time = Date.now()
var word = args[1]

page.open('https://www.baidu.com/s?wd=' + encodeURIComponent(word), function (status) {
  if (status !== 'success') {
    result.code = 0
    result.msg = '抓取失败'
  } else {

    page.render('result.png')

    var dataList = page.evaluate(function () {
      var Results = document.querySelectorAll('.result')

      var dataList = []

      for (var i = 0, len = Results.length; i < len; i++) {

        var obj = {}
        var pic = Results[i].querySelector('.c-img')

        obj.title = Results[i].querySelector('.t a').innerText
        obj.info = Results[i].querySelector('.c-abstract').innerText
        obj.link = Results[i].querySelector('.c-showurl').innerText.trim()
        obj.pic = pic ? pic.src : ''

        dataList.push(obj)
      }
      return dataList
    })

    result.code = 1
    result.msg = '抓取成功'
    result.word = word
    result.time = Date.now() - time
    result.dataList = dataList
  }
  console.log(JSON.stringify(result, null, 4))
  phantom.exit()
})
