import { useAudioVisualizer } from "@/components/dictaphone/utils/useAudioVisualizer";

export default function DictaphoneBG() {
  const { scale } = useAudioVisualizer();

  console.log("19837219873712098371983721",scale)

  return (
    <>
      <div
        className="dictaphone-bg"
        style={{ transform: `scale(${Math.min(scale,1.2)})` }}
        
      >
      </div>
    </>
  );
}
