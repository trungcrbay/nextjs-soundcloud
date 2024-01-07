import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthSignIn from "@/components/auth/auth.signin";
import { getServerSession } from "next-auth/next"
import { getProviders, signIn } from "next-auth/react";
import { redirect } from 'next/navigation'

const SignInPage = async () => {
  const session = await getServerSession(authOptions)
  if(session){
    redirect('/')
  }
  const providers = await getProviders()
  return <div>
     <AuthSignIn />
  </div>;
};

export default SignInPage;
