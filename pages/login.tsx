import { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BsSpotify } from "react-icons/bs";
const login: NextPage<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}> = ({ providers }) => {
  return (
    <div className="flex items-center h-screen w-full justify-center">
      <button
        className="text-green-600 flex-col space-y-4 flex items-center justify-center"
        onClick={() => {
          signIn("spotify", { callbackUrl: "/" });
        }}
      >
        <BsSpotify className="h-36 w-36 " />
        <p className="text-white bg-green-500 p-2 rounded-md hover:bg-green-700">
          Sign in with {providers?.spotify.name}
        </p>
      </button>
    </div>
  );
};

export default login;

const getServerSideProps: GetServerSideProps = async () => {
  const provider = await getProviders();
  return {
    props: {
      providers: provider,
    },
  };
};
export { getServerSideProps };
