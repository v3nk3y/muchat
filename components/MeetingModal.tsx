import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { ReactNode } from "react";
import { Button } from "./ui/button";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  handleClick?: () => void;
  className?: string;
  buttonText?: string;
  buttonIcon?: string;
  image?: string;
  children?: ReactNode;
}
const MeetingModal = ({
  title,
  isOpen,
  onClose,
  handleClick,
  className,
  buttonText,
  buttonIcon,
  image,
  children,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-6 w-full max-w-[520px] border-none bg-slate-800 px-6 py-8 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-10", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-700 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-blue-800"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
