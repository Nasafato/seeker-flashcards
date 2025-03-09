import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 14H22" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 18H18" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </Link>
  )
}