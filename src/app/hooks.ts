"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal hook — observes all elements with reveal-* classes
// ─────────────────────────────────────────────────────────────────────────────
export function useScrollReveal() {
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: isMobile ? 0.15 : 0.08,
        rootMargin: isMobile ? "0px" : "0px 0px -40px 0px",
      }
    );

    const targets = document.querySelectorAll(
      ".reveal-up, .reveal-scale, .reveal-left, .reveal-right, .stagger-children"
    );
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// ─────────────────────────────────────────────────────────────────────────────
// Typing animation hook
// ─────────────────────────────────────────────────────────────────────────────
const PROMPTS = [
  "The Future of Artificial Intelligence in 2026",
  "Top 10 Hidden Travel Destinations",
  "How Quantum Computing Works",
  "Building a Side Hustle From Scratch",
  "The Science Behind Why We Dream",
];

export function useTypingAnimation() {
  const [text, setText] = useState("");
  const [promptIdx, setPromptIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = PROMPTS[promptIdx];
    const speed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPromptIdx((p) => (p + 1) % PROMPTS.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, promptIdx]);

  return text;
}
