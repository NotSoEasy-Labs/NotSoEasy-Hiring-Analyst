"use client";

import { useTransition } from "react";

import { deleteCampaignAction } from "@/app/actions/campaign/delete-campaign";

import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  campaignId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DeleteCampaignDialog({
  campaignId,
  open,
  onOpenChange,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result =
        await deleteCampaignAction(
          campaignId
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
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Campaign?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be
            undone. The campaign and
            all associated data will
            be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            asChild
          >
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={
                handleDelete
              }
            >
              {isPending
                ? "Deleting..."
                : "Delete"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}