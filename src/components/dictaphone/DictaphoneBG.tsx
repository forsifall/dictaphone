import { useAudioVisualizer } from "@/components/dictaphone/utils/useAudioVisualizer";

export default function DictaphoneBG() {
  const {scale} = useAudioVisualizer()

  return (
    <div
      className="dictaphone-bg"
      style={{ transform: `scale(${scale})` }}
    ></div>
  );
}
