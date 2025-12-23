export function MicrophoneIcon({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <svg
      id="i-microphone"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="dictaphone-icon"
    >
      <defs>
        <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141414ff" />
          <stop offset="50%" stopColor="#353535ff" />
          <stop offset="100%" stopColor="#000000ff" />
        </linearGradient>

        <linearGradient
          id="blueGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#000000ff" />
          <stop offset="50%" stopColor="#043d3fff" />
          <stop offset="100%" stopColor="#000000ff" />
        </linearGradient>
      </defs>

      <path
        d="M16 2 C12 2 12 6 12 6 L12 16 C12 16 12 20 16 20 20 20 20 16 20 16 L20 6 C20 6 20 2 16 2 Z M8 17 C8 17 8 24 16 24 24 24 24 17 24 17 M13 29 L19 29 M16 24 L16 29"
        stroke={isActive ? "url(#blueGradient)" : "url(#darkGradient)"}
      />
    </svg>
  );
}
