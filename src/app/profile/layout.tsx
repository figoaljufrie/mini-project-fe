"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // helper for classNames
import { LuUser } from "react-icons/lu";
import { LuTicket } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Automatically expand Settings if on a child route
  useEffect(() => {
    if (pathname?.startsWith("/user/settings")) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/profile/home" },
    { name: "Explore Events", href: "/event-browsing" },
    { name: "My Tickets", href: "/profile/my-tickets" },
    {
      name: "Settings",
      href: "/profile/settings",
      children: [{ name: "Password", href: "/profile/settings/password" }],
    },
  ];

  // Build breadcrumb based on current path
  const getBreadcrumbs = () => {
    const parts = pathname?.split("/").filter(Boolean) || [];
    const breadcrumbs: { name: string; href?: string }[] = [];
    let pathAcc = "";
    parts.forEach((part) => {
      pathAcc += `/${part}`;
      let name = part.charAt(0).toUpperCase() + part.slice(1); // Capitalize
      if (pathAcc === "/user/settings/profile") name = "Profile";
      if (pathAcc === "/user/settings/password") name = "Password";
      if (pathAcc === "/user/settings") name = "Settings";
      breadcrumbs.push({ name, href: pathAcc });
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 p-4 backdrop-blur-lg bg-white/10 border-r border-white/20">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <LuUser /> My Account
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.href}>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-lg transition flex justify-between items-center",
                      pathname.startsWith(item.href)
                        ? "bg-white/20 border border-white/30 shadow-md"
                        : "hover:bg-white/10"
                    )}
                  >
                    {item.name}
                    <span>{settingsOpen ? "▾" : "▸"}</span>
                  </button>
                  {settingsOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block px-4 py-2 rounded-lg text-sm",
                            pathname === subItem.href
                              ? "bg-white/20 border border-white/30 shadow-md"
                              : "hover:bg-white/10"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-2 rounded-lg transition flex items-center gap-2",
                  pathname === item.href
                    ? "bg-white/20 border border-white/30 shadow-md"
                    : "hover:bg-white/10"
                )}
              >
                {/* Optional: add icons per item */}
                {item.name === "Profile" && <LuUser />}
                {item.name === "Explore Events" && <LuSearch />}
                {item.name === "My Tickets" && <LuTicket />}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Breadcrumb Navbar */}
        <div className="mb-6 text-white flex items-center gap-2 text-sm font-medium">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-2">
              {index === 0 && <LuUser />}
              {index !== 0 && <span className="text-white/50">/</span>}
              <span>{crumb.name}</span>
            </span>
          ))}
        </div>
        <div className="h-px w-full bg-white/20 my-2"></div>

        {children}
      </main>
    </div>
  );
}
