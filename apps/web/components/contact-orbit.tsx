"use client";

import { useEffect, useRef, useState } from "react";

export const ContactOrbit = () => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const orbit = orbitRef.current;
    const section = orbit?.closest(".contact-section");

    if (!orbit || !section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) return;

    if (!("IntersectionObserver" in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10%", threshold: 0.06 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={orbitRef}
      className="contact-section__orbit"
      data-orbit-active={isActive ? "true" : "false"}
      aria-hidden="true"
    >
      <span className="contact-section__planet contact-section__planet--one" />
      <span className="contact-section__planet contact-section__planet--two" />
    </div>
  );
};
