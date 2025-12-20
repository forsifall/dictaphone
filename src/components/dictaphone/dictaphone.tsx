"use client";
import "../../test/testPOVTOR";
import "./styles/dictaphone.scss";
import Image from "next/image";
import DictaphoneBG from "./DictaphoneBG";
import { useDictaphoneHandler } from "./utils/dictaphoneHandler";

export default function Dictaphone() {
  const {
    dispatch,
    dictaphone,
    dictaphoneSection,
    animationIs,
    setAnimationIs,
    handlerClick,
  } = useDictaphoneHandler();

  return (
    <>
      <div
        onClick={handlerClick}
        onAnimationStart={() => setAnimationIs(true)}
        onAnimationEnd={() => setAnimationIs(false)}
        className={`dictaphone-section ${dictaphone.animationDictaphonePos}`}
        ref={dictaphoneSection}
      >
        <DictaphoneBG />
        <Image alt="microphone" src="/microphone.svg" width={50} height={50} />
      </div>
    </>
  );
}
