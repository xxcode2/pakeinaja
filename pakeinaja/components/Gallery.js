"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery({ photos, name, sold }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const list = photos && photos.length ? photos : [null];

  return (
    <div>
      <button
        type="button"
        onClick={() => list[active] && setLightbox(true)}
        className="hang-tag relative block aspect-square w-full overflow-hidden rounded-tag bg-pine-900 stitch-border"
      >
        {list[active] ? (
          <Image
            src={list[active]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={`object-cover ${sold ? "grayscale opacity-60" : ""}`}
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-xs text-bone-200/40">
            belum ada foto
          </div>
        )}
        {sold && (
          <span className="tag-rotate absolute left-3 top-4 rounded-tag bg-brick-500 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-bone-50 shadow">
            Sold
          </span>
        )}
      </button>

      {list.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-none">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-tag border transition-colors ${
                i === active ? "border-mustard-500" : "border-bone-200/15"
              }`}
            >
              {src && (
                <Image src={src} alt={`${name} foto ${i + 1}`} fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {lightbox && list[active] && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-pine-950/95 p-4"
        >
          <div className="relative h-full w-full max-w-3xl">
            <Image src={list[active]} alt={name} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
