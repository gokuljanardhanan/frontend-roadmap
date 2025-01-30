"use client";

import { sampleDocs } from "@/config/docs";
import Card from "@/components/ui/card";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { SearchBar } from "@/components/features/docs/SearchBar";
import { Pagination } from "@/components/features/docs/Pagination";
import FolderView from "@/components/features/docs/FolderView";
import { FolderIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

const ITEMS_PER_PAGE = 6;

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "folder">("grid");

  // Filter docs based on search query
  const filteredDocs = sampleDocs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocs = filteredDocs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "folder" : "grid")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {viewMode === "grid" ? (
              <>
                <FolderIcon className="h-5 w-5" />
                <span>Folder View</span>
              </>
            ) : (
              <>
                <Squares2X2Icon className="h-5 w-5" />
                <span>Grid View</span>
              </>
            )}
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Learn frontend development with our comprehensive guides
        </p>
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </div>

      {/* Results count */}
      {searchQuery && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Found {filteredDocs.length} result
          {filteredDocs.length !== 1 ? "s" : ""}
        </p>
      )}

      {viewMode === "grid" ? (
        // Grid View
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {paginatedDocs.map((doc) => (
              <Link key={doc.id} href={`/docs/${doc.slug}`}>
                <Card className="h-full cursor-pointer transition-transform hover:scale-[1.02]">
                  <div className="flex h-full flex-col p-6">
                    <h2 className="text-xl font-semibold">{doc.title}</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                      {doc.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={doc.author.avatar}
                          alt={doc.author.name}
                          className="h-6 w-6 rounded-full"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {doc.author.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(doc.updatedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {doc.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        // New folder view
        <FolderView docs={filteredDocs} />
      )}

      {/* No results message */}
      {filteredDocs.length === 0 && (
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          No documents found matching your search.
        </div>
      )}
    </div>
  );
}
