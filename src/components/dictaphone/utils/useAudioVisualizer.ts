import { DispatchType, StoreType } from "@/store";
import { startTransition, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animation } from "@/components/dictaphone/types/dictaphone.type";
import { getChatGPTResponse, toggleIsSpeak } from "@/store/slices/dictaphone";
import axios from "axios";
import { canvasIsError, cnavasWaveUpdate } from "./waveAnimation";

export function useAudioVisualizer() {
  const [scale, setScale] = useState(1);
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  const dispatch = useDispatch<DispatchType>();

  const audioRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const canvas = document.getElementById("waveCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");



    let rafId: number;
    let timer: ReturnType<typeof setTimeout>;

    (async () => {
      audioRef.current = new AudioContext();
      analyserRef.current = audioRef.current!.createAnalyser();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      const source = audioRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

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

        axios
          .post("/api/chatGPT/trancription", formData)
          .then((response) => {
            if (response.data.text) {
              return response.data.text;
            } else {
              throw Error("нормальный ответ от чат гпт не пришел");
            }
          })
          .then((response) => {
            console.log(`окончательный ответ: ${response}`);

            axios
              .post("/api/chatGPT/response", { textRequest: response })
              .then((chatGPTresponse) => {
                console.log("chatGPT", chatGPTresponse.data);
                if (!chatGPTresponse.data.text) return;
                dispatch(
                  getChatGPTResponse({ text: chatGPTresponse.data.text })
                );
              })
              .catch((e) =>
                console.log(
                  `поймал ошибку при получении ответа от чат гпт: ${e} !!!!!!!!!!!!`
                )
              );
          })
          .catch((e) => {
            dispatch(
              getChatGPTResponse({
                text: "Ошибка! данные не пришли от ChatGPT(...",
              })
            );
            cancelAnimationFrame(rafId);

            canvasIsError();
          });

        audioChunks = [];
      };

      const dataArray: Uint8Array<ArrayBuffer> = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );

      function tick() {
        analyserRef.current!.getByteTimeDomainData(dataArray);
        let amplitude =
          dataArray.reduce((acc, cur) => acc + Math.abs(cur - 128), 0) /
          dataArray.length;
           
        cnavasWaveUpdate(amplitude, rafId, ctx, canvas);

        const SCALE_FACTOR = 10;
        const maxScale = 5;

        if (amplitude > 1) {
          clearTimeout(timer);
          dispatch(toggleIsSpeak({ type: "speak" }));
          if (mediaRecorder.state === "inactive") {
            mediaRecorder.start();
          }
          let newScale = 1 + (amplitude / 128) * SCALE_FACTOR;
          if (newScale < 1.2) newScale = 1.2;
          setScale(Math.min(newScale, maxScale));

          timer = setTimeout(() => {
            mediaRecorder.stop();

            dispatch(toggleIsSpeak({ type: "noSpeak" }));
          }, 1500);
        } else {
          setScale(1);
        }

        if (
          dictaphone.animationDictaphonePos !== Animation.Down &&
          dictaphone.animationDictaphonePos !== "null"
        ) {
          rafId = requestAnimationFrame(tick);
        }
      }

      tick();
    })();

    return () => cancelAnimationFrame(rafId);
  }, [dictaphone.animationDictaphonePos]);

  return { scale };
}
