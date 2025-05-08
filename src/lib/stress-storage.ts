// src/lib/stress-storage.ts
import { format } from 'date-fns';

export interface StressEntry {
  id: string;
  date: string;
  timestamp?: string; // Add the optional timestamp property
  level: number;
  factors: string[];
  journal: string;
}
  
  // Storage key for our stress entries
  const STORAGE_KEY = 'mindflow_stress_entries';
  
  // Get all stress entries
  export function getStressEntries(): StressEntry[] {
    try {
      const storedEntries = localStorage.getItem(STORAGE_KEY);
      if (!storedEntries) return [];
      return JSON.parse(storedEntries);
    } catch (error) {
      console.error('Error retrieving stress entries from localStorage:', error);
      return [];
    }
  }

  // Add a new function to get entries for a specific day
  export function getEntriesForDate(date: Date): StressEntry[] {
    const entries = getStressEntries();
    const targetDateStr = format(date, 'yyyy-MM-dd');
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return format(entryDate, 'yyyy-MM-dd') === targetDateStr;
    });
  }
  
  // Add a new stress entry
  export function addStressEntry(entry: Omit<StressEntry, 'id'>): StressEntry {
    try {
      const entries = getStressEntries();
      
      // Generate a unique ID with a timestamp to ensure uniqueness
      const newEntry = {
        ...entry,
        id: generateId(),
        timestamp: new Date().toISOString(), // Add timestamp for sorting by exact time
      };
      
      // Add the new entry regardless of existing entries on the same date
      entries.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return newEntry;
    } catch (error) {
      console.error('Error saving stress entry to localStorage:', error);
      throw new Error('Failed to save stress entry');
    }
  }
  
  
  // Update an existing stress entry
  export function updateStressEntry(updatedEntry: StressEntry): StressEntry {
    try {
      const entries = getStressEntries();
      const index = entries.findIndex(entry => entry.id === updatedEntry.id);
      
      if (index === -1) {
        throw new Error('Entry not found');
      }
      
      entries[index] = updatedEntry;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return updatedEntry;
    } catch (error) {
      console.error('Error updating stress entry in localStorage:', error);
      throw new Error('Failed to update stress entry');
    }
  }
  
  // Delete a stress entry
  export function deleteStressEntry(id: string): void {
    try {
      const entries = getStressEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
    } catch (error) {
      console.error('Error deleting stress entry from localStorage:', error);
      throw new Error('Failed to delete stress entry');
    }
  }
  
  // Get stress entries for a specific date range
  export function getStressEntriesByDateRange(startDate: Date, endDate: Date): StressEntry[] {
    try {
      const entries = getStressEntries();
      return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });
    } catch (error) {
      console.error('Error filtering stress entries by date range:', error);
      return [];
    }
  }
  
  // Generate a unique ID for entries
  function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  
  // Get average stress level for a specific date range
  export function getAverageStressLevel(startDate: Date, endDate: Date): number | null {
    const entries = getStressEntriesByDateRange(startDate, endDate);
    
    if (entries.length === 0) return null;
    
    const sum = entries.reduce((total, entry) => total + entry.level, 0);
    return parseFloat((sum / entries.length).toFixed(1));
  }
  
  // Get most common stress factors
  export function getMostCommonFactors(limit: number = 5): { factor: string; count: number }[] {
    const entries = getStressEntries();
    
    if (entries.length === 0) return [];
    
    // Count occurrences of each factor
    const factorCounts: Record<string, number> = {};
    
    entries.forEach(entry => {
      entry.factors.forEach(factor => {
        factorCounts[factor] = (factorCounts[factor] || 0) + 1;
      });
    });
    
    // Convert to array and sort by count
    return Object.entries(factorCounts)
      .map(([factor, count]) => ({ factor, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
  
  // Get streak (consecutive days with entries)
  export function getCurrentStreak(): number {
    const entries = getStressEntries();
    
    if (entries.length === 0) return 0;
    
    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Format dates as YYYY-MM-DD for comparison
    const formatDateString = (dateStr: string) => {
      const date = new Date(dateStr);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    
    // Get today's date as YYYY-MM-DD
    const today = formatDateString(new Date().toISOString());
    
    // Check if there's an entry for today
    const hasEntryToday = sortedEntries.some(entry => formatDateString(entry.date) === today);
    
    if (!hasEntryToday) return 0;
    
    let streak = 1;
    let currentDate = new Date();
    
    // Loop through previous days
    for (let i = 1; i <= 365; i++) {
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
      const dateStr = formatDateString(currentDate.toISOString());
      
      // Check if there's an entry for this day
      const hasEntry = sortedEntries.some(entry => formatDateString(entry.date) === dateStr);
      
      if (hasEntry) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }


// Get total session count
export function getTotalSessions(): number {
  return getStressEntries().length;
}

// Get average stress level for all entries
export function getOverallAverageStress(): number | null {
  const entries = getStressEntries();
  
  if (entries.length === 0) return null;
  
  const sum = entries.reduce((total, entry) => total + entry.level, 0);
  return parseFloat((sum / entries.length).toFixed(1));
}

// Get last check-in time
export function getLastCheckInTime(): string | null {
  const entries = getStressEntries();
  
  if (entries.length === 0) return null;
  
  // Sort entries by date and time (newest first)
  const sortedEntries = [...entries].sort((a, b) => {
    // Sort by date first
    const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime();
    
    // If same date, sort by timestamp
    if (dateComparison === 0 && a.timestamp && b.timestamp) {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    
    return dateComparison;
  });
  
  // Get the most recent entry
  const latestEntry = sortedEntries[0];
  
  if (!latestEntry) return null;
  
  // Use timestamp if available, otherwise use date
  const date = latestEntry.timestamp ? new Date(latestEntry.timestamp) : new Date(latestEntry.date);
  
  // Format the date
  const today = new Date();
  const isToday = format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
  
  if (isToday) {
    return `Today at ${format(date, 'h:mm a')}`;
  } else {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
    
    return isYesterday ? `Yesterday at ${format(date, 'h:mm a')}` : format(date, 'MMM d, yyyy');
  }
}