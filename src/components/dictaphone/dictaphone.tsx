"use client";

import "./dictaphone.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StoreType } from "@/store";
import { toggleDICPos } from "@/store/slices/dictaphone";
import DictaphoneBG from "./DictaphoneBG";

let animationIs: boolean = false;

export default function Dictaphone() {
  const dispatch = useDispatch<DispatchType>();
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);

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
        <DictaphoneBG />
        <Image alt="microphone" src="/microphone.svg" width={50} height={50} />
      </div>
    </>
  );
}
