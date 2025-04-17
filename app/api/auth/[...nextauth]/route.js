import NextAuth from "next-auth";
import { authOptions } from "@/app/_lib/auth";

export default NextAuth(authOptions);

export {GET, POST} from "@/app/_lib/auth"