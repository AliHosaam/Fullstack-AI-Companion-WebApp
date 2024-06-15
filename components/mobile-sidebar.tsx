import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

const MobileSidebar = ({ isPro }: { isPro: boolean }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="bg-secondary pt-12 w-32">
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
