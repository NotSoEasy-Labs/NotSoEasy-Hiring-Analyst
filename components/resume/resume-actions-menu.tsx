"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

import { DownloadResumeButton } from "./download-resume-button";
import { ReplaceResumeButton } from "./replace-resume-button";
import { DeleteResumeButton } from "./delete-resume-button";
import { ParseResumeButton } from "./parse-resume-button";

type Props = {
  resumeId: string;
  status: string;
};

export function ResumeActionsMenu({
  resumeId,
  status,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-lg p-2 transition hover:bg-zinc-800">
          <MoreVertical className="h-5 w-5 text-zinc-400" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuItem asChild>
          <div>
            <DownloadResumeButton
              resumeId={resumeId}
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div>
            <ReplaceResumeButton
              resumeId={resumeId}
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <div>
            <DeleteResumeButton
              resumeId={resumeId}
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <div>
            <ParseResumeButton
              resumeId={resumeId}
              status={status}
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}