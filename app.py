from flask import Flask, make_response, json, jsonify
from flask import render_template  # 引入模板插件
from flask_cors import CORS
from random import *

import requests

app = Flask(__name__,
            static_folder="./templates/vuetest/dist/dist",  # 设置静态文件夹目录
            template_folder="./templates/vuetest/dist"  # 设置vue编译输出目录dist文件夹，为Flask模板文件目录
            )
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route('/api/random')
def random_number():
    response = {
        'randomNumber': randint(1, 100)
    }
    return jsonify(response)
# @app.route('/', methods=['GET'])
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
# def read_json(json_name):
#     filename = json_name + '.json'
#     try:
#         with open('/' + filename) as f:
#             jsonStr = json.load(f)
#             return json.dumps(jsonStr)
#     except Exception as e:
#         return jsonify({"code": "异常", "message": "{}".format(e)})

# def index():
def catch_all(path):
    if app.debug:
        return requests.get('http://localhost:8080/{}'.format(path)).text
    return render_template("index.html")  # ,
    # name='index')  # 使用模板插件，引入index.html。此处会自动Flask模板文件目录寻找index.html文件。


# def index(path):
#     return 'hello'

CORS(app, supports_credentials=True)

if __name__ == '__main__':
    app.run()


# @app.after_request
# def af_request(resp):
#     """
#     #请求钩子，在所有的请求发生后执行，加入headers。
#     :param resp:
#     :return:
#     """
#     resp = make_response(resp)
#     resp.headers['Access-Control-Allow-Origin'] = '*'
#     resp.headers['Access-Control-Allow-Methods'] = 'GET,POST'
#     resp.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
#     return resp
