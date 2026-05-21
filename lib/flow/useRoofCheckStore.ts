"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { compressImageFile } from "@/lib/utils/compress-image";

export type RoofCheckPhoto = {
  id: string;
  dataUrl: string;
  name: string;
  note?: string;
};

export type RoofCheckPhotoInput = {
  dataUrl: string;
  name: string;
  note?: string;
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
export const MAX_ROOF_CHECK_PHOTOS = 8;

const defaultData: RoofCheckData = {
  photos: [],
};

let state: RoofCheckData = defaultData;
let storeHydrated = false;
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

function hydrateStore() {
  if (!isBrowser() || storeHydrated) return;
  storeHydrated = true;
  if (state === defaultData) {
    state = loadFromStorage();
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return defaultData;
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
  state = { photos: [] };
  if (isBrowser()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  saveToStorage(state);
  emit();
}

export function useRoofCheckStore() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const snapshotBeforeHydrate = state;
    hydrateStore();
    if (state !== snapshotBeforeHydrate) {
      emit();
    }
  }, []);

  const setField = useCallback(
    <K extends keyof RoofCheckData>(key: K, value: RoofCheckData[K]) => {
      setState({ [key]: value } as Partial<RoofCheckData>);
    },
    [],
  );

  const addPhoto = useCallback((input: RoofCheckPhotoInput) => {
    if (state.photos.length >= MAX_ROOF_CHECK_PHOTOS) return false;

    const trimmedNote = input.note?.trim();
    const entry: RoofCheckPhoto = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      dataUrl: input.dataUrl,
      name: input.name,
      ...(trimmedNote ? { note: trimmedNote } : {}),
    };
    setState({ photos: [...state.photos, entry] });
    return true;
  }, []);

  const addPhotos = useCallback(async (files: FileList | File[]) => {
    const list = Array.from(files);
    const remaining = MAX_ROOF_CHECK_PHOTOS - state.photos.length;
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

  const updatePhotoNote = useCallback((id: string, note?: string) => {
    const trimmedNote = note?.trim();
    setState({
      photos: state.photos.map((photo) => {
        if (photo.id !== id) return photo;
        if (!trimmedNote) {
          const { note: _removed, ...rest } = photo;
          return rest;
        }
        return { ...photo, note: trimmedNote };
      }),
    });
  }, []);

  const removePhoto = useCallback((id: string) => {
    setState({ photos: state.photos.filter((p) => p.id !== id) });
  }, []);

  const reset = useCallback(() => resetState(), []);

  return { data, setField, addPhoto, addPhotos, updatePhotoNote, removePhoto, reset };
}
