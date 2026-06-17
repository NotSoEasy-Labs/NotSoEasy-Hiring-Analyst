import { migrateCampaignOwnersAction } from "@/app/actions/campaign/migrate-campaign-owners";

export default function MigratePage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">
      <form
        action={async () => {
          "use server";

          const result =
            await migrateCampaignOwnersAction();

          console.log(result);
        }}
      >
        <button className="rounded-lg bg-white px-6 py-3 text-black">
          Migrate Existing Campaigns
        </button>
      </form>
    </main>
  );
}