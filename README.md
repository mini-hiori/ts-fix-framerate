# ts-fix-framerate
TypeScript(Node.js)で動画のフレームレート固定

## 使い方
- git cloneしてできたフォルダ内に変換したいmp4を入れた状態で以下を実行すると、  
    フレームレートが固定された動画ファイル(_fixed.mp4が末尾についたもの)が生成される
```
docker-compose up
```
- `docker-compose up`だけで動かない場合は事前に`npm install`すると動くかも

## 中身の説明
- [ffmpeg](https://www.ffmpeg.org/)のnodeラッパーの[fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)を利用する
    - とりあえず60fps固定+音質劣化が少なくなるような設定だけ入れている
- カレントディレクトリのmp4を全て捕捉するために[glob](https://www.npmjs.com/package/glob)を利用する
- ffmpegはインストールが必要なので、環境依存を減らすためにDocker化

## TODO
- 使いやすくなければ使わなくなる気がするので、以下どちらかはやりたい
    - 実行ファイル(.exe)化
    - API化