//inside here we will create all of the appwrite functionability

import {Client , Account , Databases , Storage , Avatars} from 'appwrite'

export const appwriteConfig = {
  proectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url : import.meta.env.VITE_APPWRITE_URL,
}


export const client = new Client()
client.setProject(appwriteConfig.proectId)
client.setEndpoint(appwriteConfig.url)
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)