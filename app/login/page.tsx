'use client'

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Separator} from "@/components/ui/separator"
import {Icons} from "@/components/icons"
import LoginButton from "@/app/login/LoginButton";
import AuthMode from "@/app/login/AuthMode";
import {login, signup} from "@/app/login/actions";
import {useAuth} from "@/context/AuthContextProvider";

export default function AuthForm() {

    const {loginAuth, setLoginAuth} = useAuth();
    return (
        <div className="flex justify-center">
            <Card className="w-[350px]">
                <CardHeader className="space-y-1">
                    <AuthMode/>
                    <CardDescription>
                        Choose your preferred sign in method
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">

                    <Separator/>
                    <form action={loginAuth? login : signup}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input name="email" type="email" placeholder="m@example.com"/>
                        </div>
                        <div className="grid gap-2 mt-2">
                            <Label htmlFor="password">Password</Label>
                            <Input name="password" type="password"/>
                        </div>
                        <LoginButton/>
                    </form>
                    <Button variant="outline" className="w-full">
                        <Icons.google className="mr-2 h-4 w-4"/>
                        Sign in with Google
                    </Button>
                </CardContent>
                <CardFooter>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <a
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}