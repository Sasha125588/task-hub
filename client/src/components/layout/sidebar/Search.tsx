import { Search } from "lucide-react";

import { SidebarInput } from "@/components/animate-ui/radix/sidebar";
import { Label } from "@/components/ui/label";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id="search"
          placeholder="Search the docs..."
          className="mr-8 py-5 pl-10"
        />
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </div>
    </form>
  );
}
