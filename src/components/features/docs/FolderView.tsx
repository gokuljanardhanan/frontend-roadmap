import { Doc } from "@/config/docs";
import { useState } from "react";
import Link from "next/link";
import { FolderIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Card from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Pagination } from "@/components/features/docs/Pagination";

type FolderType = {
  id: string;
  name: string;
  color: string;
};

const folders: FolderType[] = [
  { id: "javascript", name: "JavaScript", color: "text-yellow-500" },
  { id: "css", name: "CSS", color: "text-blue-500" },
  { id: "react", name: "React", color: "text-cyan-500" },
  { id: "system-design", name: "System Design", color: "text-purple-500" },
  { id: "performance", name: "Performance", color: "text-green-500" },
  {
    id: "frontend-infra",
    name: "Frontend Infrastructure",
    color: "text-orange-500",
  },
];

const ITEMS_PER_PAGE = 6; // Same as main view for consistency

interface FolderViewProps {
  docs: Doc[];
}

export default function FolderView({ docs }: FolderViewProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setCurrentPage(1); // Reset page when changing folders
  };

  const handleBack = () => {
    setSelectedFolder(null);
    setCurrentPage(1); // Reset page when going back
  };

  if (selectedFolder) {
    const folderDocs = docs.filter((doc) => doc.folder === selectedFolder);
    const currentFolder = folders.find((f) => f.id === selectedFolder);

    // Calculate pagination
    const totalPages = Math.ceil(folderDocs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedDocs = folderDocs.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

    return (
      <div>
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Back to Folders</span>
        </button>

        <h2 className="mb-6 text-2xl font-semibold flex items-center gap-3">
          <FolderIcon className={`h-8 w-8 ${currentFolder?.color}`} />
          {currentFolder?.name}
          <span className="text-sm text-gray-500 font-normal">
            ({folderDocs.length} documents)
          </span>
        </h2>

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

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {folders.map((folder) => {
        const folderDocs = docs.filter((doc) => doc.folder === folder.id);

        if (folderDocs.length === 0) return null;

        return (
          <button
            key={folder.id}
            onClick={() => handleFolderClick(folder.id)}
            className="p-6 border rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <FolderIcon className={`h-8 w-8 ${folder.color}`} />
              <span className="font-medium">{folder.name}</span>
            </div>
            <p className="text-sm text-gray-500">
              {folderDocs.length} document{folderDocs.length !== 1 ? "s" : ""}
            </p>
          </button>
        );
      })}
    </div>
  );
}
