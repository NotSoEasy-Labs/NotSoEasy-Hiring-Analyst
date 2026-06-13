// "use client";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { QuestionCard } from "./question-card";
// import { ProgressIndicator } from "./progress-indicator";
// import { ClarificationResult } from "./clarification-result";

// import { ClarificationQuestion } from "@/types/clarification";
// import { HiringFramework } from "@/types/framework";

// import { generateClarificationsAction } from "@/app/actions/generate-clarifications";
// import { refineFrameworkAction } from "@/app/actions/refine-framework";

// export function ClarificationClient() {
//   const loadedRef = useRef(false);

//   const [questions, setQuestions] =
//     useState<ClarificationQuestion[]>(
//       []
//     );

//   const [loading, setLoading] =
//     useState(true);

//   const [currentIndex, setCurrentIndex] =
//     useState(0);

//   const [answers, setAnswers] =
//     useState<Record<string, string>>(
//       {}
//     );

//   const [refinedFramework, setRefinedFramework] =
//     useState<HiringFramework | null>(
//       null
//     );

//   useEffect(() => {
//     if (loadedRef.current) {
//       return;
//     }

//     loadedRef.current = true;

//     async function loadQuestions() {
//       try {
//         const framework =
//           sessionStorage.getItem(
//             "framework"
//           ) ?? "{}";

//         console.log(
//           "FRAMEWORK:",
//           framework
//         );

//         const result =
//           await generateClarificationsAction(
//             framework
//           );

//         console.log(
//           "QUESTIONS:",
//           result
//         );

//         if (result.success) {
//           console.log(
//             "SETTING QUESTIONS:",
//             result.questions.length
//           );

//           setQuestions(
//             result.questions
//           );
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadQuestions();
//   }, []);

//   async function submitAnswers() {
//     try {
//       const framework =
//         sessionStorage.getItem(
//           "framework"
//         ) ?? "{}";

//       const parsedFramework =
//         JSON.parse(framework);

//       const result =
//         await refineFrameworkAction(
//           parsedFramework,
//           answers
//         );

//       if (result.success) {
//         setRefinedFramework(
//           result.framework
//         );
//       }
//     } catch (error) {
//       console.error(error);

//       alert(
//         "Unable to refine framework."
//       );
//     }
//   }

//   function handleSelect(
//     answer: string
//   ) {
//     const question =
//       questions[currentIndex];

//     setAnswers((prev) => ({
//       ...prev,
//       [question.id]: answer,
//     }));
//   }

//   async function nextQuestion() {
//     if (
//       currentIndex <
//       questions.length - 1
//     ) {
//       setCurrentIndex(
//         (prev) => prev + 1
//       );

//       return;
//     }

//     console.log(
//       "FINAL ANSWERS:",
//       answers
//     );

//     await submitAnswers();
//   }

//   if (refinedFramework) {
//     return (
//       <ClarificationResult
//         framework={
//           refinedFramework
//         }
//       />
//     );
//   }

//   if (loading) {
//     return (
//       <div className="text-center">
//         Generating Questions...
//       </div>
//     );
//   }

//   if (!questions.length) {
//     return (
//       <div className="text-center">
//         No clarification questions generated.
//       </div>
//     );
//   }

//   const currentQuestion =
//     questions[currentIndex];

//   return (
//     <div className="mx-auto max-w-3xl">
//       <ProgressIndicator
//         current={currentIndex + 1}
//         total={questions.length}
//       />

//       <QuestionCard
//         question={currentQuestion}
//         selectedAnswer={
//           answers[
//             currentQuestion.id
//           ] ?? ""
//         }
//         onSelect={handleSelect}
//       />

//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={nextQuestion}
//           className="rounded-lg bg-white px-4 py-2 text-black"
//         >
//           {currentIndex ===
//           questions.length - 1
//             ? "Submit"
//             : "Next"}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { QuestionCard } from "./question-card";
import { ProgressIndicator } from "./progress-indicator";
import { ClarificationResult } from "./clarification-result";

import { ClarificationQuestion } from "@/types/clarification";
import { HiringFramework } from "@/types/framework";

import { generateClarificationsAction } from "@/app/actions/generate-clarifications";
import { refineFrameworkAction } from "@/app/actions/refine-framework";

export function ClarificationClient() {
  const loadedRef = useRef(false);

  const [questions, setQuestions] =
    useState<ClarificationQuestion[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, string>>(
      {}
    );

  const [refinedFramework, setRefinedFramework] =
    useState<HiringFramework | null>(
      null
    );

  useEffect(() => {
    if (loadedRef.current) {
      return;
    }

    loadedRef.current = true;

    async function loadQuestions() {
      try {
        const cachedQuestions =
          sessionStorage.getItem(
            "clarifications"
          );

        if (cachedQuestions) {
          console.log(
            "Using cached questions"
          );

          setQuestions(
            JSON.parse(
              cachedQuestions
            )
          );

          setLoading(false);

          return;
        }

        const framework =
          sessionStorage.getItem(
            "framework"
          ) ?? "{}";

        const result =
          await generateClarificationsAction(
            framework
          );

        if (result.success) {
          setQuestions(
            result.questions
          );

          sessionStorage.setItem(
            "clarifications",
            JSON.stringify(
              result.questions
            )
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  async function submitAnswers() {
    try {
      const cachedRefined =
        sessionStorage.getItem(
          "refinedFramework"
        );

      if (cachedRefined) {
        console.log(
          "Using cached refined framework"
        );

        setRefinedFramework(
          JSON.parse(
            cachedRefined
          )
        );

        return;
      }

      const framework =
        sessionStorage.getItem(
          "framework"
        ) ?? "{}";

      const parsedFramework =
        JSON.parse(framework);

      const result =
        await refineFrameworkAction(
          parsedFramework,
          answers
        );

      if (result.success) {
        const refined =
          result.framework as HiringFramework;

        setRefinedFramework(
          refined
        );

        sessionStorage.setItem(
          "refinedFramework",
          JSON.stringify(
            refined
          )
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Unable to refine framework."
      );
    }
  }

  function handleSelect(
    answer: string
  ) {
    const question =
      questions[currentIndex];

    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));
  }

  async function nextQuestion() {
    if (
      currentIndex <
      questions.length - 1
    ) {
      setCurrentIndex(
        (prev) => prev + 1
      );

      return;
    }

    await submitAnswers();
  }

  if (refinedFramework) {
    return (
      <ClarificationResult
        framework={
          refinedFramework
        }
      />
    );
  }

  if (loading) {
    return (
      <div className="text-center">
        Generating Questions...
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="text-center">
        No clarification questions generated.
      </div>
    );
  }

  const currentQuestion =
    questions[currentIndex];

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressIndicator
        current={currentIndex + 1}
        total={questions.length}
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={
          answers[
            currentQuestion.id
          ] ?? ""
        }
        onSelect={handleSelect}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={nextQuestion}
          className="rounded-lg bg-white px-4 py-2 text-black"
        >
          {currentIndex ===
          questions.length - 1
            ? "Submit"
            : "Next"}
        </button>
      </div>
    </div>
  );
}