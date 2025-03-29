"use client"
  
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export interface NavItem {
  title: string;
  href: string;
  items?: NavItem[];
}

interface SidebarNavProps {
  items: NavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-2 text-sm font-semibold">{item.title}</h4>
          {item.items?.length && (
            <div className="grid grid-flow-row auto-rows-max">
              {item.items.map((subItem, idx) => (
                <Link
                  key={idx}
                  href={subItem.href}
                  className={clsx(
                    "flex w-full items-center rounded-md py-2 text-sm",
                    "hover:underline",
                    pathname === subItem.href
                      ? "font-medium text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
