import Dictaphone from "@/components/dictaphone/Dictaphone";
import "./page.scss";

export default function Home() {
  return (
    <section className="main-section">
      <div className="dictaphone-panel">
        <Dictaphone />
      </div>
    </section>
  );
}
