import { Animation } from "@/components/dictaphone/types/dictaphone.type"

export interface InitialState {
    animationDictaphonePos: Animation | string
    endSpeak: boolean | null
    response: null | string
}