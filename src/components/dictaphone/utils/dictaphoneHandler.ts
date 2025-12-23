import { DispatchType, StoreType } from "@/store";
import { toggleDICPos } from "@/store/slices/dictaphone";
import { startTransition, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useDictaphoneHandler() {
  const dispatch = useDispatch<DispatchType>();
  const dictaphone = useSelector((state: StoreType) => state.dictaphone);
  const dictaphoneSection = useRef<HTMLDivElement | null>(null);

  const handlerClick = () => {
    dispatch(toggleDICPos());
  };

  return {
    dispatch,
    dictaphone,
    dictaphoneSection,
    handlerClick,
  };
}
