export interface InitialState {
  text: null | string;
}

export enum TextResponse {
    Speak = "Говорите...",
    Search = "Поиск...",
    None = "",
}