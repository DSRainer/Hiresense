"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "./ui/button"
import Image from "next/image"
import Link from "next/link"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(5, "Name must be at least 5 characters") : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8, "Name must be at least 5 characters")
  })
}


const AuthForm = ({type}: {type: FormType}) => {
  const router = useRouter()
  const formSchema = authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if(type === 'sign-up') {
        const { name, email, password } = data;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })
        if(!result?.success) {
          toast.error(result?.message)
          return;
        }
        toast.success('Account Created Successfully! You can Sign In Now');
        router.push('/sign-in');
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredential.user.getIdToken();

        if(!idToken){
          toast.error('Sign in Failed!')
          return;
        }

        await signIn({
          email, idToken
        })

        toast.success('Sign In Successful!');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error, ${error}`);
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-142">
      <div className="flex flex-col gap-6 card py-8 px-8">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={38} height={50} />
          <h2 className="text-primary-100">HireSense</h2>
        </div>
        <h3 className="text-center">Practice Interviews with AI</h3>
        <form 
              id="form-rhf-input" 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="w-full space-y-5 form">
                {!isSignIn && (
                  <FormField
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Enter your Name"
                    type="text"
                  />
                )}
                <FormField
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your Email"
                    type="email"
                  />
                <FormField
                    control={form.control}
                    name="password"
                    label="Password"
                    placeholder="Enter your Password"
                    type="password"
                  />
                <Button type="submit" form="form-rhf-input" className="btn">
                  {isSignIn ? 'Sign In': 'Create Account'}
                </Button>
            </form>
            <p className="text-center">
              {isSignIn ? 'No Account Yet?': 'Have an Account Already?'}
              <Link
                href={isSignIn ? '/sign-up' : '/sign-in'} 
                className="font-bold text-user-primary ml-1 text-blue-400">
                  {isSignIn ? "Sign Up": "Sign In"}
              </Link>
            </p>
    </div>
  </div>
  )
}

export default AuthForm