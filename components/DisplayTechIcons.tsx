import React from "react";
import { getTechLogos } from "@/lib/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";

const DisplayTechIcons = async ({ techstack }: TechIconProps) => {
  const techIcons = await getTechLogos(techstack);
  return (
    <div className="flex flex-row">s
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex-center",
            index >= 1 && "-ml-3"
          )}
          key={tech}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            alt={tech}
            width={30}
            height={30}
            className="size-6"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
