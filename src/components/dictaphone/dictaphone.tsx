"use client";

import "./dictaphone.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StoreType } from "@/store";
import { toggleDICPos } from "@/store/slices/dictaphone";
import { useEffect, useRef, useState } from "react";
import { Animation } from "./types/dictaphone.type";

let animationIs: boolean = false;

export default function Dictaphone() {
  const [scale, setScale] = useState(1);
  const dispatch = useDispatch<DispatchType>();
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    let rafId: number;

    async function init() {
      const audio = new AudioContext();

      const analyser = audio.createAnalyser();
      analyserRef.current = analyser;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audio.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function tick() {
        analyser.getByteTimeDomainData(dataArray);
        const amplitude =
          dataArray.reduce((acc, cur) => acc + Math.abs(cur - 128), 0) /
          dataArray.length;

        const SCALE_FACTOR = 10; // увеличивает эффект, но ограничим max
        const maxScale = 5;

        if (amplitude > 1) {
          let newScale = 1 + (amplitude / 128) * SCALE_FACTOR;
          if(newScale < 1.2) newScale = 1.2
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
    }

    init();

    return () => cancelAnimationFrame(rafId);
  }, [dictaphone.animationDictaphonePos]);

  const handlerClick = () => {
    if (animationIs) return;
    dispatch(toggleDICPos());
  };

  return (
    <>
      <div
        onClick={handlerClick}
        onAnimationStart={() => (animationIs = true)}
        onAnimationEnd={() => (animationIs = false)}
        className={`dictaphone-section ${dictaphone.animationDictaphonePos}`}
      >
        <div
          className="dictaphone-bg"
          style={{ transform: `scale(${scale})` }}
        ></div>
        <Image alt="microphone" src="/microphone.svg" width={50} height={50} />
      </div>
    </>
  );
}
