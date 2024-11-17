import type {Metadata} from "next";
import "./globals.css";
import Provider from "@/components/Provider";
import {AuthContextProvider} from "@/context/AuthContextProvider";
import {Toaster} from "@/components/ui/toaster";
import {LoginStatusProvider} from "@/context/loginStatusContext";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>Zello</title>
            <link rel="icon" href="/logo.png"/>
        </head>
        <body>
        <LoginStatusProvider>
        <AuthContextProvider>
                <Provider>
                    {children}
                </Provider>
            </AuthContextProvider>
        </LoginStatusProvider>
        <Toaster/>

        </body>
        </html>
    );
}