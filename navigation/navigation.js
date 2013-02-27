var directionDisplay;
var directionsService = new google.maps.DirectionsService( );
var map;

var start;              // 出発地
var start_address;      // 出発地の住所
var destination;        // 目的地
var dest_address;       // 目的地の住所

$(function(){
    $('#freelink li').live('click', function(){
        // 目的地の住所を取り出し、セッションスコープで保持しておく
        dest_address = $('#freeaddress').attr("value");
        destination = dest_address;
        getMap();
    });

    // index(最初のページ)の目的地(リストアイテム)がクリックされた場合
    $('#destination li').live('click', function(){
        // 目的地とその住所を取り出し、セッションスコープで保持しておく
        destination = $(this).text();
        dest_address = $(this).attr("address");
        getMap();
    });

// ---------------------------------------------------------------------------------------
    // 戻るリンク(ボタン)がクリックされた場合
    $('#back_index').live('click', function(){
        // 地図を描画する領域のデータを削除する
        document.getElementById("map_data").innerHTML = "";
    });

// ---------------------------------------------------------------------------------------
    // map(地図描画ページ)が表示される直前
    $('#map').live('pageshow', function(){

/*
        // 出発地とその住所をセッションスコープから取り出す
        //var map_start = sessionStorage.getItem("start");
        var map_start_address = sessionStorage.getItem("start_address");

        // 目的地とその住所をセッションスコープから取り出す
        var map_destination = sessionStorage.getItem("destination");
        var map_dest_address = sessionStorage.getItem("dest_address");
*/
        // ヘッダー部に目的地をセット
        document.getElementById("map_destination").innerHTML =  destination;
        //document.getElementById("map_destination").innerHTML =  map_start_address;

        // 出発地と目的地の住所からルートリクエストを生成する
        // travelModeは、ルートの計算に使用する交通手段を指定する。有効な値は次の通り
        // TravelMode.DRIVING は道路網を使用した標準の運転ルート。
        // TravelMode.WALKING は歩行者専用道路と歩道（使用できる場合）を使用した徒歩ルート。
        // TravelMode.BICYCLING は自転車パスと優先道路を使用する自転車ルート（現在は米国でのみ利用可）
        var request = {
            origin:start_address,
            destination:dest_address,
            travelMode: google.maps.TravelMode.WALKING
        };
        
        // 指定された２地点間のルートを計算し、ポリラインの表示と、出発地点と到着地点のマーカーを配置する。
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });

    });
});

// ---------------------------------------------------------------------------------------

// 出発地の住所をベースに地図を準備する
function getMap(){
    // 出発地とその住所を取り出し、セッションスコープで保持しておく
    start_address = $('#start').attr("value");

    // 出発地住所からジオコーダーを使って地図を生成しておく
    var geocoder = new google.maps.Geocoder( );
    if (geocoder) {
        geocoder.geocode({'address': start_address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myOptions = {
                    zoom:17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("map_data"), myOptions);
                map.setCenter(results[0].geometry.location);
                directionsDisplay = new google.maps.DirectionsRenderer( );
                directionsDisplay.setMap(map);
            } else {
                document.getElementById("map_data").innerHTML = "Geocode was not successful for the following reason: " + status;
            }
        });
    }
}
