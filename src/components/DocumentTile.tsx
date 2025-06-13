import React from "react";
import { motion } from "framer-motion";
import { FileText, FileSpreadsheet, FileType, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type DocumentType = "doc" | "sheet" | "pdf" | "other";

interface DocumentTileProps {
  id?: string;
  title?: string;
  type?: DocumentType;
  lastModified?: string;
  thumbnailUrl?: string;
  url?: string;
  onClick?: (url: string) => void;
}

const DocumentTile = ({
  id = "doc-1",
  title = "Untitled Document",
  type = "doc",
  lastModified = "Just now",
  thumbnailUrl,
  url = "#",
  onClick,
}: DocumentTileProps) => {
  // Define type-specific properties
  const typeConfig = {
    doc: {
      icon: <FileText className="h-10 w-10" />,
      color: "from-blue-500/20 to-blue-600/20",
      hoverColor: "from-blue-500/30 to-blue-600/30",
      badgeVariant: "secondary",
      badgeText: "DOC",
    },
    sheet: {
      icon: <FileSpreadsheet className="h-10 w-10" />,
      color: "from-green-500/20 to-green-600/20",
      hoverColor: "from-green-500/30 to-green-600/30",
      badgeVariant: "secondary",
      badgeText: "SHEET",
    },
    pdf: {
      icon: <FileType className="h-10 w-10" />,
      color: "from-red-500/20 to-red-600/20",
      hoverColor: "from-red-500/30 to-red-600/30",
      badgeVariant: "secondary",
      badgeText: "PDF",
    },
    other: {
      icon: <File className="h-10 w-10" />,
      color: "from-gray-500/20 to-gray-600/20",
      hoverColor: "from-gray-500/30 to-gray-600/30",
      badgeVariant: "secondary",
      badgeText: "FILE",
    },
  };

  const config = typeConfig[type];

  const handleClick = () => {
    if (onClick && url) {
      onClick(url);
    } else if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="h-full w-full"
    >
      <Card
        onClick={handleClick}
        className={`group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-${type === "doc" ? "blue" : type === "sheet" ? "green" : type === "pdf" ? "red" : "gray"}-500/10`}
      >
        {/* Gradient background */}
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${config.color} transition-all duration-300 group-hover:${config.hoverColor}`}
        />

        {/* Glass reflection effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex h-full flex-col">
          {/* Thumbnail or Icon */}
          <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-black/20 p-4">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-white/80">
                {config.icon}
              </div>
            )}
          </div>

          {/* Document Info */}
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex items-center justify-between">
              <Badge
                variant="secondary"
                className={`${
                  type === "doc"
                    ? "bg-blue-500/20 hover:bg-blue-500/30"
                    : type === "sheet"
                      ? "bg-green-500/20 hover:bg-green-500/30"
                      : type === "pdf"
                        ? "bg-red-500/20 hover:bg-red-500/30"
                        : "bg-gray-500/20 hover:bg-gray-500/30"
                }`}
              >
                {config.badgeText}
              </Badge>
            </div>

            <h3 className="mb-1 line-clamp-2 flex-1 text-sm font-medium text-white">
              {title}
            </h3>

            <p className="text-xs text-white/60">{lastModified}</p>
          </div>
        </div>

        {/* Hover overlay with subtle glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Card>
    </motion.div>
  );
};

export default DocumentTile;
