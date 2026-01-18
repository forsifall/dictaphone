import { useAudioVisualizer } from "@/features/dictaphone/index";

export default function DictaphoneBG() {
  const { scale } = useAudioVisualizer();

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
