import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePatch = "./tmp/audio.mp4"
const outputPatch = filePatch.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Convertendo o vídeo.")

    ffmpeg.setFfmpegPath(ffmpegStatic)

    ffmpeg()
      .input(filePatch)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPatch)
        const fileDecoted = wav.decode(file)

        const audioData = fileDecoted.channelData[0]
        const floatArray = new Float32Array(audioData)
        
        console.log("Vídeo convertido!")

        resolve(floatArray)
        fs.unlinkSync(outputPatch)
      })
      .on("error", (error) => {
        console.log("Erro ao converter o video.", error)
        reject(error)
      })
      .save(outputPatch)
  })
