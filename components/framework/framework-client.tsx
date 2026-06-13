// "use client";

// import { useEffect, useState } from "react";

// import { FrameworkResult } from "./framework-result";
// import { LoadingState } from "./loading-state";
// import { ErrorState } from "./error-state";

// import { HiringFramework } from "@/types/framework";

// import { generateFrameworkAction } from "@/app/actions/generate-framework";

// export function FrameworkClient() {
//   const [loading, setLoading] = useState(true);

//   const [error, setError] =
//     useState<string | null>(null);

//   const [framework, setFramework] =
//     useState<HiringFramework | null>(null);

//   useEffect(() => {
//     async function loadFramework() {
//       try {
//         const jobDescription =
//           sessionStorage.getItem(
//             "jobDescription"
//           ) ?? "";

//         const recruiterNotes =
//           sessionStorage.getItem(
//             "recruiterNotes"
//           ) ?? "";

//         console.log(
//           "CLIENT JD:",
//           jobDescription
//         );

//         console.log(
//           "CLIENT NOTES:",
//           recruiterNotes
//         );

//         if (!jobDescription.trim()) {
//           setError(
//             "No Job Description found. Please create a campaign first."
//           );

//           setLoading(false);

//           return;
//         }

//         const result =
//           await generateFrameworkAction(
//             jobDescription,
//             recruiterNotes
//           );

//         if (!result.success) {
//           throw new Error(
//             result.error
//           );
//         }

//         setFramework(
//           result.framework
//         );

//         sessionStorage.setItem(
//           "framework",
//           JSON.stringify(
//             result.framework
//           )
//         );
//       } catch (err) {
//         setError(
//           err instanceof Error
//             ? err.message
//             : "Framework generation failed."
//         );
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadFramework();
//   }, []);

//   if (loading) {
//     return <LoadingState />;
//   }

//   if (error) {
//     return (
//       <ErrorState
//         message={error}
//       />
//     );
//   }

//   if (!framework) {
//     return (
//       <ErrorState message="No framework generated." />
//     );
//   }

//   return (
//     <FrameworkResult
//       framework={framework}
//     />
//   );
// }
"use client";

import { useEffect, useState } from "react";

import { FrameworkResult } from "./framework-result";
import { LoadingState } from "./loading-state";
import { ErrorState } from "./error-state";

import { HiringFramework } from "@/types/framework";

import { generateFrameworkAction } from "@/app/actions/generate-framework";

export function FrameworkClient() {
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
        const cachedFramework =
          sessionStorage.getItem(
            "framework"
          );

        if (cachedFramework) {
          console.log(
            "Using cached framework"
          );

          setFramework(
            JSON.parse(
              cachedFramework
            )
          );

          setLoading(false);

          return;
        }

        const jobDescription =
          sessionStorage.getItem(
            "jobDescription"
          ) ?? "";

        const recruiterNotes =
          sessionStorage.getItem(
            "recruiterNotes"
          ) ?? "";

        if (!jobDescription.trim()) {
          setError(
            "No Job Description found. Please create a campaign first."
          );

          setLoading(false);

          return;
        }

        const result =
          await generateFrameworkAction(
            jobDescription,
            recruiterNotes
          );

        if (!result.success) {
          throw new Error(
            result.error
          );
        }

        const framework =
          result.framework as HiringFramework;

        setFramework(
          framework
        );

        sessionStorage.setItem(
          "framework",
          JSON.stringify(
            framework
          )
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
  }, []);

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
      framework={framework}
    />
  );
}