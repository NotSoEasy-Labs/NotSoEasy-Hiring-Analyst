"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { renameCampaignAction } from "@/app/actions/campaign/rename-campaign";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  campaignId: string;
  currentTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RenameCampaignDialog({
  campaignId,
  currentTitle,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();

  const [title, setTitle] =
    useState(currentTitle);

  const [isPending, startTransition] =
    useTransition();

  function handleSave() {
    if (!title.trim()) {
      return;
    }

    startTransition(async () => {
      const result =
        await renameCampaignAction(
          campaignId,
          title
        );

      if (!result.success) {
        alert(result.error);

        return;
      }

onOpenChange(false);

setTimeout(() => {
  window.location.reload();
}, 100);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Rename Campaign
          </DialogTitle>

          <DialogDescription>
            Update the campaign name.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            disabled={
              isPending
            }
            onClick={handleSave}
          >
            {isPending
              ? "Saving..."
              : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}