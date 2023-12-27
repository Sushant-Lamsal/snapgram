//inside here we will create all of the appwrite functionability

//these are the imports provided by the appwrite 
import {Client , Account , Databases , Storage , Avatars} from 'appwrite'

export const appwriteConfig = {
  url : import.meta.env.VITE_APPWRITE_URL,
  projectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId : import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId : import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId : import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  postCollectionId : import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId : import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

//adding new client to appwrite database
export const client = new Client()

//setting up the client in what project and what endpoint
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

//creating new instance of the appwrite so that when user creates new account as a client it should be able to access the appwrite nad create new account in the appwrite database
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)