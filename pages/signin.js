import {
  getCsrfToken,
  getProviders,
  signIn,
  getSession,
} from "next-auth/react";
import Head from "next/head";

export default function SignIn({ providers }) {
  return (
    <div className="bg-gradient-to-r from-black via-blue-300 to-black h-screen flex justify-center items-center flex-col font-medium">
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <a href="/">
        <img
          src="../favicon.png"
          alt="The Big S"
          title="The Big S"
          className="h-12 w-12 my-5"
        />
      </a>
      <div className="bg-gray-100 h-[50%] rounded-md relative w-[250px] lg:w-[25%]">
        <p className="text-center py-4">Sign in to your account</p>
        {Object.values(providers).map((provider) => {
          return (
            <div key={provider.name} className="flex justify-center my-3">
              <button
                className="border border-gray-300 hover:bg-gray-200 px-10 py-2 rounded-lg"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
        <div className="absolute bottom-0 flex justify-center items-center p-5 rounded-md text-sm w-full">
          Accounts Sent To Stratis Email List
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { providers, csrfToken },
  };
}
