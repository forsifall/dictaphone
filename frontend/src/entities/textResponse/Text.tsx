"use client";
import { useDispatch, useSelector } from "react-redux";
import "./text.scss";
import { DispatchType, StoreType } from "@/app/store/store";
import { Animation } from "@/entities/dictaphone/index";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { updateText } from "@/entities/textResponse/model/slice";
import { TextResponse } from "./model/type";
import { animate } from "./lib/speakTextAnimation";
import { animateSearch } from "./lib/searchAnimation";

export default function Text() {
  const dispatch = useDispatch<DispatchType>();

  const spansRef = useRef<Array<HTMLSpanElement | null>>([]);
  const [totalTextWidth, setTotalTextWidth] = useState(0);

  const dicPosition = useSelector(
    (state: StoreType) => state.dictaphone.animationDictaphonePos
  );
  const text = useSelector((state: StoreType) => state.textResponse.text);

  const isDictaphoneOn = dicPosition === Animation.Up;



  useEffect(() => {

    if (isDictaphoneOn) {

    } else {
      let letterSpacing = 0;
      spansRef.current.forEach((span, index) => {
        letterSpacing += 25;
        const onComplete = () => {
          spansRef.current.forEach((s) => {
            if (s) {
              s.style.opacity = "1";
              s.style.transform = "none";
              s.style.position = "static";
            }
          });
          dispatch(updateText({ text: "" }));
        };
        animateSearch({ span, letterSpacing, index, totalTextWidth,
           onComplete: index === spansRef.current.length - 1 ? onComplete : undefined });
      })
    }
  }, [dicPosition]);


  useEffect(() => {
    let letterSpacing = 0;
    if (text === TextResponse.Speak) {
      spansRef.current.forEach((span, index) => {
        letterSpacing += 25;
        animate({ span, letterSpacing, index, totalTextWidth });
      })

    } else if (text === TextResponse.Search) {

    } else if (text === TextResponse.None) {
      
    } else {

    }

  }, [text, totalTextWidth])


  useLayoutEffect(() => {
    if (spansRef.current.length > 0) {
      const lastSpan = spansRef.current[spansRef.current.length - 1];
      if (lastSpan) {
        const width = lastSpan.getBoundingClientRect().right - (spansRef.current[0]?.getBoundingClientRect().left || 0);
        setTotalTextWidth(width);
      }
    }
  }, [text]);

  return (
    <section className={`dictaphone__text-section`}>
      <p>{text?.split("").map((chur: string, index) => {
        return <span ref={ref => { spansRef.current[index] = ref }} key={index}>{chur}</span>
      })}</p>
    </section>
  );
}
