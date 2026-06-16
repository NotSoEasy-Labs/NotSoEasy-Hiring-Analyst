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

async function handleGenerate() {
  try {
    const response = await fetch(
      "/api/campaigns",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title: campaignName,
          jobDescription,
          recruiterNotes,
        }),
      }
    );

    const data =
      await response.json();

    if (!data.success) {
      throw new Error(
        data.error
      );
    }

    router.push(
      `/campaign/${data.campaign._id}/framework`
    );
  } catch (error) {
    console.error(error);

    alert(
      "Unable to create campaign."
    );
  }
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