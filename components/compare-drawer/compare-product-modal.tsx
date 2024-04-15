"use client";
import { useAppStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

const CompareModal = () => {
  const { compareLimitExceeded, setCompareLimitExceeded } = useAppStore();
  return (
    <div>
      <Dialog
        open={compareLimitExceeded}
        onOpenChange={setCompareLimitExceeded}
      >
        <DialogContent className="bg-primary-dark border-none">
          <DialogDescription className="text-destructive text-xl">
            You can add maximum 4 items to compare.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompareModal;
