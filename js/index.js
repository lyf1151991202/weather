// 请求城市数据
var city;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
	success:function(obj){
		city = obj.data;
		renderCity(city);
		console.log(obj);
	}
})
// 渲染城市
function renderCity(city){
	for(var j in city){
 	var hotCity_top=document.createElement("h1");
 	hotCity_top.className="hotCity_top";
 	hotCity_top.innerHTML=j;
 	var hotCity=document.querySelector(".hotCity");
 	hotCity.appendChild(hotCity_top);

	// hotCity_box
	var hotCity_box=document.createElement("div");
	hotCity_box.className="hotCity_box";
	hotCity.appendChild(hotCity_box);

 	for(var k in city[j]){
	 	// console.log(k);
	 	// console.log(city[j]);
	 	// hotCity_son
	 	var hotCity_son=document.createElement("div");
	 	hotCity_son.className="hotCity_son";
	 	hotCity_son.innerHTML=k;
	 	hotCity_box.appendChild(hotCity_son);
 		}

	}
}
// 渲染数据的函数  函数名
function updata(weather){
	// 渲染城市名称
    var city_name=document.querySelector(".city");
    // console.log(weather.city_name);
    city_name.innerHTML=weather.city_name;
    // 温度
    var current_temperature=document.querySelector(".temperature");
    // console.log(weather.current_temperature);
    current_temperature.innerHTML=weather.current_temperature+'°';
    // 晴
    var current_condition=document.querySelector(".weather");
    // console.log(weather.current_condition);
    current_condition.innerHTML=weather.current_condition;

    // 今天最高温度
    var dat_high_temperature=document.querySelector(".high");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    // 今天最低温度
    var dat_low_temperature=document.querySelector(".low");
    dat_low_temperature.innerHTML=weather.dat_low_temperature+'°';
    // 今天天气情况 
    var day_condition=document.querySelector(".bottom_left");
    day_condition.innerHTML=weather.day_condition;
    // 今天 icon
   var dat_weather_icon_id=document.querySelector("#dat_weather_icon_id");
   dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;

   // 明天最高气温
   var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
   tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
   // 明天最低气温
   var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
   tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+'°';
   // 明天天气情况
   var tomorrow_condition=document.querySelector("#tomorrow_condition");
   tomorrow_condition.innerHTML=weather.tomorrow_condition;
   // 明天icon
   var tomorrow_weather_icon_id=document.querySelector("#tomorrow_weather_icon_id");
   tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
 // 数组类型的对象
// i 代表数组下标
// weather.hourly_forecast[1]代表数组的每个下标
// 渲染近期天气
var str="";
weather.hourly_forecast.forEach((item,index)=>{
	str=str+`
		<div class="now">
			<h2 class="now_time">${item.hour}:00</h2>
			<div class="now_icon" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
			<h2 class="now_temp">${item.temperature}°</h2>
		</div>
	`
})
$(".wrap").html(str);
// 渲染未来天气
var str2="";
weather.forecast_list.forEach((item,index)=>{
	str2=str2+`
	<div class="con">
		<div class="con_date">${item.date.slice(5,7)}/${item.date.slice(8)}</div>
		<div class="con_weaH">${item.condition}</div>
		<div class="con_picH" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
		<div class="con_high">${item.high_temperature}°</div>
		<div class="con_low">${item.low_temperature}°</div>
		<div class="con_picL" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
		<div class="con_weaL">${item.condition}</div>
		<div class="con_wind">${item.wind_direction}</div>
		<div class="con_level">${item.wind_level}</div>
	</div>
	`
})
$(".wrap1").html(str2);

}
// 函数：
// 请求各城市天气情况
function ajax(str){
	var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`
	$.ajax({
		url:url1,
		dataType:"jsonp",
		type:"get",
		success:function(obj){
			// console.log(obj);
			// 获取数据
			var weather=obj.data.weather;
			updata(weather);
			$(".location").css({"display":"none"});
			$(".bg").addClass('block');
		}
	})
}

// 页面加载完成后执行
window.onload=function(){
  // updata();
  $(".hotCity_son").on("click",function(){
  	var cityh=this.innerHTML;
  	ajax(cityh);
  })

  	$(".city").on("click",function(){
		$(".location").css({"display":"block"});
	})

	$(".bot").on("focus",function(){
		$(".search_right").html("搜索");
	})
	// 操作按钮
	var button=document.querySelector(".search_right");
	button.onclick=function(){
		var text=button.innerText;
		if(text=="取消"){
				$(".location").css({"display":"none"})
			}
			else{
				// 获取input中输入的内容 
				var str1=document.querySelector("input").value;
				for(var i in city){
					for(var j in city[i]){
						if(str1==j){
							ajax(str1);
							return;
						}
					}

				}
				alert("没有该城市！");

			}
		}
}