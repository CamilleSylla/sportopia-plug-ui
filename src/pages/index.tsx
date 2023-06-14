import Link from "next/link";



export default function Home() {
  return (
    <main>
      <Link href="/admin">Admin</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">SignUp</Link>
    </main>
  );
}
