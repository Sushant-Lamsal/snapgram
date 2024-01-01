//using react-query 

//these are the hooks we will use to make our queries and mutations and it is directly provided by react-query
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery
} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, likePost, signInAccount, signOutAccount } from '../appwrite/api'
import { INewPost, INewUser } from '@/types'
import { QUERY_KEYS } from './queryKeys'

//initializing our first mutation so that we are able to change the data in the database and create new user account in the database
export const useCreateUserAccount = () => {
  return useMutation(
    {
      mutationFn: (user : INewUser) => createUserAccount(user)
    }
  )
}

export const useSignInAccount = () => {
  return useMutation(
    {
      mutationFn: (user : {
        email:string;
        password:string;
        }) => signInAccount(user)
    }
  )
}

export const useSignOutAccount = () => {
  return useMutation(
    {
      mutationFn: signOutAccount
    }
  )
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
        })
      }
    })
}

export const useGetRecentPosts = () => {
  return useQuery({
  queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
  queryFn: getRecentPosts,
})
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => likePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};