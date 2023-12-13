import cors from "@/lib/admin/core";
import { NextResponse } from "next/server";
import { connectDb } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { storageModelFn } from "@/lib/models/storage";

export async function POST(req) {
  const { dataStorage } = await req.json();
  let modelStorage;

  for (const storage in dataStorage) {
    if (
      !dataStorage[storage] ||
      (dataStorage[storage] !== "cloudinary" &&
        dataStorage[storage] !== "vercelBlob" &&
        dataStorage[storage] !== "mega")
    ) {
      return cors(
        req,
        NextResponse.json("Incorrect data", {
          status: 422,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
  }

  const uploadStorage = dataStorage.upload;
  const downloadStorages = [dataStorage.download1, dataStorage.download2, dataStorage.download3];

  try {
    modelStorage = await storageModelFn({ db: connectDb("AdminB"), collection: "Storage" });
  } catch (err) {
    console.log(err);
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
  let storage;

  try {
    storage = await modelStorage.findOneAndUpdate(
      { mode: "storage" },
      {
        mode: "storage",
        uploadStorage,
        downloadStorages,
      },
      { new: true, overwrite: true }
    );

    if (!storage) {
      storage = await new modelStorage({ mode: "storage", uploadStorage, downloadStorages });
    }

    await storage.save();
  } catch (err) {
    console.log(err);
    return cors(
      req,
      NextResponse.json("Something went wrong", {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  revalidatePath("/");

  return cors(
    req,
    NextResponse.json("Changed storages settings ", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}

export async function OPTIONS(request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}
