import Dictaphone from "@/components/dictaphone/Dictaphone";
import "./page.scss";
import Text from "@/components/dictaphone/Text";
import ReduxProvider from "@/store/ReduxProvider";

export default function Home() {
  return (
    <section className="main-section">
      <div className="dictaphone-panel">
        <ReduxProvider>
          <Dictaphone />
          <Text />
        </ReduxProvider>
      </div>
    </section>
  );
}
