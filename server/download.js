import ytdl from "ytdl-core"
import fs from "fs" // permite a minipulação de arquivos

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do vídeo:", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        //console.log(seconds)

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior que 60 segundos. ")
        }
      })
      .on("end", () => {
        console.log("Donwload concluido.")
        resolve()
      })
      .on("error", (error) => {
        console.log("Não possivel fazer o download. Detalhes do erro:" + error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
