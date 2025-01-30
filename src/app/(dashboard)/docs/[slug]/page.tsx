"use client";

import { sampleDocs } from "@/config/docs";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BsTypeBold,
  BsTypeItalic,
  BsCode,
  BsListUl,
  BsLink45Deg,
} from "react-icons/bs";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { ProgressButton } from "@/components/features/docs/ProgressButton";

export default function DocPage() {
  const params = useParams();
  const doc = sampleDocs.find((d) => d.slug === params.slug);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(doc?.content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!doc) {
    return <div>Document not found</div>;
  }

  const handleSave = () => {
    console.log("Saving content:", content);
    setIsEditing(false);
  };

  const wrapSelectedText = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    // If no text is selected, insert template
    if (start === end) {
      const newText = `${beforeText}${prefix}your text here${suffix}${afterText}`;
      setContent(newText);
      // Set cursor position inside the template
      const newCursorPos = start + prefix.length;
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos + 13);
      }, 0);
    } else {
      // Wrap selected text
      const newText = `${beforeText}${prefix}${selectedText}${suffix}${afterText}`;
      setContent(newText);
      // Maintain selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    }
  };

  const formatActions = [
    {
      icon: <LuHeading1 className="h-4 w-4" />,
      label: "Heading 1",
      action: () => wrapSelectedText("\n# "),
    },
    {
      icon: <LuHeading2 className="h-4 w-4" />,
      label: "Heading 2",
      action: () => wrapSelectedText("\n## "),
    },
    {
      icon: <BsTypeBold className="h-4 w-4" />,
      label: "Bold",
      action: () => wrapSelectedText("**"),
    },
    {
      icon: <BsTypeItalic className="h-4 w-4" />,
      label: "Italic",
      action: () => wrapSelectedText("_"),
    },
    {
      icon: <BsCode className="h-4 w-4" />,
      label: "Code",
      action: () => wrapSelectedText("`"),
    },
    {
      icon: <BsListUl className="h-4 w-4" />,
      label: "List",
      action: () => wrapSelectedText("\n- "),
    },
    {
      icon: <BsLink45Deg className="h-4 w-4" />,
      label: "Link",
      action: () => wrapSelectedText("[", "](url)"),
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{doc.title}</h1>
              <div className="flex gap-2">
                {isEditing && (
                  <Button onClick={handleSave} className="px-4">
                    Save
                  </Button>
                )}
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className="px-4"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
            </div>
            <ProgressButton itemId={doc.id} />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={doc.author.avatar}
                alt={doc.author.name}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {doc.author.name}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Updated{" "}
              {formatDistanceToNow(new Date(doc.updatedAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>

        <div className="min-h-[500px] p-6">
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
                {formatActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={action.label}
                  >
                    {action.icon}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="h-[600px] w-full rounded-lg border border-gray-200 p-4 font-mono text-sm dark:border-gray-700 dark:bg-gray-800"
                    placeholder="Write your markdown here..."
                  />
                </div>
                <div className="prose max-w-none overflow-auto rounded-lg border border-gray-200 p-4 dark:border-gray-700 dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <article className="prose max-w-none dark:prose-invert">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </Card>
    </div>
  );
}
