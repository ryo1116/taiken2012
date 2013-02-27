var lat = 0.0;        // 緯度
var lng = 0.0;        // 経度

$(function(){
    // 「ナビ」ボタン(リンク)がクリックされた場合
    $('#navi').live('click', function(){
        // 入力された緯度・経度を取得する
        //lat = $('#lat').attr("value");    // latの前の「//」を削除する
        //lng = $('#lng').attr("value");    // lngの前の「//」を削除する
    });

// ---------------------------------------------------------------------------------------
    // map(地図描画ページ)が表示される直前
    $('#map').live('pageshow', function(){
        // ヘッダー部に緯度・経度をセット
        document.getElementById("map_destination").innerHTML = "緯度：" + lat + ", 経度：" + lng;

    	// 受け取った緯度と経度で位置情報を作成
    	var latlng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));

    	// 表示する地図のオプションを指定する。
    	//   zoom:初期のズームレベル（最小1～最大21）
    	//   mapTypeId:４種類の地図が利用できる
    	//             MapTypeId.ROADMAP - デフォルトの道路地図を表示
    	//             MapTypeId.SATELLITE - Google Earth の航空写真を表示
    	//             MapTypeId.HYBRID - 通常のビューと航空写真の混合表示
    	//             MapTypeId.TERRAIN - 地形情報に基づいて物理的なマップ タイルを表示します。
    	var myOptions = {
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    	
    	// Mapオブジェクトを生成し、画面に表示する
    	//   最初の引数：DOMを使い、画面に表示する位置を指定
    	//   ２つめの引数：描画する地図のオプション
        var map = new google.maps.Map(document.getElementById("map_data"), myOptions);

        // 入力された緯度・経度の位置を地図の真ん中におく
        map.setCenter(latlng);

        // 地図上にマーカーを追加する
        var  marker  =  new  google.maps.Marker ( {
            map: map,
            animation: google.maps.Animation.DROP,
            position: latlng
        });
    });

// ---------------------------------------------------------------------------------------
    // 戻るリンク(ボタン)がクリックされた場合
    $('#back_index').live('click', function(){
        // 地図を描画する領域のデータを削除する
        document.getElementById("map_data").innerHTML = "";
    });

});
