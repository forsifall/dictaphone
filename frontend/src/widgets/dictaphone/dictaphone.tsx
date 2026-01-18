"use client";
import "./styles/dictaphone.scss";
import DictaphoneBG from "./DictaphoneBG";
import { useDictaphoneHandler } from "@/entities/dictaphone/index";
import { Animation } from "@/entities/dictaphone/index";
import { MicrophoneIcon } from "./Microphone";

export default function Dictaphone() {
  const { endSpeak, dicPosition, dictaphoneSection, handlerClick } =
    useDictaphoneHandler();

  return (
    <>
      <div
        onClick={handlerClick}
        className={`dictaphone-section ${dicPosition}`}
        ref={dictaphoneSection}
      >
        {dicPosition === Animation.Up && <DictaphoneBG />}
        
        <MicrophoneIcon
          isActive={
            !endSpeak &&
            dicPosition === Animation.Up
          }
        />
      </div>
      <canvas
        className={
          dicPosition === Animation.Up ? "show" : "hidden"
        }
        id="waveCanvas"
      ></canvas>
    </>
  );
}
