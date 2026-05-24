import Image from "next/image";

type ImagePanelProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function ImagePanel({ src, alt, priority = false, className = "" }: ImagePanelProps) {
  return (
    <div className={`image-fallback relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10100f]/70 via-transparent to-transparent" aria-hidden="true" />
    </div>
  );
}
