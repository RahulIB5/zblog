

# ZBlog — Modern Full-Stack Blogging WebApp

A fast, type-safe, production-ready blogging platform built with the latest technologies:

- Next.js 15 (App Router)
- React + TypeScript
- Prisma ORM + PostgreSQL
- Clerk Authentication
- Zod for validation
- Tailwind CSS + shadcn/ui
- React Quill rich text editor

---

## 🚀 Live Demo

Check out the live version here: [zblog-seven.vercel.app](https://zblog-seven.vercel.app)

---

## Features

- User authentication (Sign up, Sign in, Sign out) with **Clerk**
- Create, edit, delete blog posts with rich text editor
- Like and comment on blog posts
- Search blogs by keywords
- User dashboard to manage posts and comments
- Responsive design using **Tailwind CSS** and **shadcn/ui**
- SEO optimized pages using Next.js dynamic routing
- Type-safe database queries with **Prisma** and PostgreSQL
- Input validation with **Zod**

---

## Tech Stack

Next.js 15 (App Router) – Server Actions + nested layouts
React + TypeScript – Type-safe & reusable components
Prisma + PostgreSQL – Elegant, scalable DB layer
Clerk – Seamless auth (Sign in / up / out)
Zod – Schema validation that just works
Tailwind CSS + shadcn/ui – Clean, responsive UI
React Quill – Rich text editor for blogs

## Getting Started

### Prerequisites

- Node.js >= 18.x
- PostgreSQL database (or use any compatible SQL database)
- Clerk account for authentication (get API keys)

### Installation

1. Clone the repo:

   ````bash
   git clone https://github.com/RahulIB5/zblog.git
   cd zblog
   ````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
    DATABASE_URL=

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=

    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

5. Run Prisma migrations to create your database schema:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## Usage

* Register or sign in with Clerk
* Create your first blog post with rich formatting
* Like posts and leave comments to engage with content
* Use the search bar to find posts by keyword
* Manage your posts and comments from your dashboard

---

## License

This project is open source and available under the [MIT License](LICENSE).

---


## Acknowledgements

* [Next.js](https://nextjs.org/)
* [Prisma](https://www.prisma.io/)
* [Clerk](https://clerk.com/)
* [Zod](https://zod.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [React Quill](https://github.com/zenoamaro/react-quill)

---

**Happy blogging! 🚀**

