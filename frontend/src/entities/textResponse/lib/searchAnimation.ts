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
    onComplete?: () => void;
  }
  
  const timing = (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  
  const draw = (data: Draw) => {
    if(!data.span?.innerHTML) return;  
    if(data.progress > 1) data.progress = 1;
    const currentOffset = (0 - data.totalTextWidth / 2) + (300) * data.progress;
    const rotation = 360 * data.progress;
    const scale = 1 - data.progress;
    const opacity = 1 - data.progress;
  
    data.span.style.position = "absolute";
    data.span.style.transform = `translateX(${currentOffset + data.letterSpacing}px) rotateY(${rotation}deg) scale(${scale})`;
    data.span.style.opacity = `${opacity}`;
  
  };
  
  let rafId: any;
  
  export function animateSearch({ span, letterSpacing, index, totalTextWidth, onComplete }: AnimateProps) {
    const duration = 1000;
    const delay = index * 50; 
    let start = performance.now() + delay;
  
  
    rafId = requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction >= 1) {
        timeFraction = 1;
        if (onComplete) {
          onComplete();
        }
      }
  
      let progress = timing(timeFraction);
  
      draw({ progress, span, letterSpacing, totalTextWidth }); 
  
      if (timeFraction < 1) {
        rafId = requestAnimationFrame(animate);
      }
    });
  }
  