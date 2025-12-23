"use client";
import { useDispatch, useSelector } from "react-redux";
import "./styles/text.scss";
import { DispatchType, StoreType } from "@/store";
import { Animation } from "./types/dictaphone.type";
import { getChatGPTResponse } from "@/store/slices/dictaphone";
import { useEffect } from "react";

export default function Text() {
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  let textAnimation =
    dictaphone.animationDictaphonePos === Animation.Down
      ? "dictaphone__text-section--close"
      : "d-block dictaphone__text-section--show";
  if (dictaphone.animationDictaphonePos === "null") textAnimation = "d-none";

  const dispatch = useDispatch<DispatchType>();

  useEffect(() => {
    if (dictaphone.animationDictaphonePos === Animation.Down) {
      dispatch(getChatGPTResponse({ text: null }));
    }
  }, [dictaphone.animationDictaphonePos]);

  return (
    <section className={`dictaphone__text-section ${textAnimation}`}>
      <p
        style={{
          ...(dictaphone.response ? { display: "none" } : { display: "" }),
        }}
      >
        {dictaphone.endSpeak ? "Поиск..." : "Говорите..."}
      </p>
      {dictaphone.response && <p>{dictaphone.response}</p>}
    </section>
  );
}
