import Navbar from "@/components/home/header/navbar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  
  // If user is logged in, check if they exist in the database
  if (user) {
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });
    
    // Create user in database if they don't exist yet
    if (!loggedInUser) {
      await prisma.user.create({
        data: {
          name: `${user.firstName} ${user.lastName}`,
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        },
      });
    }
  }
  
  // Always render the layout with Navbar regardless of authentication status
  // The Navbar component will handle showing login/signup buttons for unauthenticated users
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default layout;