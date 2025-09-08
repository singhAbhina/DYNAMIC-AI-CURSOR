// Define the type for a website history item
export interface WebsiteHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  code: {
    html: string;
    css: string;
    js: string;
  };
}

// Function to save a website to history
export const saveToHistory = (prompt: string, html: string, css: string, js: string): WebsiteHistoryItem => {
  // Create a new history item
  const newItem: WebsiteHistoryItem = {
    id: Date.now().toString(),
    prompt,
    timestamp: Date.now(),
    code: {
      html,
      css,
      js
    }
  };
  
  // Get existing history or initialize an empty array
  const existingHistory: WebsiteHistoryItem[] = getHistory();
  
  // Add the new item to the beginning of the array
  existingHistory.unshift(newItem);
  
  // Save back to localStorage
  localStorage.setItem('webmistri-history', JSON.stringify(existingHistory));
  
  return newItem;
};

// Function to get all history items
export const getHistory = (): WebsiteHistoryItem[] => {
  const storedHistory = localStorage.getItem('webmistri-history');
  return storedHistory ? JSON.parse(storedHistory) : [];
};

// Function to get a specific history item by id
export const getHistoryItemById = (id: string): WebsiteHistoryItem | null => {
  const history = getHistory();
  return history.find(item => item.id === id) || null;
};

// Function to update a history item
export const updateHistoryItem = (
  id: string, 
  updates: {
    html?: string;
    css?: string;
    js?: string;
    prompt?: string;
  }
): WebsiteHistoryItem | null => {
  const history = getHistory();
  const itemIndex = history.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return null;
  }
  
  const updatedItem = {
    ...history[itemIndex],
    code: {
      ...history[itemIndex].code,
      html: updates.html !== undefined ? updates.html : history[itemIndex].code.html,
      css: updates.css !== undefined ? updates.css : history[itemIndex].code.css,
      js: updates.js !== undefined ? updates.js : history[itemIndex].code.js,
    },
    prompt: updates.prompt !== undefined ? updates.prompt : history[itemIndex].prompt,
    // Update the timestamp when the item is modified
    timestamp: Date.now()
  };
  
  history[itemIndex] = updatedItem;
  localStorage.setItem('webmistri-history', JSON.stringify(history));
  
  return updatedItem;
};

// Function to delete a history item
export const deleteHistoryItem = (id: string): boolean => {
  const history = getHistory();
  const newHistory = history.filter(item => item.id !== id);
  
  if (newHistory.length === history.length) {
    return false;
  }
  
  localStorage.setItem('webmistri-history', JSON.stringify(newHistory));
  return true;
};

// Function to format timestamp to human-readable date
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};