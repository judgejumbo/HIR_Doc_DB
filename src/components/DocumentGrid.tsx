import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DocumentTile from "./DocumentTile";
import SkeletonGrid from "./SkeletonGrid";

interface Document {
  id: string;
  title: string;
  type: "doc" | "sheet" | "pdf" | "other";
  url: string;
  lastModified: string;
  thumbnail?: string;
}

interface DocumentGridProps {
  documents?: Document[];
  isLoading?: boolean;
  error?: string | null;
  onDocumentClick?: (url: string) => void;
}

const DocumentGrid = ({
  documents = mockDocuments,
  isLoading = false,
  error = null,
  onDocumentClick,
}: DocumentGridProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (error) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-background text-foreground">
        <div className="text-xl font-semibold mb-2">
          Unable to load documents
        </div>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-background">
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isClient &&
          documents.map((document) => (
            <DocumentTile
              key={document.id}
              id={document.id}
              title={document.title}
              type={document.type}
              lastModified={new Date(
                document.lastModified,
              ).toLocaleDateString()}
              thumbnailUrl={document.thumbnail}
              url={document.url}
              onClick={onDocumentClick}
            />
          ))}
      </motion.div>
    </div>
  );
};

// Mock data for development and default state
const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Meeting Minutes",
    type: "doc",
    url: "https://docs.google.com/document",
    lastModified: "2023-09-15T14:30:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=300&q=80",
  },
  {
    id: "2",
    title: "Budget Forecast",
    type: "sheet",
    url: "https://docs.google.com/spreadsheets",
    lastModified: "2023-09-14T10:15:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&q=80",
  },
  {
    id: "3",
    title: "Project Proposal",
    type: "pdf",
    url: "https://drive.google.com/file",
    lastModified: "2023-09-10T09:45:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&q=80",
  },
  {
    id: "4",
    title: "Marketing Strategy",
    type: "doc",
    url: "https://docs.google.com/document",
    lastModified: "2023-09-08T16:20:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&q=80",
  },
  {
    id: "5",
    title: "Sales Report Q3",
    type: "sheet",
    url: "https://docs.google.com/spreadsheets",
    lastModified: "2023-09-05T11:30:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=300&q=80",
  },
  {
    id: "6",
    title: "Brand Guidelines",
    type: "pdf",
    url: "https://drive.google.com/file",
    lastModified: "2023-09-01T13:45:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&q=80",
  },
  {
    id: "7",
    title: "Team Roster",
    type: "doc",
    url: "https://docs.google.com/document",
    lastModified: "2023-08-28T09:15:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=80",
  },
  {
    id: "8",
    title: "Expense Tracker",
    type: "sheet",
    url: "https://docs.google.com/spreadsheets",
    lastModified: "2023-08-25T14:50:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80",
  },
  {
    id: "9",
    title: "Annual Report",
    type: "pdf",
    url: "https://drive.google.com/file",
    lastModified: "2023-08-20T10:30:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300&q=80",
  },
  {
    id: "10",
    title: "Product Roadmap",
    type: "doc",
    url: "https://docs.google.com/document",
    lastModified: "2023-08-18T15:20:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=300&q=80",
  },
  {
    id: "11",
    title: "Inventory List",
    type: "sheet",
    url: "https://docs.google.com/spreadsheets",
    lastModified: "2023-08-15T11:10:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=300&q=80",
  },
  {
    id: "12",
    title: "Legal Contract",
    type: "pdf",
    url: "https://drive.google.com/file",
    lastModified: "2023-08-10T09:45:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1607968565043-36af90dde238?w=300&q=80",
  },
];

export default DocumentGrid;
