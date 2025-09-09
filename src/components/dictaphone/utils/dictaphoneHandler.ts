import { DispatchType, StoreType } from "@/store";
import { toggleDICPos } from "@/store/slices/dictaphone";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useDictaphoneHandler() {
  const dispatch = useDispatch<DispatchType>();
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  const dictaphoneSection = useRef<HTMLDivElement | null>(null);
  const [animationIs, setAnimationIs] = useState<boolean>(false);

  const handlerClick = () => {
    if (animationIs) return;
    dispatch(toggleDICPos());
  };

  return {
    dispatch,
    dictaphone,
    dictaphoneSection,
    animationIs,
    setAnimationIs,
    handlerClick,
  };
}
