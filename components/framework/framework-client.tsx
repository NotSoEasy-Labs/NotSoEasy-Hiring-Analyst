"use client";

import { useEffect, useState } from "react";

import { FrameworkResult } from "./framework-result";
import { LoadingState } from "./loading-state";
import { ErrorState } from "./error-state";

import { HiringFramework } from "@/types/framework";

import { generateFrameworkForCampaignAction } from "@/app/actions/generate-framework-for-campaign";

type Props = {
  campaignId: string;
};

export function FrameworkClient({
  campaignId,
}: Props) {
  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [framework, setFramework] =
    useState<HiringFramework | null>(
      null
    );

  useEffect(() => {
    async function loadFramework() {
      try {
        const result =
          await generateFrameworkForCampaignAction(
            campaignId
          );

        if (!result.success) {
          throw new Error(
            result.error
          );
        }

        setFramework(
          result.framework
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Framework generation failed."
        );
      } finally {
        setLoading(false);
      }
    }

    loadFramework();
  }, [campaignId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
      />
    );
  }

  if (!framework) {
    return (
      <ErrorState message="No framework generated." />
    );
  }

  return (
<FrameworkResult
  campaignId={campaignId}
  framework={framework}
/>
  );
}