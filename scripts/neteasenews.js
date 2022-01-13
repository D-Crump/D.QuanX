const cookieName = '网易新闻'
const cookieKey = 'chavy_cookie_neteasenews'
const bodyKey = 'chavy_body_neteasenews'
const $nobyda = nobyda();
const cookieVal = JSON.parse($nobyda.read(cookieKey))
const bodyVal = $nobyda.read(bodyKey)

if (!cookieVal || !bodyVal) {
    console.log("请获取Cookie")
    $nobyda.notify("网易新闻", "签到失败", "请获取Cookie")
    $nobyda.end()
} else {
  checkin()
  $nobyda.end()
}

function checkin() {
  const neteasenews = {
    url: 'https://c.m.163.com/uc/api/sign/v3/commit',
    headers: cookieVal,
    body: bodyVal
  };
  $nobyda.post(neteasenews, function(error, response, data) {
  	let result = JSON.parse(data)
    if (!error) {
      if (result.code == 200) {
        $nobyda.notify("网易新闻", "签到成功", "")
        console.log("neteasenews success response : \n" + data)
        $done()
      } else {
        if (result.code == 700) {
          $nobyda.notify("网易新闻", "今天已经签过到", "");
        } else {
          $nobyda.notify("网易新闻 - 签到失败 ‼️", "", data)
        }
        console.log("neteasenews failed response : \n" + data)
        $done()
      }
    } else {
      $nobyda.notify("网易新闻 - 签到接口请求失败", "", error)
    }
  })
  $nobyda.end()
}


function nobyda() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, post, end }
};
