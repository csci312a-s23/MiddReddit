import { useRouter } from "next/router";

export default function SignIn({}) {
  const router = useRouter();
  const cancelButton = (
    <button type="button" name="cancel" onClick={() => router.back()}>
      Cancel{" "}
    </button>
  );
  return (
    <div>
      {cancelButton}

      <p>Sign In</p>
    </div>
  );
}
