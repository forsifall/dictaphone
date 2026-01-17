import { DispatchType, StoreType } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animation } from "@/entities/dictaphone/index";
import { toggleIsSpeak } from "@/entities/dictaphone/index";
import axios from "axios";
import { canvasIsError, cnavasWaveUpdate } from "./waveAnimation";
import { updateText } from "@/entities/textResponse/model/slice";

export function useAudioVisualizer() {
  const [scale, setScale] = useState(1);
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    const canvas = document.getElementById("waveCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    dispatch(updateText({ text: `Говорите...` }));

    let canceled = false;
    let rafId: number;
    let timer: ReturnType<typeof setTimeout>;

    let audioCtx: AudioContext;
    let analyser: AnalyserNode;
    let source: MediaStreamAudioSourceNode;
    let mediaRecorder: MediaRecorder;

    (async () => {
      try {
        audioCtx = new AudioContext();
        analyser = audioCtx.createAnalyser();

        const stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
        });

        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        let audioChunks: Blob[] = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          audioChunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const blobAudio = new Blob(audioChunks, { type: "audio/wav" });
          const formData = new FormData();
          formData.append("audio", blobAudio, "recording.wav");

          try {
            const response = await axios.post("/api/chatGPT/trancription", formData);
            if (!response.data.text) throw new Error("нормальный ответ от чат гпт не пришел");

            console.log(`окончательный ответ: ${response.data.text}`);

            const chatResponse = await axios.post("/api/chatGPT/response", { textRequest: response.data.text });
            if (chatResponse.data.text) {
              dispatch(updateText({ text: chatResponse.data.text }));
            }
          } catch (e) {
            dispatch(updateText({ text: "Ошибка! данные не пришли от ChatGPT(..."}));
            cancelAnimationFrame(rafId);
            canvasIsError();
          }

          audioChunks = [];
        };

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const tick = () => {
          if (canceled) return;

          analyser.getByteTimeDomainData(dataArray);
          let amplitude = dataArray.reduce((acc, cur) => acc + Math.abs(cur - 128), 0) / dataArray.length;

          cnavasWaveUpdate(amplitude, rafId, ctx, canvas);

          const SCALE_FACTOR = 10;
          const maxScale = 5;

          if (amplitude > 1) {
            clearTimeout(timer);
            dispatch(toggleIsSpeak({ type: "speak" }));
            if (mediaRecorder.state === "inactive") mediaRecorder.start();

            let newScale = 1 + (amplitude / 128) * SCALE_FACTOR;
            if (newScale < 1.2) newScale = 1.2;
            setScale(Math.min(newScale, maxScale));

            timer = setTimeout(() => {
              mediaRecorder.stop();
              dispatch(toggleIsSpeak({ type: "noSpeak" }));
              dispatch(updateText({ text: "Поиск..." }));
            }, 1500);
          } else {
            setScale(1);
          }

          if (dictaphone.animationDictaphonePos !== Animation.Down && dictaphone.animationDictaphonePos !== "null") {
            rafId = requestAnimationFrame(tick);
          }
        };

        tick();
      } catch (err) {
        console.error("Ошибка при инициализации аудио:", err);
        canvasIsError();
      }
    })();

    return () => {
      canceled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timer);

      if (mediaRecorder) {
        mediaRecorder.ondataavailable = null;
        mediaRecorder.onstop = null;
        if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
      }

      if (source) source.disconnect();
      if (analyser) analyser.disconnect();
      if (audioCtx) audioCtx.close();

        (source?.mediaStream?.getTracks() || []).forEach((t) => t.stop());

    };
  }, [dictaphone.animationDictaphonePos]);

  return { scale };
}