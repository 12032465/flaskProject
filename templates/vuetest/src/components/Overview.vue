<template>
  <div id="map"></div>
</template>

<script>
import {chinaData} from '../js/china.js'
export default {
  name: "Overview",
  data() {
    return {
      map: ""
    }
  },
  mounted() {
    this.initDate();
  },
  methods: {
    initDate() {
      this.map = L.map("map", {
        center: [22, 107], // 地图中心
        zoom: 5, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false // 移除右下角leaflet标识
      });
      let name = L.tileLayer(
          // 'https://api.mapbox.com/styles/v1/zhaiyzh/ckes4nsma2yls19op279otef9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiemhhaXl6aCIsImEiOiJja2VyeWYzNTYwbHB1MnhzYTV0Z3didG1hIn0.forlrmKVYKXTsyP7voWu9Q'
          "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",//初始化一个 openlayers 地图
          // 天地图影像图层
          // "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
          // 天地图影像注记图层
          // "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=5d27dc75ca0c3bdf34f657ffe1e9881d", //parent.TiandituKey()为天地图密钥
          // 加载谷歌地图
          // "http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8"
          // 加载高德地图
          // 'http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
      ).addTo(this.map);
      //点击地图弹出经纬度
      this.map.on('click', function (e) {
        console.log(e);
        alert('纬度：' + e.latlng.lat + '\n经度：' + e.latlng.lng);
      });
      //添加marker
      // let marker = L.marker([23.09, 114.23]).addTo(this.map)
      // //添加marker pp
      // marker.bindPopup("我是popup").openPopup(); // openPopup 是自动打开气泡
      //多点过滤
      var marker = L.marker([31.8963, 117.293]).addTo(this.map);
      var someFeatures = [{
        "type": "Feature",
        "properties": {
          "name": "Coors Field",
          "show_on_map": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [39.94, 116.33]
        }
      }, {
        "type": "Feature",
        "properties": {
          "name": "Busch Field",
          "show_on_map": false
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-104.98404, 44.74621]
        }
      }];

      L.geoJSON(someFeatures, {
        filter: function (feature, layer) {
          return feature.properties.show_on_map;
        }
      }).addTo(this.map);
      //多点过滤end
      //设置样式
      var style = {
        "color": "#f00", //边框颜色
        "weight": 3, //边框粗细
        "opacity": 0.4, //透明度
        "fillColor": 'transparent', //区域填充颜色
        "fillOpacity": 0, //区域填充颜色的透明
      };
      L.geoJSON(chinaData, {style: style}).addTo(this.map);
      //中国边界描边 end
      this.drawBoundary(chinaData.features[0].geometry.coordinates);
    },
    drawBoundary(blist) {
      //geojson数据
      //定义中国东南西北端点，作为第一层
      var pNW = {lat: 59.0, lng: 73.0};
      var pNE = {lat: 59.0, lng: 136.0};
      var pSE = {lat: 3.0, lng: 136.0};
      var pSW = {lat: 3.0, lng: 73.0};
      //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
      var pArray = [];debugger
      pArray.push(pNW);
      pArray.push(pSW);
      pArray.push(pSE);
      pArray.push(pNE);
      pArray.push(pNW);
      //循环添加各闭合区域
      for (var i = 0; i < blist.length; i++) {
        var points = [];
        blist[0][i].forEach(item => {
          points.push({lat: item[1], lng: item[0]});
        })

        //将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
        pArray = pArray.concat(points);
        pArray.push(pArray[0]);
      }
      //添加遮蔽层
      // var plyall = L.polygon(pArray, {color: 'transparent', fillColor: '#C0C0C0', fillOpacity: 0.9}); //建立多边形覆盖物
      // plyall.addTo(this.map);
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: calc(100vh);
}

.draw {
  display: flex;
  z-index: 2;
  width: 100px;
  height: 50px;
  position: absolute;
  left: 50px;
  justify-content: center;
  align-items: center;
}

.disDraw {
  display: flex;
  z-index: 2;
  width: 100px;
  height: 50px;
  position: absolute;
  left: 200px;
  justify-content: center;
  align-items: center;
}
</style>