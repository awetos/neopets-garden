import Heading from "@/components/about/heading";

export default function PrivacyPolicy() {
  return (
    <div>
      <Heading title="Privacy Policy" />
      <div>
        All submissions are anonymous. Only the gardening results are collected.
        You can see the exact information collected in{" "}
        <a
          className="font-bold text-amber-600 hover:underline"
          href="https://github.com/awetos/neopets-garden/blob/master/components/submission-form/submission-form.tsx"
          target="_blank"
          rel="noopener noreferrer"
        >
          submission form
        </a>{" "}
        and the{" "}
        <a
          className="font-bold text-amber-600 hover:underline"
          href="https://github.com/awetos/neopets-garden/blob/master/firebase/upload/upload-submission.ts"
          target="_blank"
          rel="noopener noreferrer"
        >
          upload to Firebase function
        </a>
        .
      </div>

      <Heading title="Open Source" />

      <div>
        This project is open source. You can view{" "}
        <a
          className="font-bold text-amber-600 hover:underline"
          href="https://github.com/awetos/neopets-garden"
          target="_blank"
          rel="noopener noreferrer"
        >
          the source code here
        </a>
        .
      </div>
    </div>
  );
}
