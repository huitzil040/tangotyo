# tangotyo
・様々な単語群を暗記する手伝いをするプログラム
・ジャンル別の出題

問題の出題方法
・「設定する」で「出題範囲」「詳細範囲」それぞれを入力する
・「開始する」を押す

現状の出題範囲
・kobun_tango
 /31~60

各種機能
・編集：「編集する」に追加したい問題、回答、それが属するジャンルを記入する。
     ただし、大元のデータにセーブするわけではないので、別途セーブが必要。
     なお、新しい「出題範囲」を指定した場合のみ、セーブされる。
     この時、tangotyo_data_1.jsonにセーブするべし。
    
・save:この機能は編集したデータをローカル上にあるデータに上書きできる。
　　　 tangotyo_data_2.jsonを指定すべし。
    
・問題データのダウンロード：はじめのセーブはここで行う。ローカルにセーブデータを置くためのボタン。
　　　　　　　　　　　　セーブしたデータに「save」や「編集する」でデータを上書きする
