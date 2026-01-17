interface Draw {
  progress: number;
  span: HTMLSpanElement | null;
  letterSpacing: number;
  totalTextWidth: number;
}

interface AnimateProps {
  span: HTMLSpanElement | null;
  letterSpacing: number;
  index: number;
  totalTextWidth: number;
}

const timing = (t: number): number => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
};

const draw = (data: Draw) => {
  if(!data.span?.innerHTML) return;  
  if(data.progress > 1) data.progress = 1;
  const currentOffset = (580 - data.totalTextWidth / 2) + (-580) * data.progress; // Start further right and move left, centered
  const rotation = 360 * (1 - data.progress); // Rotate 360 degrees as it comes in
  const scale = 0.5 + 0.5 * data.progress; // Scale from 0.5 to 1

  data.span.style.position = "absolute";
  data.span.style.transform = `translateX(${currentOffset + data.letterSpacing}px) rotateY(${rotation}deg) scale(${scale})`;

};

let rafId: any;

export function animate({ span, letterSpacing, index, totalTextWidth }: AnimateProps) {
  const duration = 1000;
  const delay = index * 50; // 50ms delay per letter
  let start = performance.now() + delay;

  // if (rafId) cancelAnimationFrame(rafId);

  rafId = requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw({ progress, span, letterSpacing, totalTextWidth }); // отрисовать её

    if (timeFraction < 1) {
      rafId = requestAnimationFrame(animate);
    }
  });
}
