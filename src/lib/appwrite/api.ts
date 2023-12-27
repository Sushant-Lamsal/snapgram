//This is the function we are to call from the form page

import { INewUser } from "@/types";
import {ID, Query} from 'appwrite'
import { account, appwriteConfig, avatars, databases } from "./config";

// This function is to create a new user account
export async function createUserAccount(user : INewUser){
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if(!newAccount) throw new Error('Something went wrong');
    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    })

    return newUser;
  } catch (error) {
    console.log(error)
    return error;
  }
}

// This function is to save the user to the database
export async function saveUserToDB(user: {
  accountId: string;
  email : string;
  name : string;
  imageUrl: URL;
  username? : string;
}) {
  // saving object to document
  try{
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    )
    return newUser;
  }catch(error){
    console.log(error)
    return error;
  }
}

// This function is to sign in the user
export async function signInAccount(user : {
  email:string;
  password:string;
}){
  try {
    const session = await account.createEmailSession(
      user.email,
      user.password
    )
    return session;
  } catch (error) {
    console.log(error)
    return error;
  }
}

// This function is to get the current user and login
export async function getCurrentUser(){
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}

//This function is to sign out the user
export async function signOutAccount(){
  try {
    const session = await account.deleteSession('current')
    return session;
  } catch (error) {
    console.log(error)
  }
}
