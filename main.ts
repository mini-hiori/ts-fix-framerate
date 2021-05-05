import ffmpeg from 'fluent-ffmpeg';
import * as readline from "readline"

async function fixFramerate(input_filename: string) {
    if (input_filename.includes(".mp4")) {
        console.log("変換中…");
        const input_fileid = input_filename.replace(".mp4", "");
        const output_filename = input_fileid + "_fixed.mp4";
        const movie = await ffmpeg(input_filename)
            .inputFPS(60.0)
            .audioBitrate(192)
            .audioFrequency(48000)
            .on('end', () => {
                console.log(`変換終了！${output_filename}が出力されたよ`);
                console.log("もういっかいやるならファイルパスを入れてね");
            }).save(output_filename);
    } else {
        console.log("ファイル名が怪しいよ");
    }
}

async function main() {
    console.log("ファイルパスをフルパスで入力してね");
    const event = readline.createInterface({ input: process.stdin });
    event.on('line', (line) => {
        const input = line.replace("\n", "");
        fixFramerate(input);
    });
}

main();