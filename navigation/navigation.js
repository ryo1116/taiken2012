var start;              // 出発地
var start_address;      // 出発地の住所

var destination;        // 目的地
var dest_address;       // 目的地の住所

var latlng;             // 緯度と経度

// 出発地と目的地を結ぶルートを表示させるために必要なデータ
var directionDisplay;
var directionsService = new google.maps.DirectionsService( );
var map;

// ---------------------------------------------------------------------------------------
$(function(){
    // 「ナビ」ボタン(リンク)がクリックされた場合
    $('#navi').live('click', function(){
        // 出発地を取り出す
        start_address = $('#start').attr("value"); // ①
        if(start_address == "" || start_address == null) start_address = "三ノ宮駅";

        // 目的地を取り出す
		dest_address = $('#destination').attr("value"); // ②
		if(dest_address == "" || dest_address == null) dest_address = "神戸電子専門学校";

        // 出発地から地図を作成する
        getMap(start_address);
    });

// ---------------------------------------------------------------------------------------
    // map(地図描画ページ)が表示される直前
    $('#map').live('pageshow', function(){
        // ヘッダー部に目的地をセットする
        document.getElementById("map_destination").innerHTML = dest_address;

        // 出発地と目的地の住所からルートリクエストを生成する
        // travelModeは、ルートの計算に使用する交通手段を指定する。有効な値は次の通り
        //  TravelMode.DRIVING　：道路網を使用した標準の運転ルート。
        //  TravelMode.WALKING　：歩行者専用道路と歩道（使用できる場合）を使用した徒歩ルート。
        //  TravelMode.BICYCLING：自転車パスと優先道路を使用する自転車ルート（現在は米国でのみ利用可）
        var request = {
            // 出発地を指定する
            origin:start_address,// ③
            // 目的地を指定する
            destination:dest_address, // ④
            // 交通手段を指定する
            travelMode: google.maps.TravelMode.WALKING// ⑤
        };
        
        // 指定された２地点間のルートを計算する
        directionsService.route(request, function(result, status) {
            // 計算結果が「OK」ならば
            if (status == google.maps.DirectionsStatus.OK) {
                // 出発地点と到着地点にマーカーを配置し、ラインを表示する
                directionsDisplay.setDirections(result); // ⑥
            }
        });
    });

// ---------------------------------------------------------------------------------------
    // 戻るリンク(ボタン)がクリックされた場合
    $('#back_index').live('click', function(){
        // 地図を描画する領域のデータを削除する
        document.getElementById("map_data").innerHTML = "";
    });

});

// ---------------------------------------------------------------------------------------

// 受け取った住所をもとに地図を準備する
function getMap(address){
    // 住所からジオコーダーを使って地図を生成する
    var geocoder = new google.maps.Geocoder( );
    if (geocoder) {
        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myOptions = {
                    zoom:17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("map_data"), myOptions);
                latlng = results[0].geometry.location;
                map.setCenter(latlng);
                                
                // 2地点間のルート表示するための準備
                directionsDisplay = new google.maps.DirectionsRenderer( );
                directionsDisplay.setMap(map);
            } else {
                document.getElementById("map_data").innerHTML = "Geocode was not successful for the following reason: " + status;
            }
        });
    }
}
