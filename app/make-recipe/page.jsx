"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

// React stuff
import { Suspense, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { ToastContainer, toast } from "react-toastify";
import remarkGfm from "remark-gfm";
// Functions or Firebase
import withAuth from "@/utils/WithAuth";

function MakeRecipePage() {
  return (
    <>
      <p>This is the home Dashboard</p>
    </>
  );
}

export default withAuth(MakeRecipePage);
