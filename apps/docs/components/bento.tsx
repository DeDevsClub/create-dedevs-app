import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "@/components/markdown/image"
import Button from "@/components/markdown/button"

interface GridItem {
    title: string
    description: string
    icon: React.ReactNode
    status?: string
    tags?: string[]
    meta?: string
    cta?: string
    ctaText?: string
    hasPersistentHover?: boolean
    external?: boolean
    bgColor?: string
    color?: string
  }
  
  interface GridProps {
    items: GridItem[]
  }

  const Bento = ({ items }: GridProps) => {
    return (
      <div className="flex flex-col w-full gap-3 mt-4 text-white items-center justify-center">
        <Image src="https://docs.dedevs.club/opengraph-image.png" alt="Bento" className="w-full rounded-xl object-cover" width={8000} height={4500}/>
        {items.map((item, index) => (
          <Link href={item.cta || "/docs"}
              key={index}
                  className={cn(  
                  "group relative p-4 rounded-xl overflow-hidden transition-all duration-300 w-full",
                  "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
                  "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)]",
                  "hover:-translate-y-0.5 will-change-transform",
                  "max-w-screen-7xl",
                  {
                    "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5": item.hasPersistentHover,
                  },
                  {
                    "bg-[#000000]": item.bgColor === "primary",
                    "bg-[#adfa1d]": item.bgColor === "secondary",
                  },
                  {
                    "text-[#adfa1d]": item.color === "primary",
                    "text-[#000000]": item.color === "secondary",
                  },
                )}
              >
                <div
                  className={`absolute inset-0 ${
                    item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  } transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
                </div>
  
                <div className="relative flex flex-col space-y-3 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-linear-to-br transition-all duration-300">
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-xs",
                        "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                        "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20",
                      )}
                    >
                      {item.status || "Active"}
                    </span>
                  </div>
  
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                      {item.title}
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">{item.meta}</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">{item.description}</p>
                  </div>
  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      {item.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-md duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Button className={cn(
                      "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-xs",
                      "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                      "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20",
                    )}
                      href={item.cta || "/docs"}
                      external={item.external}
                    >
                      {/* {`${item.ctaText || "Explore"} →`} */}
                      {`→`}
                    </Button>
                  </div>
                </div>
  
                <div
                  className={`absolute inset-0 -z-10 rounded-xl p-px bg-linear-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
                    item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  } transition-opacity duration-300`}
                />
              </Link>
            ))}
          </div>
    );
  };
  
  export default Bento