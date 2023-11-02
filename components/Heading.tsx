import { cn } from "@/lib/utils";

import { IconNode, LucideIcon } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <div>
      <div className="px-5 md:px-10 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <Icon className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};