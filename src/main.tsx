//NOTE:this is the entry point of the application
import ReactDom from "react-dom/client";
//BrowserRouter To wrap application in browser router It's used for handling routing in React applications that use client-side routing. Client-side routing allows changing the UI and rendering different components based on the URL without requiring a full page reload.
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import { Query } from "appwrite";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import AuthProvider from "./context/AuthContext";

ReactDom.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
)