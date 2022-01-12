# 网易新闻签到自用版
根据大神脚本修改而来，原版本在最新的App上无法使用，于是重新抓包后自行东拼西凑出来。感谢前辈们的付出

## 配置 (QuanX)
```properties
[MITM]
*.m.163.com
[rewrite_local]
^https:\/\/c\.m\.163\.com\/uc\/api\/sign\/v3\/commit url script-request-body neteasenews.cookie.js
[task_local]
1 0 * * * neteasenews.js
```

# 招商银行信用卡签到（公众号）
根据大神脚本修改而来，更新了最新接口

## 感谢

[@NobyDa](https://github.com/NobyDa)

[@lhie1](https://github.com/lhie1)

[@ConnersHua](https://github.com/ConnersHua)
