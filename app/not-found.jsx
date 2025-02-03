import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = await headers();
  const domain = headersList.get("host");
  return (
    <div>
      <div className="text-center mt-20">
        <h2>Not Found 404</h2>
        <p>Could not find requested resource</p>
        <p>
          View{" "}
          <Link className="text-cyan-700" href="/">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
