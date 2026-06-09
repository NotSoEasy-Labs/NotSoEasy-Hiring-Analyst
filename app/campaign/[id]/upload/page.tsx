import { FileUploadZone } from "@/components/campaign/file-upload-zone";
import { PageHeader } from "@/components/campaign/page-header";

export default function UploadPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="Upload Resumes"
        description="Upload candidate resumes for evaluation."
      />

      <FileUploadZone />
    </main>
  );
}