declare module "next-auth" {
    interface User {
        id: string,
        username: string,
        firstname: string,
        lastname: string,
    }
    interface Session {
        user: User & {
            username: string,
            sub: string
        }
        token: {
            username: string,
            sub: string
        }
    }
}