import React from "react";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  className?: string;
  title: string;
  srcImage: string;
  srcWidth: number;
};

export default function Card({ className, title, srcImage, srcWidth }: Props) {
  return (
    <div className={clsx("w-1/2 shadow-lg rounded-xl p-6", className)}>
      <p className="text-2xl font-bold">{title}</p>
      <div className="w-full">
        <div className="pb-1 pt-12 w-1/2 relative float-right">
          <Image src={srcImage} alt="Picture of the author" width={srcWidth} />
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  title: "",
  srcWidth: "400",
};
