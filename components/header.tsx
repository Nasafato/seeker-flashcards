import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

interface HeaderProps {
  pageTitle: React.ReactNode;
  actions: React.ReactNode;
}

export function Header({ pageTitle, actions }: HeaderProps) {
  return (
    <div className="[grid-area:header] flex items-center px-2 h-12 gap-2 border-b border-border">
      <Logo />
      <Separator orientation="vertical" />
      <div className="font-medium">{pageTitle}</div>
      <div className="ml-auto">{actions}</div>
    </div>
  );
}
