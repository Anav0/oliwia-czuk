import { TweenMax, Power4 } from "gsap";

export function scaleAnimation(
  elements,
  duration = 1,
  stagger = 0,
  position = 0
) {
  return TweenMax.fromTo(
    elements,
    duration,
    { scale: 1.25, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, ease: Power4, stagger },
    `-=${position}`
  );
}
