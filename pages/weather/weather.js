var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
var qqmapsdk

Page({
    data:{
        address: ''
    },
    onLoad:function(){
        var self = this
        console.log(self)
        // 实例化腾讯地图API核心类
        qqmapsdk = new QQMapWX({
            key:'VAQBZ-5HPC6-G6ESZ-E4QM5-2AB3H-LNFDZ'
        })
        // 获取当前位置的精度和维度
        wx.getLocation({
            type:'wgs84',
            success:function(res) {
                qqmapsdk.reverseGeocoder({
                    location:{
                        latitude:res.latitude,
                        longitude:res.longitude
                    },
                    success:function(addressRes){
                        console.log(addressRes)
                        self.setData({
                            address:addressRes.result.address
                        })
                        // if(addressRes.status == 0){

                        // }else{
                        //     alert(addressRes.message)
                        // }
                    }
                })
            }
        })
    }
    
})