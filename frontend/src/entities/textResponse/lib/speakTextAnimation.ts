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
  const currentOffset = (580 - data.totalTextWidth / 2) + (-580) * data.progress;
  const rotation = 360 * (1 - data.progress);
  const scale = 0.5 + 0.5 * data.progress; 

  data.span.style.position = "absolute";
  data.span.style.transform = `translateX(${currentOffset + data.letterSpacing}px) rotateY(${rotation}deg) scale(${scale})`;

};

let rafId: any;

export function animate({ span, letterSpacing, index, totalTextWidth }: AnimateProps) {
  const duration = 1000;
  const delay = index * 50; 
  let start = performance.now() + delay;


  rafId = requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw({ progress, span, letterSpacing, totalTextWidth }); 

    if (timeFraction < 1) {
      rafId = requestAnimationFrame(animate);
    }
  });
}
