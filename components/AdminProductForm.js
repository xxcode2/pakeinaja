"use client";

import { useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";

export default function AdminProductForm({ initial, onClose, onSaved }) {
  const isEdit = Boolean(initial);
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [photos, setPhotos] = useState(initial?.photos || []);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");

    const uploaded = [];
    try {
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Mengunggah foto ${i + 1} dari ${files.length}...`);
        const blob = await upload(files[i].name, files[i], {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        uploaded.push(blob.url);
      }
      setPhotos((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(
        uploaded.length
          ? `Sebagian foto gagal diunggah: ${err.message}`
          : err.message || "Upload gagal."
      );
      if (uploaded.length) setPhotos((prev) => [...prev, ...uploaded]);
    } finally {
      setUploading(false);
      setUploadProgress("");
      e.target.value = "";
    }
  }
