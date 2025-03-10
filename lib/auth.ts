import { client } from "./gel";
import e from "@/dbschema/edgeql-js";

type EmailPasswordLoginData = {
	type: typeof ProviderType.emailPassword;
	email: string;
	password: string;
};

export const ProviderType = {
	emailPassword: "emailPassword",
	google: "google",
	github: "github",
} as const;
export type ProviderType = keyof typeof ProviderType;

export type LoginData = EmailPasswordLoginData;

type EmailPasswordRegisterData = EmailPasswordLoginData;

export type RegisterData = EmailPasswordRegisterData;

export async function generateSessionToken() {}

export async function invalidateSessionToken() {}

export async function generatePasswordSalt() {}

export async function hashPasswordAndSalt(password: string, salt: Uint8Array): Promise<Uint8Array> {
    throw new Error("Not implemented");
}

type Session {
    id: string;
    expirySeconds: number;
}

export async function login(loginData: LoginData): Promise<Session> {
	switch (loginData.type) {
		case ProviderType.emailPassword: {
			throw new Error("Not implemented");
		}
		default: {
			throw new Error("Not implemented");
		}
	}
}

export async function register(registerData: RegisterData): Promise<void> {
    switch (registerData.type) {
		case ProviderType.emailPassword: {
            await handleEmailPasswordRegistration(registerData);
            break;
		}
		default: {
			throw new Error("Not implemented");
		}
	}

}

export async function handleEmailPasswordLogin(loginData: EmailPasswordLoginData) {
    const user = await getUserOrThrow(loginData);
    const hash = await hashPasswordAndSalt(loginData.password, user.passwordSalt);
    return compareHashes(user.passwordHash, hash);
}

export async function compareHashes(a: Uint8Array, b: Uint8Array) {

    return false;
}

export async function handleEmailPasswordRegistration(
	loginData: EmailPasswordRegisterData,
) {
	// 1. Find existing user account. If it exists, throw.
    const user = await getUser(loginData);

	// 2. If the account doesn't exist, check if the password has been compromised. If it has, throw.
    // TODO

    // 3. Generate salt, then hash password and salt, and store that in the DB. 
    const passwordSalt = await generatePasswordSalt();
    const passwordHash = await hashPasswordAndSalt(loginData.password, passwordSalt);

    // 4. Create the user and send their email verification.
    const newUser = await e.params({ email: e.str, passwordHash: e.str, passwordSalt: e.str}, params => {
        return e.insert(e.User, {
            email: params.email,
            passwordHash: params.passwordHash,
            passwordSalt: params.passwordSalt
        })
    }).run(client, { email: loginData.email, passwordSalt, passwordHash });

    return newUser;
}

async function getUser(args: { email: string, password: string}) {
    return e
		.params({ email: e.str, password: e.str }, (params) => {
			return e.select(e.User, (u) => ({
				filter_single: e.op(u.email, "=", params.email),
                id: true,
                email: true,
                passwordHash: true,
                passwordSalt: true,
			}));
		})
		.run(client, args);
}

async function getUserOrThrow(args: Parameters<typeof getUser>[0]) {
    const user = await getUser(args);
    if (!user) throw new Error('User not found')
    return user;
}