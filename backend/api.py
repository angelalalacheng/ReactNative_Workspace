from fileinput import filename
import subprocess
from flask import Flask, redirect, url_for
from flask import request, Response, jsonify
from pymongo import MongoClient
import bson
import json
import gridfs
from gevent import pywsgi  # 因為deploy的關係
import os
import codecs

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
client = MongoClient('mongodb://140.115.51.163:27017/',
                     username='root', password='rootpassword')
db = client.get_database('admin')
fs = gridfs.GridFS(db)


@app.route('/', methods=['GET'])
def welcome():
    return "<h1>Hello! This is Volleyball API.</h1>"


@app.route('/getAll', methods=['GET'])
def getAll():
    DBcollection = db.fs.files
    ALL = DBcollection.find()
    data = []

    for element in ALL:
        element['_id'] = str(element['_id'])
        data.append(element)

    return jsonify(data)


@app.route('/add', methods=['POST'])
def add():
    f = request.files.to_dict()['file']
    print(f)
    try:
        file_id = fs.put(f.read(), filename="video")
        print(file_id)
        f.close()

        test()
        # return Response(response=json.dumps({"msg: ": "success"}))
        # return redirect(url_for('download', id=file_id))
    except Exception as ex:
        print("**********************")
        print(ex)
        return Response(response=json.dumps({"msg": "Failed"}))


@app.route('/findId/<id>', methods=['GET'])
def find_useId(id):
    DBcollection = db.volleyball
    target = DBcollection.find_one({"_id": bson.ObjectId(oid=str(id))})
    target['_id'] = str(target['_id'])
    return jsonify(target)


@app.route('/findImage/<id>', methods=['GET'])
def findImage_useId(id):
    db2 = client.get_database('App_Images')
    fs2 = gridfs.GridFS(db2)
    outputdata = fs2.get(bson.ObjectId(oid=str(id)))
    base64_data = codecs.encode(outputdata.read(), 'base64')
    # image = base64_data.decode('utf-8')
    return outputdata


@app.route('/download/<id>', methods=['GET'])
def download(id):
    outputdata = fs.get(bson.ObjectId(oid=str(id))).read()
    output = open("/home/openpose/examples/media/"+str(id)+'.mp4', "wb")

    output.write(outputdata)
    output.close()

    os.chdir('/home/API/')
    subprocess.run('python3 Execute.py', input=id, shell=True, text=True)

    # process.run(str(id))

    return Response(response=json.dumps({"msg": "download successful"}))


@app.route('/result', methods=['GET'])
def result():
    addr = "C:\\Users\\angela_cheng\\Desktop\\Python_vscode\\test.txt"
    f = open(addr, "r")
    comments = f.read()
    print("hi: ", comments)
    f.close()
    return comments


def test():
    return "function can use"


if __name__ == "__main__":

    app.run()
    # app.debug = True
    # server = pywsgi.WSGIServer(('0.0.0.0:8080'), app)
    # server.serve_forever()
