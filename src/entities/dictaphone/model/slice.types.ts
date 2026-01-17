import { Animation } from "./dictaphone.type"

export interface InitialState {
    animationDictaphonePos: Animation | string
    endSpeak: boolean | null
}