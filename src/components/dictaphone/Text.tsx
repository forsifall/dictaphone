"use client";
import { useSelector } from "react-redux";
import "./text.scss";
import { StoreType } from "@/store";
import { Animation } from "./types/dictaphone.type";

export default function Text() {
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  const isHide =
    dictaphone.animationDictaphonePos === Animation.Down || null ? true : false;
  return (
    <section
      className={`dictaphone__text-section ${
        isHide
          ? "dictaphone__text-section--close"
          : "d-block dictaphone__text-section--show"
      }`}
    >
      <p>SOME TEXT</p>
    </section>
  );
}
