import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";



export default function Home() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log(status,session);
    
  }, [status])
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  return (
    <main>
      <Link href="/admin">Admin</Link>
      <Link href="/login">Login</Link>
      <Link href="/signup">SignUp</Link>
    </main>
  );
}
