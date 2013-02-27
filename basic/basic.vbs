Option Explicit

Dim objIE
Dim i
Dim intWidth
Dim intHeight
Dim intX
Dim intY

'初期設定(ウィンドウサイズ、表示位置に使用)
intWidth = 320
intHeight = 480
intX = 100
intY = 100

'IEオブジェクトを作成します
Set objIE = CreateObject("InternetExplorer.Application")

'ウィンドウの大きさを変更します
objIE.Width = intWidth
objIE.Height = intHeight

'表示位置を変更します
objIE.Left = intX
objIE.Top = intY

'ステータスバーとツールバーを非表示にします
objIE.Statusbar = False
objIE.AddressBar = False


'objIE.Navigate "http://www.yahoo.co.jp/"
objIE.Navigate "http://127.0.0.1:8080/taiken/basic/basic.html"



'インターネットエクスプローラ画面を表示します
objIE.Visible = True

