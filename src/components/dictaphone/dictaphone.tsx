import "./dictaphone.scss"
import Image from "next/image"

export default function Dictaphone() {
  return (
    <div className="dictaphone-section">
        <Image alt="microphone" src="/microphone.svg" width={50} height={50} />
    </div>
  )
}
