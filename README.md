# tools
（微信小程序开发）工具：天气查询、日历等
## 目录
[一、获取当前具体地址信息](https://github.com/zwl-jasmine95/tools#%E4%B8%80%E8%8E%B7%E5%8F%96%E5%BD%93%E5%89%8D%E5%85%B7%E4%BD%93%E5%9C%B0%E5%9D%80%E4%BF%A1%E6%81%AF)<br>
[二、微信小程序引用font-awesome](https://github.com/zwl-jasmine95/tools#%E4%BA%8C%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%95%E7%94%A8font-awesome)<br>

---

## 一、获取当前具体地址信息
1. 下载微信小程序[JavaScriptSDK](http://lbs.qq.com/qqmap_wx_jssdk/index.html)<br>
 (1)申请开发者密钥（key）：[申请密钥](http://lbs.qq.com/console/key.html)

 (2)下载微信小程序JavaScriptSDK，微信小程序[JavaScriptSDK v1.0](http://3gimg.qq.com/lightmap/xcx/jssdk/qqmap-wx-jssdk1.0.zip)

 (3)安全域名设置，在“设置” -> “开发设置”中设置request合法域名，添加https://apis.map.qq.com
(安全域名设置是在[微信公众平台](https://mp.weixin.qq.com/wxopen/devprofile?action=get_profile&token=1188388219&lang=zh_CN)中设置的)

2. 获取当前位置的经纬度
```js
Page({
    onLoad:function(){
        // 获取当前位置的经度和维度
        wx.getLocation({
            type:'wgs84',
            success:function(res) {
                // 经度：res.latitude,
                // 纬度：res.longitude
            }
        })
    }
})

```

3. 引用腾讯地图sdk，根据经纬度获取位置信息
[逆地址解析接口](http://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html)

```js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk

Page({
    onLoad:function(){
        var self = this
        // 实例化腾讯地图API核心类
        qqmapsdk = new QQMapWX({
            key:'自己获取的key'
        })
        // 获取当前位置的经度和维度
        wx.getLocation({
            type:'wgs84',
            success:function(res) {
                // 根据经纬度获取具体地址信息
                qqmapsdk.reverseGeocoder({
                    location:{
                        latitude: res.latitude,
                        longitude: res.longitude
                    },
                    success:function(addressRes){
                        console.log(addressRes)
                        
                    }
                })
            }
        })
    }
})

```

---

## 二、微信小程序引用font-awesome
<b>小程序的wxss文件font-face的url不接受http地址作为参数,可以接受base64,因此可以先将字体文件下载后,转换为base64，然后引用。</b>

1. 去[官网](http://fontawesome.dashgame.com/)下载font-awesome
2. 将下载的<b>font-awesome.css</b>文件放入项目中新建的style文件夹中，并将后缀改为“.wxss”
3. 打开[Transfonter](https://transfonter.org/)网站。<br>
    (1) 点击 [Add fonts] 上传<b>fontawesome-webfont.ttf</b>文件<br>
    (2) 勾选 [Base64 encode]、[TTF]，完成后点击 [Convert]<br>
    (3) 点击 [Download]。<br>
    (4) 打开下载文件中的<b>stylesheet.css</b>文件，复制里面的内容，替换掉<b>font-awesome.wxss</b>文件里的第一段代码：
    ```css
    /*被替换的代码*/
    @font-face {
        font-family: 'FontAwesome';
        src: url('../fonts/fontawesome-webfont.eot?v=4.7.0');
        src: url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    ```
4. 在app.wxss中引用font-awesome.wxss
```css
/**app.wxss**/
@import 'style/font-awesome.wxss';
```
5. 最后就可以在页面中引用图标了
```html
<text class="fa fa-flag"></text>
```

---

