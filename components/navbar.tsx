"use client";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import MobileSidebar from "./mobile-sidebar";
import { Sparkles } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = ({ isPro }: { isPro: boolean }) => {
  const { onOpen } = useProModal();

  return (
    <div className="fixed flex w-full z-50 justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <div>
          <MobileSidebar isPro={isPro} />
          <Link href="/">
            <h1
              className={cn(
                "hidden md:block text-xl md:text-3xl font-bold text-primary",
                font.className
              )}
            >
              companion.ai
            </h1>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button variant="premium" size="sm" onClick={onOpen}>
            Upgrade
            <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        )}

        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
