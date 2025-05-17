import Navbar from "@/components/home/header/navbar";
import { BlogFooter } from "@/components/home/blog-footer";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  // If a user is logged in, check and create their record in the database
  if (user) {
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });
    if (!loggedInUser) {
      await prisma.user.create({
        data: {
          name: `${user.fullName} ${user.lastName}`,
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        },
      });
    }
  }

  // Render the layout regardless of login status
  return (
    <div>
      <Navbar />
      {children}
      <BlogFooter />
    </div>
  );
};

export default layout;