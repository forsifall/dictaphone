import { StoreType } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Animation } from "@/components/dictaphone/types/dictaphone.type";

export function useAudioVisualizer() {
  const [scale, setScale] = useState(1);
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);

  const audioRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    let rafId: number;

    (async () => {
      audioRef.current = new AudioContext();
      analyserRef.current = audioRef.current!.createAnalyser();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      const dataArray:Uint8Array<ArrayBuffer> = new Uint8Array(analyserRef.current.frequencyBinCount);

      function tick() {  
        analyserRef.current!.getByteTimeDomainData(dataArray);
        const amplitude =
          dataArray.reduce((acc, cur) => acc + Math.abs(cur - 128), 0) /
          dataArray.length;

        const SCALE_FACTOR = 10;
        const maxScale = 5;

        if (amplitude > 1) {
          let newScale = 1 + (amplitude / 128) * SCALE_FACTOR;
          if (newScale < 1.2) newScale = 1.2;
          setScale(Math.min(newScale, maxScale));
        } else {
          setScale(1);
        }

        if (
          dictaphone.animationDictaphonePos !== Animation.Down &&
          dictaphone.animationDictaphonePos !== null
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
