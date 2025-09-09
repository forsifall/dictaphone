import axios from "axios";

export function useMediaRecord(stream: MediaStream) {
  let mediaRecorder: MediaRecorder;
  let audioChunks: Blob[] = [];

  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (e) => {
    audioChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blobAudio = new Blob(audioChunks, { type: "audio/wav" });

    const formData = new FormData();
    formData.append("audio", blobAudio, "recording.wav");

    axios.post("/api/chatGPT/trancription", formData)
    .then((response) => {
      if (response.data.text) {
        return response.data.text
      }
    })
    .then((response) => console.log(`окончательный ответ ${response}`))

    audioChunks = [];
  };

  return { mediaRecorder };
}
