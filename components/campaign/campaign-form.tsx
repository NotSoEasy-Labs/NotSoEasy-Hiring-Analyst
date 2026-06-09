"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CampaignForm() {
  const [campaignName, setCampaignName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [recruiterNotes, setRecruiterNotes] = useState("");

  return (
    <form className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium">
          Campaign Name
        </label>

        <Input
          value={campaignName}
          onChange={(e) =>
            setCampaignName(e.target.value)
          }
          placeholder="Senior Frontend Engineer Hiring"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Job Description
        </label>

        <Textarea
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          placeholder="Paste job description..."
          className="min-h-[220px]"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Recruiter Notes
        </label>

        <Textarea
          value={recruiterNotes}
          onChange={(e) =>
            setRecruiterNotes(e.target.value)
          }
          placeholder="Optional notes..."
          className="min-h-[120px]"
        />
      </div>

      <button
        type="button"
        className="
          rounded-lg
          bg-white
          px-5
          py-3
          text-black
          font-medium
          transition
          hover:bg-zinc-200
        "
      >
        Generate Framework
      </button>
    </form>
  );
}