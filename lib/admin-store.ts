import { promises as fs } from "fs";
import path from "path";
import {
  defaultCmsState,
  type AdminCmsState,
  type InquiryRecord,
  type MediaAsset
} from "@/lib/admin-schema";

const dataDir = path.join(process.cwd(), "data");
const cmsFile = path.join(dataDir, "admin-cms.json");
const inquiriesFile = path.join(dataDir, "inquiries.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });
}

export async function readCmsState(): Promise<AdminCmsState> {
  await ensureDataDir();

  try {
    const content = await fs.readFile(cmsFile, "utf8");
    const defaults = defaultCmsState();
    const parsed = JSON.parse(content);
    return {
      ...defaults,
      ...parsed,
      hero: { ...defaults.hero, ...(parsed.hero || {}) },
      pages: parsed.pages || defaults.pages,
      offers: parsed.offers || defaults.offers,
      media: parsed.media || defaults.media,
      operations: parsed.operations || defaults.operations,
      knowledgeBase: parsed.knowledgeBase || defaults.knowledgeBase
    };
  } catch {
    const defaults = defaultCmsState();
    await writeCmsState(defaults);
    return defaults;
  }
}

export async function writeCmsState(state: AdminCmsState) {
  await ensureDataDir();
  const nextState = { ...state, updatedAt: new Date().toISOString() };
  await fs.writeFile(cmsFile, `${JSON.stringify(nextState, null, 2)}\n`, "utf8");
  return nextState;
}

export async function readInquiries(): Promise<InquiryRecord[]> {
  await ensureDataDir();

  try {
    return JSON.parse(await fs.readFile(inquiriesFile, "utf8"));
  } catch {
    await fs.writeFile(inquiriesFile, "[]\n", "utf8");
    return [];
  }
}

export async function saveInquiry(input: Omit<InquiryRecord, "id" | "createdAt" | "status">) {
  const inquiries = await readInquiries();
  const inquiry: InquiryRecord = {
    id: `POA-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "New",
    ...input
  };

  inquiries.unshift(inquiry);
  await fs.writeFile(inquiriesFile, `${JSON.stringify(inquiries, null, 2)}\n`, "utf8");
  return inquiry;
}

export async function addMediaAsset(file: File): Promise<MediaAsset> {
  await ensureDataDir();
  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const id = `${Date.now().toString(36)}-${safeName}`;
  const filepath = path.join(uploadsDir, id);

  await fs.writeFile(filepath, bytes);

  const media: MediaAsset = {
    id,
    name: file.name,
    url: `/uploads/${id}`,
    type: file.type || "application/octet-stream",
    size: file.size,
    createdAt: new Date().toISOString()
  };

  const cms = await readCmsState();
  const next = { ...cms, media: [media, ...(cms.media || [])] };
  await writeCmsState(next);

  return media;
}
