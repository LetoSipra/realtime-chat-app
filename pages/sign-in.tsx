import { useEffect } from "react";
import { getProviders, getSession, useSession, signIn } from "next-auth/react";
import { DocumentContext } from "next/document";
import { useRouter } from "next/router";

const SignInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      window.close();
      router.push("/");
    }
    if (!session) void signIn("google");
  }, [session]);

  return null;
};

export default SignInPage;

export async function getServerSideProps(context: DocumentContext) {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
}
