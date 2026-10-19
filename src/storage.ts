import { useEffect, useState } from 'react';
import type { Language } from './data';

export interface Session { id: string; workoutId: string; date: string; minutes: number }
export interface StudioState { language: Language; name: string; weeklyGoal: number; sessions: Session[]; bookmarks: string[] }
const initial: StudioState = { language: 'en', name: '', weeklyGoal: 3, sessions: [], bookmarks: [] };
const KEY = 'holy-heaven-studio-v1';

function load(): StudioState {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (!saved || typeof saved !== 'object') return initial;
    return {
      language: saved.language === 'ml' ? 'ml' : 'en',
      name: typeof saved.name === 'string' ? saved.name.slice(0, 40) : '',
      weeklyGoal: Number.isInteger(saved.weeklyGoal) && saved.weeklyGoal >= 1 && saved.weeklyGoal <= 7 ? saved.weeklyGoal : 3,
      sessions: Array.isArray(saved.sessions) ? saved.sessions.filter((s: Session) => s && typeof s.id === 'string' && typeof s.workoutId === 'string' && typeof s.date === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(s.date) && Number.isFinite(new Date(s.date).getTime()) && Number.isFinite(s.minutes) && s.minutes >= 0).slice(-500) : [],
      bookmarks: Array.isArray(saved.bookmarks) ? saved.bookmarks.filter((id: unknown) => typeof id === 'string') : [],
    };
  } catch { return initial; }
}

export function useStudioState() {
  const [state, setState] = useState<StudioState>(load);
  const [storageAvailable, setStorageAvailable] = useState(true);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); setStorageAvailable(true); }
    catch { setStorageAvailable(false); }
  }, [state]);
  return { state, setState, storageAvailable };
}

export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function currentWeek(): Date[] {
  const monday = new Date();
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, index) => { const d = new Date(monday); d.setDate(d.getDate() + index); return d; });
}
