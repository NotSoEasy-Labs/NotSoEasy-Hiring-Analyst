"use client";

import { useEffect, useMemo, useState } from "react";

import { getCampaignsAction } from "@/app/actions/campaign/get-campaigns";

import { DashboardContent } from "./dashboard-content";

type Campaign = {
  _id: string;
  title: string;
  status: string;
  framework: unknown;
  clarificationQuestions: unknown[];
  createdAt: string;
  updatedAt: string;
};

export function DashboardClient() {
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [campaigns, setCampaigns] =
    useState<Campaign[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const result =
          await getCampaignsAction();

        if (!result.success) {
          throw new Error(
            result.error
          );
        }

        setCampaigns(
          result.campaigns as Campaign[]
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load campaigns."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  const filteredCampaigns =
    useMemo(() => {
      if (!search.trim()) {
        return campaigns;
      }

      return campaigns.filter(
        (campaign) =>
          campaign.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          campaign.status
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [campaigns, search]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading campaigns...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search campaigns..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none transition focus:border-zinc-600"
      />

      <DashboardContent
        campaigns={
          filteredCampaigns
        }
      />
    </div>
  );
}