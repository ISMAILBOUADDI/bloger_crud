import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  
  return (
    <>	
		<div className="text-center space-y-4 pt-16">
		<h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
		<p className="text-base text-[rgb(126,140,160)]">
            Log in or Create Account to get back to your dashboard!
          </p>
		</div>
		<div className="flex items-center justify-center mt-8">
		<ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
		  </div>
  	</>
        
);
}