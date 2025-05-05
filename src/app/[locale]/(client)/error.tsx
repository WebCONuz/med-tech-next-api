// app/posts/[id]/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>An error occurred.!</h2>
      <button onClick={() => reset()}>Retry</button>
    </div>
  );
}
