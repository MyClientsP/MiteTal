// =============================================================================
// src/utils/fetchData.ts
// =============================================================================

import {
  globalMock,
  homeMock,
  aboutMock,
  projectsListMock,
  articlesMock,
  projectDetailsMock,
  contactMock,
  guideMock,
} from "@/data/mockData";

const mockDataMap: Record<string, any> = {
  global: globalMock,
  home: homeMock,
  about: aboutMock,
  projects: projectsListMock,
  articles: articlesMock,
  contact: contactMock,
  guide: guideMock,
};

export async function fetchStrapiData(
  endpoint: string,
  queryQs?: object,
  documentId?: string
): Promise<any> {
  if (documentId) {
    return projectDetailsMock[documentId] ?? null;
  }
  return mockDataMap[endpoint] ?? null;
}

// Kept so existing imports don't break — no longer used for fetching
export const globalQuery = {};