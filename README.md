

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

- React framework for server-side rendering : **[Next.js 14](https://nextjs.org/)** 
- Utility-first CSS framework : **[TailwindCSS](https://tailwindcss.com/)**:
- Component library for modern UI: **[Shadcn UI](https://ui.shadcn.com/)**
- Data-fetching library for React : **[Tanstack React Query](https://tanstack.com/)** 
- Authentication solution: **[Clerk](https://go.clerk.com/eoX6HkY)** 
- Lightweight API framework **[Hono](https://hono.dev/)**
- ORM for database interactions : **[Drizzle ORM](https://orm.drizzle.team/)**:
- Scalable cloud database : **[Neon DB](https://neon.tech/)**:

"# bloger_crud" 
