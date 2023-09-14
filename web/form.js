import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.remove("placeholder")

  const videoURL = input.value
  if (!videoURL.includes("shorts")) {
    return (content.textContent =
      "Esse vídeo não perece ser um short. Escolha outro por favor...")
  }

  const [_, params] = videoURL.split("/shorts/") //exibe só a segunda parte da array, ou seja, o código do vídeo
  const [videoID] = params.split("?si")

  content.textContent = "Obtendo texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
