import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
	title: "Register | Seeker",
	description: "Create an account to start your journey with Seeker",
};

export default function RegisterPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Create an account
				</h1>
				<p className="text-sm text-muted-foreground">
					Enter your details below to create your Seeker account
				</p>
			</div>
			<RegisterForm />
			<p className="px-8 text-center text-sm text-muted-foreground">
				Already have an account?{" "}
				<Link
					href="/login"
					className="underline underline-offset-4 hover:text-primary"
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}
