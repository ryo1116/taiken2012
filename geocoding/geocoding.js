var destination;        // 目的地
var dest_address;       // 目的地の住所

$(function(){
    // 「ナビ」ボタン(リンク)がクリックされた場合
    $('#navi').live('click', function(){
        // 入力された地名・住所を取り出す
        dest_address = $('#destination').attr("value"); //①
        if(dest_address == "" || dest_address == null) dest_address = "神戸電子専門学校";
        destination = dest_address;

        // 地名・住所から地図を生成する
        getMap(dest_address);
    });

// ---------------------------------------------------------------------------------------
    // map(地図描画ページ)が表示される直前
    $('#map').live('pageshow', function(){
        // ヘッダー部に地名・住所をセットする
        document.getElementById("map_destination").innerHTML = destination;
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
    // 住所から地図を生成する
    var geocoder = new google.maps.Geocoder( );
    if (geocoder) {
        geocoder.geocode({'address': dest_address}, function(results, status) {
            // 地名・住所から緯度・経度が算出できた場合
            if (status == google.maps.GeocoderStatus.OK) {
            	// 表示する地図の大きさと種類を指定する。
            	//   zoom:最初の地図の大きさ（ズームレベル、最小1～最大21）
            	//   mapTypeId:４種類の地図が利用できる
            	//     MapTypeId.ROADMAP - デフォルトの道路地図を表示
            	//     MapTypeId.SATELLITE - Google Earth の航空写真を表示
            	//     MapTypeId.HYBRID - 通常のビューと航空写真の混合表示
            	//     MapTypeId.TERRAIN - 地形情報に基づく物理的なマップタイルを表示
                var myOptions = {
                    // 最初の地図の大きさを指定する　17ぐらいがベスト
                    zoom:17,
                    // 地図の種類を指定する デフォルトは「ROADMAP」
                    mapTypeId: google.maps.MapTypeId.ROADMAP, 
                };

            	// Mapオブジェクトを生成し、画面に表示する
            	//   最初の引数：DOMを使い、画面に表示する位置を指定
            	//   ２つめの引数：描画する地図のオプション
                map = new google.maps.Map(document.getElementById("map_data"), myOptions);

                // 入力された地名・住所を地図の真ん中にする
                map.setCenter(results[0].geometry.location);

                // 地図上にマーカーを追加する
                var marker = new google.maps.Marker({
                    // マーカーを表示する地図を指定する
                    map: map, // ②
                    // マーカーをアニメーション表示する
                    animation: google.maps.Animation.DROP, // ③
                    // マーカーの表示位置を指定する
                    position: results[0].geometry.location // ④
                });
            } else {
                // 住所から緯度・経度が算出できなかった場合
                document.getElementById("map_data").innerHTML = "Geocode was not successful for the following reason: " + status;
            }
        });
    }
}
