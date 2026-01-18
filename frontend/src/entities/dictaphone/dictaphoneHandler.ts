import { DispatchType, StoreType } from "@/app/store/store";
import { toggleDICPos } from "@/entities/dictaphone/model/slice";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useDictaphoneHandler() {
  const dispatch = useDispatch<DispatchType>();
  const endSpeak = useSelector((state: StoreType) => state.dictaphone.endSpeak);
  const dicPosition = useSelector((state: StoreType) => state.dictaphone.animationDictaphonePos);
  const dictaphoneSection = useRef<HTMLDivElement | null>(null);

  const handlerClick = () => {
    dispatch(toggleDICPos());
  };

  return {
    dispatch,
    endSpeak,
    dicPosition,
    dictaphoneSection,
    handlerClick,
  };
}
