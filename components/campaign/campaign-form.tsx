"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CampaignForm() {
  const router = useRouter();

  const [campaignName, setCampaignName] =
    useState("");

  const [jobDescription, setJobDescription] =
    useState("");

  const [recruiterNotes, setRecruiterNotes] =
    useState("");

function handleGenerate() {
  console.log(
    "SAVING JD:",
    jobDescription
  );

  console.log(
    "SAVING NOTES:",
    recruiterNotes
  );

  console.log(
    "SAVING CAMPAIGN:",
    campaignName
  );

  sessionStorage.setItem(
    "jobDescription",
    jobDescription
  );

  sessionStorage.setItem(
    "recruiterNotes",
    recruiterNotes
  );

  sessionStorage.setItem(
    "campaignName",
    campaignName
  );

  router.push("/campaign/framework");
}

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
          className="min-h-[120px]"
        />
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="rounded-lg bg-white px-5 py-3 font-medium text-black"
      >
        Generate Framework
      </button>
    </form>
  );
}