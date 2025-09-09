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

    axios.post("/api/chatGPT/trancription", formData).then((response) => {
      if (response.data.text) {
        console.log(response.data.text);
      } else {
        console.log(response)
      }
    });

    audioChunks = [];

    console.log("фетчу апи роутс");
  };

  return { mediaRecorder };
}
