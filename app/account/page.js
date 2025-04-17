import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

export const metadata = {
  title: "Guest Area",
};

const Page = async () => {
    const session = await getServerSession(authOptions);

    return (
      <div>
        <h2 className="mb-7 text-2xl font-semibold text-accent-400">
                Welcome, {session.user.name}
            </h2>
      </div>
    )
  }
  
  export default Page;
  