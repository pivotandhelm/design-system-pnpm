import type { SVGProps } from "react";

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden={props["aria-label"] ? undefined : true}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      {...props}
    >
      <path
        d="m9 18 6-6-6-6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}