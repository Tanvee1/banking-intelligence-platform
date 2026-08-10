"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "left",
  delay = 0,
  duration = 600,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return "-translate-x-12 opacity-0";
      case "right":
        return "translate-x-12 opacity-0";
      case "up":
        return "translate-y-12 opacity-0";
      case "down":
        return "-translate-y-12 opacity-0";
      default:
        return "-translate-x-12 opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out transform ${
        isVisible ? "translate-x-0 translate-y-0 opacity-100 scale-100" : `${getInitialTransform()} scale-95`
      } ${className}`}
    >
      {children}
    </div>
  );
}
