"use client";

import { useState } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { RenameCampaignDialog } from "./rename-campaign-dialog";
import { DeleteCampaignDialog } from "./delete-campaign-dialog";

type Campaign = {
  _id: string;
  title: string;
  status: string;
  framework: unknown;
  clarificationQuestions: unknown[];
  createdAt: string;
  updatedAt: string;
};

type Props = {
  campaign: Campaign;
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-zinc-700 text-zinc-200",

  FRAMEWORK_GENERATED:
    "bg-blue-900/40 text-blue-300",

  CLARIFICATION_PENDING:
    "bg-yellow-900/40 text-yellow-300",

  READY_FOR_EVALUATION:
    "bg-green-900/40 text-green-300",

  EVALUATION_COMPLETE:
    "bg-purple-900/40 text-purple-300",
};

export function CampaignCard({
  campaign,
}: Props) {
  const [renameOpen, setRenameOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  return (
    <>
      <RenameCampaignDialog
        campaignId={campaign._id}
        currentTitle={campaign.title}
        open={renameOpen}
        onOpenChange={setRenameOpen}
      />

      <DeleteCampaignDialog
        campaignId={campaign._id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900">
        <div className="flex items-start justify-between">
          <h2 className="max-w-[75%] text-lg font-semibold">
            {campaign.title}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-md p-2 transition hover:bg-zinc-800">
                ⋮
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  setRenameOpen(true)
                }
              >
                Rename
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500"
                onClick={() =>
                  setDeleteOpen(true)
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-6 space-y-2 text-sm text-zinc-400">
          <p>
            Created:{" "}
            {new Date(
              campaign.createdAt
            ).toLocaleDateString()}
          </p>

          <p>
            Updated:{" "}
            {new Date(
              campaign.updatedAt
            ).toLocaleDateString()}
          </p>

          <p>
            Framework:{" "}
            {campaign.framework
              ? "Generated"
              : "Pending"}
          </p>

          <p>
            Clarifications:{" "}
            {campaign
              .clarificationQuestions
              ?.length
              ? "Generated"
              : "Pending"}
          </p>

          <p>Resumes: 0</p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              STATUS_COLORS[
                campaign.status
              ] ??
              "bg-zinc-800 text-zinc-300"
            }`}
          >
            {campaign.status.replaceAll(
              "_",
              " "
            )}
          </span>

          <Link
            href={`/campaign/${campaign._id}`}
            className="font-medium text-white transition hover:text-zinc-300"
          >
            Open →
          </Link>
        </div>
      </div>
    </>
  );
}