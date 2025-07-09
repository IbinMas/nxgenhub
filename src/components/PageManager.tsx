import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash2, ExternalLink, AlertCircle } from "lucide-react";

interface Page {
  id: string;
  title: string;
  path: string;
  isDuplicate?: boolean;
  isBroken?: boolean;
}

interface PageManagerProps {
  initialPages?: Page[];
  onRemove?: (id: string) => void;
  onFix?: (id: string) => void;
  className?: string;
}

const PageManager = ({
  initialPages = [],
  onRemove = () => {},
  onFix = () => {},
  className = "",
}: PageManagerProps) => {
  const [pages, setPages] = useState<Page[]>(
    initialPages.length > 0
      ? initialPages
      : [
          {
            id: "1",
            title: "Home",
            path: "/",
            isDuplicate: false,
            isBroken: false,
          },
          {
            id: "2",
            title: "About",
            path: "/about",
            isDuplicate: false,
            isBroken: false,
          },
          {
            id: "3",
            title: "About Copy",
            path: "/about-copy",
            isDuplicate: true,
            isBroken: false,
          },
          {
            id: "4",
            title: "Services",
            path: "/services",
            isDuplicate: false,
            isBroken: false,
          },
          {
            id: "5",
            title: "Broken Link",
            path: "/broken-link",
            isDuplicate: false,
            isBroken: true,
          },
          {
            id: "6",
            title: "Contact",
            path: "/contact",
            isDuplicate: false,
            isBroken: false,
          },
          {
            id: "7",
            title: "Contact Us",
            path: "/contact-us",
            isDuplicate: true,
            isBroken: false,
          },
        ],
  );

  const handleRemove = (id: string) => {
    setPages(pages.filter((page) => page.id !== id));
    onRemove(id);
  };

  const handleFix = (id: string) => {
    setPages(
      pages.map((page) =>
        page.id === id ? { ...page, isBroken: false } : page,
      ),
    );
    onFix(id);
  };

  const duplicateCount = pages.filter((page) => page.isDuplicate).length;
  const brokenCount = pages.filter((page) => page.isBroken).length;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Page Manager</h2>
        <div className="flex gap-4">
          {duplicateCount > 0 && (
            <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              {duplicateCount} Duplicate{duplicateCount !== 1 ? "s" : ""}
            </div>
          )}
          {brokenCount > 0 && (
            <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {brokenCount} Broken Link{brokenCount !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Page Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Path
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pages.map((page) => (
              <tr
                key={page.id}
                className={`${page.isDuplicate ? "bg-amber-50" : page.isBroken ? "bg-red-50" : ""}`}
              >
                <td className="px-4 py-3 text-sm">{page.title}</td>
                <td className="px-4 py-3 text-sm font-mono text-gray-600">
                  {page.path}
                </td>
                <td className="px-4 py-3 text-sm">
                  {page.isDuplicate ? (
                    <span className="inline-flex items-center text-amber-700">
                      <AlertCircle className="w-4 h-4 mr-1" /> Duplicate
                    </span>
                  ) : page.isBroken ? (
                    <span className="inline-flex items-center text-red-700">
                      <AlertCircle className="w-4 h-4 mr-1" /> Broken Link
                    </span>
                  ) : (
                    <span className="text-green-700">Active</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <div className="flex justify-end gap-2">
                    {page.isBroken && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFix(page.id)}
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        Fix
                      </Button>
                    )}
                    {!page.isBroken && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-600 border-gray-200 hover:bg-gray-50"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {(page.isDuplicate || page.isBroken) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemove(page.id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-500 mb-2">Summary:</div>
        <div className="flex gap-4">
          <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
            Total Pages: {pages.length}
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Active: {pages.filter((p) => !p.isDuplicate && !p.isBroken).length}
          </div>
          {duplicateCount > 0 && (
            <div className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
              Duplicates: {duplicateCount}
            </div>
          )}
          {brokenCount > 0 && (
            <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Broken: {brokenCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageManager;
