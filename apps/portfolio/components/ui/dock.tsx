import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DockAppProps {
  imgURL: string | StaticImageData;
  transparent?: boolean;
  href?: string;
}

function DockApp({ imgURL, transparent = false, href }: DockAppProps) {
  const iconContent = (
    <div
      className={cn(
        "group relative mx-1 transition-all duration-500 ease-out hover:scale-[1.25]",
        "min-h-[48px] min-w-[48px]"
      )}
    >
      <div
        className={cn(
          "rounded-2xl h-12 w-12 p-1 flex items-center justify-center",
          !transparent && "bg-white shadow-sm"
        )}
      >
        <Image
          width={40}
          height={40}
          className="h-auto w-auto object-contain"
          alt="App icon"
          src={imgURL}
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {iconContent}
      </Link>
    );
  }

  return iconContent;
}

interface DockProps {
  apps: DockAppProps[];
  className?: string;
}

export function Dock({ apps, className }: DockProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="-translate-x-1/2 absolute bottom-0 left-1/2 mx-auto max-w-full transform-gpu pt-4">
        <div className="relative ">
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-[72px] max-w-full rounded-3xl border border-gray-200/60 bg-gray-200/60 shadow-2xs dark:border-gray-600/60 dark:bg-gray-800/60" />
          <div className="flex items-end overflow-x-auto rounded-3xl pl-2">
            {apps.map((app, index) => (
              <DockApp key={index} {...app} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dock;
