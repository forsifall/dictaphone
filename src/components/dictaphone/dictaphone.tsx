"use client";

import React, { useState } from "react";
import "./dictaphone.scss";
import Image from "next/image";

enum Animation {
  Up = "dictaphone-animation--up",
  Down = "dictaphone-animation--down",
}

let animationIs:boolean = false;

export default function Dictaphone() {
  const [animation, setAnimation] = useState<Animation | null>(null);

  const handlerClick = () => {
    if(animationIs) return;
    setAnimation(prev =>
      prev === Animation.Up ? Animation.Down : Animation.Up
    );
  };

  return (
    <div
      onClick={handlerClick}
      onAnimationStart={() => animationIs = true}
      onAnimationEnd={() => animationIs = false}
      className={`dictaphone-section ${animation}`}
    >
      <Image alt="microphone" src="/microphone.svg" width={50} height={50} />
    </div>
  );
}