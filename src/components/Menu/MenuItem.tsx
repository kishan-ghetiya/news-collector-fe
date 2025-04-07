import Link from "next/link";
import { ReactNode } from "react";

interface MenuItemProps {
  children: ReactNode;
  href: string;
}
const MenuItem = ({ children, href }: MenuItemProps) => {
  return (
    <li>
      <Link href={href}>
        <div className="px-4 py-2 hover:bg-neutral-100 transition hover:cursor-pointer">
          {children}
        </div>
      </Link>
    </li>
  );
};

export default MenuItem;
