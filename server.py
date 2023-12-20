from flask import Flask, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os

class ChatMemory:
    memory = []

    @classmethod
    def save_message(cls, role, new_message):
        add_message = {
            "role": role,
            "content": new_message
        }
        cls.memory.append(add_message)

    @classmethod
    def get_memory(cls):
        return cls.memory

load_dotenv()
client = OpenAI(api_key = os.environ['OPENAI_API_KEY'])

app = Flask(__name__)

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    ChatMemory.save_message('user', user_input)
    load_dotenv()
    client = OpenAI(api_key = os.environ['OPENAI_API_KEY'])
    prompt = ChatMemory.get_memory()
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=prompt,
        temperature=0.7
    )
    response = completion.choices[0].message.content
    ChatMemory.save_message('assistant', response)

    return jsonify({'reply':response})

if __name__ == '__main__':
    app.run(debug=True)
