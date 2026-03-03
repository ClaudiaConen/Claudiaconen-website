import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function CustomCursor() {
  const location = useLocation();
  const dotRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });

  const isAdminOrMemberArea =
    location.pathname.startsWith('/member') || location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdminOrMemberArea) {
      document.body.classList.remove('cc-custom-cursor');
      return;
    }

    const isCoarse = window.matchMedia?.('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reducedMotion) return;

    document.body.classList.add('cc-custom-cursor');

    const dot = dotRef.current;
    const pulse = pulseRef.current;
    if (!dot || !pulse) return;

    const onMove = (e: PointerEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const onDown = () => {
      const { x, y } = posRef.current;
      pulse.style.setProperty('--x', `${x}px`);
      pulse.style.setProperty('--y', `${y}px`);
      pulse.classList.remove('is-pulsing');
      void pulse.offsetWidth;
      pulse.classList.add('is-pulsing');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });

    return () => {
      document.body.classList.remove('cc-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [isAdminOrMemberArea]);

  if (isAdminOrMemberArea) return null;

  return (
    <>
      <div ref={dotRef} className="cc-cursor-dot" aria-hidden="true" />
      <div ref={pulseRef} className="cc-cursor-pulse" aria-hidden="true" />
    </>
  );
}
