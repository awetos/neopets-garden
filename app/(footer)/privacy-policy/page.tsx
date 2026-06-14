import Heading from "@/components/about/heading";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <Heading title="Privacy Policy" />
      <div>
        All submissions are anonymous. Only the gardening results are collected.
        You can see the exact information collected in submission form
        (/master/components/submission-form/submission-form.tsx) and the upload
        to Firebase function (/master/firebase/upload/upload-submission.ts) .
      </div>
      <Heading title="Open Source" />
      <div>
        This project is open source. You can view{" "}
        <Link
          className="font-bold text-amber-600 hover:underline"
          href="https://github.com/awetos/neopets-garden"
        >
          the source code here
        </Link>
        .
      </div>
    </div>
  );
}
