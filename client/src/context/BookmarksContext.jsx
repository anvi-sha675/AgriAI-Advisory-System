import { createContext, useContext, useEffect, useState } from "react";

const BookmarksContext = createContext(null);

const STORAGE_KEY = "agriai-bookmarks";

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id) => bookmarks.some((b) => b.id === id);

  const addBookmark = (item) => {
    setBookmarks((prev) =>
      prev.some((b) => b.id === item.id)
        ? prev
        : [{ ...item, savedAt: new Date().toISOString() }, ...prev],
    );
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBookmark = (item) => {
    if (isBookmarked(item.id)) {
      removeBookmark(item.id);
      return false;
    }
    addBookmark(item);
    return true;
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        addBookmark,
        removeBookmark,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx)
    throw new Error("useBookmarks must be used within BookmarksProvider");
  return ctx;
}
