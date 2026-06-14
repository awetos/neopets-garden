import Heading from "@/components/about/heading";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <div>
        All submissions are anonymous. Only the gardening results are collected.
        You can see the exact information collected in submission form
        (/master/components/submission-form/submission-form.tsx) and the upload
        to Firebase function (/master/firebase/upload/upload-submission.ts).
      </div>
      <div>
        This project is open source. You can view the source code here:
        https://github.com/awetos/neopets-garden .
      </div>
    </div>
  );
}
