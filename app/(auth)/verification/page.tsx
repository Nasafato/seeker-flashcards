import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Verify Email | Seeker",
	description: "Verify your email to complete registration",
};

export default function VerificationPage() {
	return (
		<div className="space-y-6">
			<div className="flex flex-col items-center space-y-4 text-center">
				<div className="rounded-full bg-primary/10 p-4">
					<Mail className="h-8 w-8 text-primary" />
				</div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Check your email
				</h1>
				<p className="text-sm text-muted-foreground">
					We've sent you a verification link. Please check your email to
					complete your registration.
				</p>
			</div>
			<div className="grid gap-4">
				<Button asChild variant="outline">
					<Link href="/login">Return to login</Link>
				</Button>
			</div>
		</div>
	);
}
