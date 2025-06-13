import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Lock } from "lucide-react";
import DocumentGrid from "./DocumentGrid";
import SkeletonGrid from "./SkeletonGrid";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

// Mock document data for demonstration
const mockDocuments = [
  {
    id: "1",
    title: "Meeting Minutes",
    type: "doc",
    lastModified: "2023-10-15T14:30:00Z",
    url: "https://docs.google.com/document",
    thumbnail:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=300&q=80",
  },
  {
    id: "2",
    title: "Budget Forecast 2024",
    type: "sheet",
    lastModified: "2023-10-12T09:15:00Z",
    url: "https://docs.google.com/spreadsheets",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-8d04cb21ed1c?w=300&q=80",
  },
  {
    id: "3",
    title: "Project Proposal",
    type: "pdf",
    lastModified: "2023-10-10T16:45:00Z",
    url: "https://drive.google.com/file",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&q=80",
  },
  {
    id: "4",
    title: "Marketing Strategy",
    type: "doc",
    lastModified: "2023-10-08T11:20:00Z",
    url: "https://docs.google.com/document",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80",
  },
  {
    id: "5",
    title: "Q3 Financial Report",
    type: "sheet",
    lastModified: "2023-10-05T15:10:00Z",
    url: "https://docs.google.com/spreadsheets",
    thumbnail:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=300&q=80",
  },
  {
    id: "6",
    title: "Resort Brochure",
    type: "pdf",
    lastModified: "2023-10-03T10:30:00Z",
    url: "https://drive.google.com/file",
    thumbnail:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80",
  },
  {
    id: "7",
    title: "Staff Handbook",
    type: "doc",
    lastModified: "2023-09-28T14:00:00Z",
    url: "https://docs.google.com/document",
    thumbnail:
      "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=300&q=80",
  },
  {
    id: "8",
    title: "Event Calendar",
    type: "sheet",
    lastModified: "2023-09-25T09:45:00Z",
    url: "https://docs.google.com/spreadsheets",
    thumbnail:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=300&q=80",
  },
  {
    id: "9",
    title: "Maintenance Schedule",
    type: "pdf",
    lastModified: "2023-09-20T16:15:00Z",
    url: "https://drive.google.com/file",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&q=80",
  },
  {
    id: "10",
    title: "Guest Feedback Analysis",
    type: "doc",
    lastModified: "2023-09-18T11:50:00Z",
    url: "https://docs.google.com/document",
    thumbnail:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=300&q=80",
  },
  {
    id: "11",
    title: "Inventory List",
    type: "sheet",
    lastModified: "2023-09-15T14:20:00Z",
    url: "https://docs.google.com/spreadsheets",
    thumbnail:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&q=80",
  },
  {
    id: "12",
    title: "Emergency Procedures",
    type: "pdf",
    lastModified: "2023-09-10T10:00:00Z",
    url: "https://drive.google.com/file",
    thumbnail:
      "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=300&q=80",
  },
];

const Home = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  useEffect(() => {
    // Apply theme to document body
    document.body.className = theme === "dark" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Simulate loading documents
    const fetchDocuments = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setDocuments(mockDocuments);
        setLoading(false);
      } catch (err) {
        setError("Failed to load documents. Please try again.");
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // Re-fetch documents
    setTimeout(() => {
      setDocuments(mockDocuments);
      setLoading(false);
    }, 1500);
  };

  const handleDocumentClick = (url: string) => {
    setPendingUrl(url);
    setShowPasswordDialog(true);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      setPasswordError("Please enter a password");
      return;
    }

    setIsPasswordLoading(true);
    setPasswordError("");

    // Simulate password validation (replace with your actual validation logic)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Example password validation - replace with your actual password
    const correctPassword = "hopeisland2024";

    if (password === correctPassword) {
      setShowPasswordDialog(false);
      setPassword("");
      if (pendingUrl) {
        window.open(pendingUrl, "_blank");
      }
      setPendingUrl(null);
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }

    setIsPasswordLoading(false);
  };

  const handlePasswordCancel = () => {
    setShowPasswordDialog(false);
    setPassword("");
    setPasswordError("");
    setPendingUrl(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPasswordLoading) {
      handlePasswordSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800 light:from-gray-100 light:to-gray-200 text-white dark:text-white light:text-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <motion.h1
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hope Island Resort FMWG Document Hub
          </motion.h1>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-700/70 transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-blue-400" />
            )}
            <span className="sr-only">
              {theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"}
            </span>
          </Button>
        </header>

        <main>
          {loading ? (
            <SkeletonGrid />
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-xl backdrop-blur-md bg-gray-800/30 border border-gray-700/50 shadow-xl">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={handleRetry} variant="default">
                Retry
              </Button>
            </div>
          ) : (
            <DocumentGrid
              documents={documents}
              onDocumentClick={handleDocumentClick}
            />
          )}
        </main>

        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400 light:text-gray-600">
          <p>
            © {new Date().getFullYear()} Hope Island Resort FMWG. All rights
            reserved.
          </p>
        </footer>
      </div>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md bg-gray-900/95 backdrop-blur-md border-gray-700/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Lock className="h-5 w-5 text-blue-400" />
              Document Access Required
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Please enter the password to access this document.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-400"
                disabled={isPasswordLoading}
                autoFocus
              />
              {passwordError && (
                <p className="text-sm text-red-400">{passwordError}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={handlePasswordCancel}
              disabled={isPasswordLoading}
              className="bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePasswordSubmit}
              disabled={isPasswordLoading || !password.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPasswordLoading ? "Verifying..." : "Access Document"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
