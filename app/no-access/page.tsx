import Link from "next/link";

export default function page() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <Link href={"/my-profile"}>&larr; GO BACK</Link>
    </div>
  );
}
