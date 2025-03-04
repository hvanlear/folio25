import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <svg
        width="50"
        height="34"
        viewBox="0 0 50 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="p-logo"
      >
        <rect width="49.065" height="33.3497" rx="4" />
        <path
          d="M12.1619 24.7436H9.17188V8.64355H12.1619V14.7616H18.6019V8.64355H21.5919V24.7436H18.6019V17.5216H12.1619V24.7436Z"
          fill="#ffffff"
        />
        <path
          d="M26.5855 24.7436L21.1805 8.64355H24.4925L28.1035 20.5576L31.7145 8.64355H35.0265L29.6215 24.7436H26.5855Z"
          fill="#ffffff"
        />
        <path
          d="M45.065 24.8284H35.244V8.72841H38.234V22.0684H45.065V24.8284Z"
          fill="#ffffff"
        />
        <path
          d="M44.8914 4H4V29.3497H44.8889L44.8863 23.4724M44.8889 4V16.7773"
          stroke="#ffffff"
          strokeWidth="2.79833"
          strokeLinecap="square"
        />
      </svg>
    </Link>
  );
}
