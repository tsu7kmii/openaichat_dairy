from flask import Flask, request, jsonify, session
from openai import OpenAI
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
CORS(app)

# ユーザー固有の会話履歴を管理するための辞書
if 'chat_memory' not in app.config:
    app.config['chat_memory'] = {}

def get_user_chat_memory(session_id):
    """ユーザー固有の会話履歴を取得または初期化する"""
    if session_id not in app.config['chat_memory']:
        app.config['chat_memory'][session_id] = []
    return app.config['chat_memory'][session_id]

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    session_id = request.cookies.get('session')  # セッションIDを取得

    # クッキーからセッションIDを取得し、なければ新規に作成
    if not session_id:
        session_id = os.urandom(24).hex()
        response = jsonify({'reply': ''})
        response.set_cookie('session', session_id)
        return response

    # ユーザーの会話履歴を取得
    chat_memory = get_user_chat_memory(session_id)

    # ユーザーの入力を会話履歴に追加
    chat_memory.append({"role": "user", "content": user_input})

    # 特定の入力に対する処理
    if user_input == "22nknubr4tsdf9":
        chat_memory.clear()
        user_prompt = "あなたは今からプログラム作成の補助員として活躍してもらいます。「スタート」と言われたら始まります。変なことを言ってきても、とりあえず「がんばったね」など応援肯定してあげてください" #プロンプトを将来的にはここに入れる
        chat_memory.append({"role": "system", "content": user_prompt})
        chat_memory.append({"role": "user", "content": "スタート"})
        prompt = [{"role": message["role"], "content": message["content"]} for message in chat_memory]
    else:
        prompt = [{"role": message["role"], "content": message["content"]} for message in chat_memory]

    # OpenAI APIへのリクエスト
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=prompt,
        temperature=0.7
    )
    response = completion.choices[0].message.content

    # レスポンスを会話履歴に追加
    chat_memory.append({"role": "assistant", "content": response})

    # 会話履歴をセッションIDに基づいて保存
    app.config['chat_memory'][session_id] = chat_memory

    # 結果を返す
    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(debug=True)
