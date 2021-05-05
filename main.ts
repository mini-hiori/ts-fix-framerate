import ffmpeg from 'fluent-ffmpeg';
import * as fs from "fs"
import * as readline from "readline"

async function fixFramerate(input_filename: string) {
    if (input_filename.includes(".mp4")) {
        console.log("変換中…");
        const input_fileid = input_filename.replace(".mp4", "");
        const output_filename = input_fileid + "_fixed.mp4";
        const movie = await ffmpeg(input_filename)
            .inputFPS(60.0) // 入力時にfpsを60に固定
            .audioBitrate(192) // オーディオビットレートを192kbps(元より高め)にする
            .audioFrequency(48000) // オーディオサンプルレートを48kHzにする(高い)
            .on('end', () => {
                console.log(`変換終了！${output_filename}が出力されたよ`);
            }).save(output_filename);
    } else {
        console.log("ファイル名が怪しいよ");
    }
}

async function main() {
    const stream = fs.createReadStream("target_files.txt");
    const event = readline.createInterface({ input: stream });
    event.on('line', (line) => {
        const input = line.replace("\n", "");
        console.log(`${input}を処理するよ`);
        fixFramerate(input);
    });
}

main();