

## Set ups and How s it work 

create file .env.local in root diroctory of the project and add your tokens and keys

```.env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= 
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=


NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=

NEXT_PUBLIC_APP_URL=http://localhost:3000

```



after that, install and run the development server:

```bash
npm install

npm run dev
```

or you can use docker 

```bash
    docker-compose up --build
```

## Technologies Used
- **[Clerk](https://go.clerk.com/eoX6HkY)**: Authentication solution.
- **[Hono](https://hono.dev/)**: Lightweight API framework.
- **[Drizzle ORM](https://orm.drizzle.team/)**: ORM for database interactions.
- **[Neon DB](https://neon.tech/)**: Scalable cloud database.
- **Next.js 14**: React framework for server-side rendering.
- **TailwindCSS**: Utility-first CSS framework.
- **Shadcn UI**: Component library for modern UI.
- **Tanstack React Query**: Data-fetching library for React.

"# bloger_crud" 
