"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const menuItems = [
    { en: "About Us", ko: "회사소개" },
    { en: "Products", ko: "생산제품" },
    { en: "Production Facilities", ko: "생산설비" },
    { en: "Inquiry", ko: "문의" }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [maxWidths, setMaxWidths] = useState<number[]>([]);

  const setRefs = (el: HTMLSpanElement | null, index: number) => {
    if (el) textRefs.current[index] = el;
  };

  useEffect(() => {
    setMaxWidths(textRefs.current.map((ref) => ref?.offsetWidth ?? 0));
  }, []);

  return (
    <header className="fixed top-0 z-10 h-16 w-full overflow-hidden bg-white/30 backdrop-blur-md">
      <nav className="flex h-full w-full items-center justify-center">
        <Image src="/logo.png" alt="" width={40} height={40} className="mr-6" />
        <ul className="flex space-x-6">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="text-foreground cursor-pointer text-center text-base whitespace-nowrap transition-all duration-200"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                minWidth: maxWidths[index] ? `${maxWidths[index]}px` : "auto"
              }}
            >
              <span ref={(el) => setRefs(el, index)}>
                {hoveredIndex === index ? item.ko : item.en}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
