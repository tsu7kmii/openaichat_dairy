# chat web app
use : react , flask , openai
##  project start
`yarn start` and `python server.py`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## システム概要
reactで文字入力を受け取ってそれをflaskでopenai apiで処理処理し、responseをreactで受け取り処理する


### フロントエンド
 - ChatWindow.js　\
 処理内容

- inputArea.js \
 処理内容


### バックエンド
- server.py 
     - `'app.config['chat_memory']'`により、ユーザー固有の会話を保持できるようにする
     - `@app.route('/api/chat', methods=['POST'])`実際にフロントエンドから処理を送られたときの関数
     - OpenAIを使用してchatの会話を処理してresponseを表示する
