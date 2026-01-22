import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

const client = new MongoClient(process.env.MONGODB_URI!);

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    linkedin: { 
        clientId: process.env.LINKEDIN_CLIENT_ID as string, 
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string, 
    }, 
  },
  databaseHooks:{
    user:{
      create: {
        after: async (user) =>{

          // Initialize user board after user creation

          if(user.id){
            await initializeUserBoard(user.id);
          }
        }
      }
    }
  }
});

export async function getSession(){
  const result = await auth.api.getSession({
    headers: await headers(),
  });
 
  return result;
}

export async function signOut(){
  const result = await auth.api.signOut({
    headers: await headers(),
  });


  if(!result.success){
    throw new Error("Failed to sign out");
  }
 
  if (result) {
    redirect("/sign-in");
  }
}