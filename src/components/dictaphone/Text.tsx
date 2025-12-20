"use client";
import { useSelector } from "react-redux";
import "./styles/text.scss";
import { StoreType } from "@/store";
import { Animation } from "./types/dictaphone.type";

export default function Text() {
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  let textAnimation =
    dictaphone.animationDictaphonePos === Animation.Down
      ? "dictaphone__text-section--close"
      : "d-block dictaphone__text-section--show";
  if (dictaphone.animationDictaphonePos === "null") textAnimation = "d-none";

  return (
    <section
      className={`dictaphone__text-section ${textAnimation}`}
    >
      <p>{dictaphone.endSpeak && !dictaphone.response ? "Поиск..." : "Говорите..."}</p>
      {dictaphone.response && dictaphone.response}
    </section>
  );
}
