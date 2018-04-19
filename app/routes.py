#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import render_template
from flask import Flask

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def index():
    user = {'username': 'asd'}
    posts = [
        {
            'author': {'username': 'Enrique'},
            'body': 'Comentario 1!'
        },
        {
            'author': {'username': 'Manuel'},
            'body': 'Comentario 2!'
        }
    ]

    return render_template('index.html', title='Web Test', user=user, post=posts)

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=12800)
