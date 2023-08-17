import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { IndexPage } from "./pages";
import { SignInPage } from "./pages/auth/signin";
import { SignUpPage } from "./pages/auth/signup";
import { HomePage } from "./pages/home";
import { useSession } from "./supabase";

export const App = () => {
  const session = useSession();

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/home" element={<HomePage />} />
          {!session ? (
            <>
              <Route path="/auth/signin" element={<SignInPage />} />
              <Route path="/auth/signup" element={<SignUpPage />} />
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
