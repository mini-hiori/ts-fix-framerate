import ffmpeg from 'fluent-ffmpeg';
import glob from 'glob';

async function fixFramerate(input_filename: string) {
    if (!input_filename.includes("_fixed")) {
        console.log("変換中…");
        const input_fileid = input_filename.replace(".mp4", "");
        const output_filename = input_fileid + "_fixed.mp4";
        const movie = await ffmpeg(input_filename)
            .inputFPS(60.0) // 入力時にfpsを60に固定
            .audioBitrate(192) // オーディオビットレートを192kbps(元より高め)にする
            // .audioCodec('libmp3lame') // オーテzィオコーデックはAAC
            .videoCodec('libx264') // ビデオコーデックはH.264
            .on('end', () => {
                console.log(`変換終了！${output_filename}が出力されたよ`);
            }).save(output_filename);
    } else {
        console.log("_fixedとつくファイルは無視するよ");
    }
}

async function main() {
    glob("*.mp4", function (er, files) {
        files.map(file => {
            console.log(`${file}を処理するよ`);
            fixFramerate(file);
        })
    })
}

main();