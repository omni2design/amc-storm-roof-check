"use client";

import { useCallback, useSyncExternalStore } from "react";
import { compressImageFile } from "@/lib/utils/compress-image";

export type RoofCheckPhoto = {
  id: string;
  dataUrl: string;
  name: string;
};

export type RoofCheckData = {
  issue?: string;
  urgency?: string;
  roofAge?: string;
  priorRepairs?: string;
  insuranceStatus?: string;
  budget?: string;
  photos: RoofCheckPhoto[];
  anythingElse?: string;
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
};

const STORAGE_KEY = "amc_roof_check_v1";
const MAX_PHOTOS = 8;

const defaultData: RoofCheckData = {
  photos: [],
};

let state: RoofCheckData = defaultData;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function isBrowser() {
  return typeof window !== "undefined";
}

function loadFromStorage(): RoofCheckData {
  if (!isBrowser()) return defaultData;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw) as Partial<RoofCheckData>;
    return {
      ...defaultData,
      ...parsed,
      photos: Array.isArray(parsed.photos) ? parsed.photos : [],
    };
  } catch {
    return defaultData;
  }
}

function saveToStorage(next: RoofCheckData) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota exceeded — drop photos from persistence but keep in-memory for session
    try {
      const { photos: _photos, ...rest } = next;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...rest, photos: [] }));
    } catch {
      // ignore
    }
  }
}

function ensureHydrated() {
  if (!isBrowser()) return;
  if (state === defaultData) {
    state = loadFromStorage();
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  ensureHydrated();
  return state;
}

function setState(partial: Partial<RoofCheckData>) {
  state = {
    ...state,
    ...partial,
    photos: partial.photos ?? state.photos ?? [],
  };
  saveToStorage(state);
  emit();
}

function resetState() {
  state = { ...defaultData, photos: [] };
  saveToStorage(state);
  emit();
}

export function useRoofCheckStore() {
  const data = useSyncExternalStore(subscribe, getSnapshot, () => defaultData);

  const setField = useCallback(
    <K extends keyof RoofCheckData>(key: K, value: RoofCheckData[K]) => {
      setState({ [key]: value } as Partial<RoofCheckData>);
    },
    [],
  );

  const addPhotos = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files);
    const remaining = MAX_PHOTOS - state.photos.length;
    if (remaining <= 0) return;

    const toAdd: RoofCheckPhoto[] = [];
    for (const file of list.slice(0, remaining)) {
      try {
        const dataUrl = await compressImageFile(file);
        toAdd.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          dataUrl,
          name: file.name,
        });
      } catch {
        // skip invalid files
      }
    }

    if (toAdd.length > 0) {
      setState({ photos: [...state.photos, ...toAdd] });
    }
  }, []);

  const removePhoto = useCallback((id: string) => {
    setState({ photos: state.photos.filter((p) => p.id !== id) });
  }, []);

  const reset = useCallback(() => resetState(), []);

  return { data, setField, addPhotos, removePhoto, reset };
}
