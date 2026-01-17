
import Dictaphone from "@/widgets/dictaphone/dictaphone";
import "./page.scss";
import Text from "@/entities/textResponse/Text";
import ReduxProvider from "../store/ReduxProvider";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Умный диктофон",
  description: "Диктофон для распознавания речи с интеграцией chatGPT: быстро получайте текст и ответы на свои вопросы прямо со звука.",
  authors: [{ name: "forsifall", url: "https://github.com/forsifall" }],
  creator: "forsifall",
  publisher: "forsifal",
  robots: "index, follow",
  openGraph: {
    title: "Умный диктофон",
    description: "Диктофон для распознавания речи с интеграцией chatGPT",
    siteName: "Dictaphone",
    locale: "ru_RU",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
    <section className="main-section">
      <div className="dictaphone-panel">
        <ReduxProvider>
          <Dictaphone />
          <Text />
        </ReduxProvider>
      </div>
    </section>
    </main>
  );
}
