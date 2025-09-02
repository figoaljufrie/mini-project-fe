"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LuLayoutDashboard } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/app/auth/store/auth-store";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (pathname?.startsWith("/profile/settings")) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/profile/home" },
    { name: "Explore Event", href: "/event-browsing" },
    { name: "My Tickets", href: "/profile/my-tickets" },
    {
      name: "Settings",
      href: "/profile/settings",
      children: [{ name: "Password", href: "/profile/settings/password" }],
    },
  ];

  const getBreadcrumbs = () => {
    const parts = pathname?.split("/").filter(Boolean) || [];
    const breadcrumbs: { name: string; href?: string }[] = [];
    let pathAcc = "";
    parts.forEach((part) => {
      pathAcc += `/${part}`;
      let name = part.charAt(0).toUpperCase() + part.slice(1);
      if (pathAcc === "/profile/settings/password") name = "Password";
      if (pathAcc === "/profile/settings") name = "Settings";
      if (pathAcc === "/profile/home") name = "Home";
      if (pathAcc === "/profile/explore") name = "Explore Event";
      if (pathAcc === "/profile/tickets") name = "My Tickets";
      breadcrumbs.push({ name, href: pathAcc });
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleSignOut = () => {
    logout(); // clears token + user
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex bg-stone-300 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 p-4 backdrop-blur-lg bg-gradient-to-br from-teal-400/30 via-teal-600/30 to-teal-800/30 border-r border-teal-300/20">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black">
          <LuLayoutDashboard /> My Profile
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div key={item.href}>
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-lg transition flex justify-between items-center text-black transform hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,128,128,0.5)]",
                      pathname.startsWith(item.href)
                        ? "bg-teal-500/30 border border-teal-400/30 shadow-[0_6px_20px_rgba(0,128,128,0.5)]"
                        : "hover:bg-teal-500/20"
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
                            "block px-4 py-2 rounded-lg text-sm text-black transform hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,128,128,0.5)]",
                            pathname === subItem.href
                              ? "bg-teal-500/30 border border-teal-400/30 shadow-[0_6px_20px_rgba(0,128,128,0.5)]"
                              : "hover:bg-teal-500/20"
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
                  "block px-4 py-2 rounded-lg transition text-black transform hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,128,128,0.5)]",
                  pathname === item.href
                    ? "bg-teal-500/30 border border-teal-400/30 shadow-[0_6px_20px_rgba(0,128,128,0.5)]"
                    : "hover:bg-teal-500/20"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top navbar with avatar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-black/20">
          {/* Breadcrumb Navbar */}
          <div className="flex items-center gap-2 text-sm font-medium text-black">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index === 0 && <LuLayoutDashboard className="text-black/60" />}
                {index !== 0 && <span className="text-black/40">/</span>}
                <span>{crumb.name}</span>
              </span>
            ))}
          </div>

          {/* Avatar + Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-full px-3 py-2 hover:bg-black/5 transition">
                <Avatar className="h-8 w-8 border border-teal-600">
                  <AvatarImage src="/placeholder-avatar.png" alt="Profile" />
                  <AvatarFallback>
                    {user?.name?.[0] ?? user?.username?.[0] ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-black">
                  {user?.username ?? user?.name ?? "User"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
