from __future__ import unicode_literals
from flask import Flask, request, url_for, session, redirect, render_template
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import time
import json
from bs4 import BeautifulSoup
from requests_html import HTMLSession
from pathlib import Path
import youtube_dl
import requests
import pandas
import os
from youtubesearchpython import VideosSearch


app = Flask(__name__)

app.secret_key = "ONFSDFhdfshdfhsdfh453"
app.config['SESSION_COOKIE_NAME'] = "Cookie"
TOKEN_INFO = 'token_info'


@app.route("/")
def login():
    sp_oauth = create_spotify_oauth()
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)


@app.route('/redirect')
def redirectPage():
    # request -> authorization_code (code)
    # access_token, refresh_token
    sp_oauth = create_spotify_oauth()
    session.clear()
    code = request.args.get("code")
    token_info = sp_oauth.get_access_token(code)
    session[TOKEN_INFO] = token_info

    return redirect(url_for('getTracks', _external=True))


@app.route("/getTracks")
def getTracks():
    try:
        token_info = get_token()
    except:
        print("user not logged in")
        redirect(url_for('login', _external=True))

    sp = spotipy.Spotify(auth=token_info['access_token'])

    tracks = []
    all_songs = []
    iter = 0
    while True:
        tracksjson = sp.current_user_saved_tracks(
            limit=50, offset=iter * 50)["items"]
        iter += 1
        all_songs += tracksjson
        if (len(tracksjson)) < 50:
            break
    id = 1
    for i in all_songs:
        artists = []
        for a in i["track"]["artists"]:
            artists.append(a["name"])
        artists = ", ".join(artists)
        track = {"id": id,
                 "artists": artists,
                 "name": i["track"]["name"],
                 "cover": i["track"]["album"]["images"][2]["url"]}
        id += 1
        tracks.append(track)
    inner = ""
    for i in tracks:
        t = "<tr><th scope='row'>" + \
            str(i["id"])+"</th><td><img class='cover' src='"+i["cover"]+"'></td><td>"+i["name"]+"</td><td>" + \
            i["artists"]+"</td><td><button name = '"+i["artists"]+" "+i["name"]+"' class='btn btn-danger'>YouTube</button></td><td><button name = '" + \
            i["artists"]+" "+i["name"] + \
            "' class='btn btn-success'>Download</button></td></tr>"
        inner += t
    return render_template("index.html", inner=inner)


@app.route("/route/<name>")
def youtube(name):
    return redirect(scrapeVidLink(name))

@app.route("/download/<name>")
def download(name):
    url = scrapeVidLink(name)
    return {"url":url}


def get_token():
    token_info = session.get(TOKEN_INFO, None)
    if not token_info:
        raise 'exception'
    now = int(time.time())
    is_expired = token_info["expires_at"] - now < 60
    if (is_expired):
        sp_oauth = create_spotify_oauth()
        token_info = sp_oauth.refresh_access_token(token_info['refresh_token'])
    return token_info


def create_spotify_oauth():
    return SpotifyOAuth(
        client_id="c12a13513a174002a7850a569f02cf89",
        client_secret="83e9eb949a0344e784fe8e0ace887304",
        redirect_uri=url_for('redirectPage', _external=True),
        scope="user-library-read"
    )


def scrapeVidLink(query):
    videosSearch = VideosSearch(query, limit=1)
    return videosSearch.result()["result"][0]["link"]
