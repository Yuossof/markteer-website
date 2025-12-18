"use client";
import { Link, Share2 } from "lucide-react";
import React, { useState } from "react";

const ShareButtons = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href; 
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      })
      .catch(() => {
        console.error("Failed to copy link");
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check this out!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Share not supported on this browser");
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 py-2 px-3 rounded-md hover:bg-white hover:text-black transition cursor-pointer"
      >
        <Link size={17} />
        <span>{copied ? "Copied!" : "Copy Link"}</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 py-2 px-3 rounded-md hover:bg-white hover:text-black transition cursor-pointer"
      >
        <Share2 size={17} />
        <span>Share</span>
      </button>
    </div>
  );
};

export default ShareButtons;
