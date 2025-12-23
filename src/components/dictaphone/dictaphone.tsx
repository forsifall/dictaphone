"use client";
import "../../test/testPOVTOR";
import "./styles/dictaphone.scss";
import Image from "next/image";
import DictaphoneBG from "./DictaphoneBG";
import { useDictaphoneHandler } from "./utils/dictaphoneHandler";
import { Animation } from "./types/dictaphone.type";
import { useAudioVisualizer } from "./utils/useAudioVisualizer";
import { MicrophoneIcon } from "./Microphone";

export default function Dictaphone() {
  const { dispatch, dictaphone, dictaphoneSection, handlerClick } =
    useDictaphoneHandler();

  return (
    <>
      <div
        onClick={handlerClick}
        className={`dictaphone-section ${dictaphone.animationDictaphonePos}`}
        ref={dictaphoneSection}
      >
        <DictaphoneBG />

        <MicrophoneIcon
          isActive={
            !dictaphone.endSpeak &&
            dictaphone.animationDictaphonePos === Animation.Up
          }
        />
      </div>
      <canvas
        className={
          dictaphone.animationDictaphonePos === Animation.Up ? "show" : "hidden"
        }
        id="waveCanvas"
      ></canvas>
    </>
  );
}
