// src/pages/CreateListing.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addListing } from "../utils/api";

const TYPE_COLOR = { donate:"#FFC86B", trade:"#F590A6", repair:"#91A4D9" };

function readFileAsDataURL(file) {
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });
}

export default function CreateListing() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [type, setType] = useState("donate"); // donate | trade | repair
  const [desc, setDesc] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  async function onSelectFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = await readFileAsDataURL(file);
    setImagePreview(url);
  }

  async function onDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = await readFileAsDataURL(file);
    setImagePreview(url);
  }

  function onDragOver(e){ e.preventDefault(); }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!title.trim()) { setErr("Please add a title."); return; }

    try {
      setSubmitting(true);

      // In mock mode we store a dataURL string as `image`
      let image = imagePreview || "";
      if (!image && imageFile) {
        image = await readFileAsDataURL(imageFile);
      }

      const payload = {
        title: title.trim(),
        category,
        type,
        description: desc,
        community: "penbrooke meadows",
        image,
        swatchColor: TYPE_COLOR[type] || "#ded6e1",
      };

      // You can send FormData too (api supports both), but dataURL is simplest for mock/localStorage.
      await addListing(payload);

      nav("/marketplace");
    } catch (ex) {
      setErr(ex?.message || "Failed to create listing.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container">
      <h1 className="cl-title">Create listing</h1>

      <form className="cl-form" onSubmit={onSubmit}>
        {err ? <div className="cl-error">{err}</div> : null}

        <label className="cl-label">Title</label>
        <input
          className="cl-input"
          placeholder="e.g., gently used blender"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <div className="cl-row">
          <div className="cl-col">
            <label className="cl-label">Category</label>
            <select className="cl-input" value={category} onChange={e=>setCategory(e.target.value)}>
              <option>Electronics</option>
              <option>Home & Kitchen</option>
              <option>Books</option>
              <option>Clothing</option>
              <option>Furniture</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
          </div>

          <div className="cl-col">
            <label className="cl-label">Type</label>
            <select className="cl-input" value={type} onChange={e=>setType(e.target.value)}>
              <option value="donate">Donate</option>
              <option value="trade">Exchange</option>
              <option value="repair">Repair</option>
            </select>
          </div>
        </div>

        <label className="cl-label">Description</label>
        <textarea
          className="cl-input cl-textarea"
          rows={5}
          placeholder="Tell people about the condition, what’s included, pickup details, etc."
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
        />

        <label className="cl-label">Photos</label>
        <div
          className="cl-drop"
          onDrop={onDrop}
          onDragOver={onDragOver}
          style={{borderColor: imagePreview ? "transparent" : undefined}}
        >
          {!imagePreview ? (
            <>
              <input
                id="filePick"
                type="file"
                accept="image/*"
                style={{ display:"none" }}
                onChange={onSelectFile}
              />
              <button
                type="button"
                className="cl-btn ghost"
                onClick={()=>document.getElementById("filePick").click()}
              >
                Choose image
              </button>
              <div className="cl-drop-hint">or drag & drop here</div>
            </>
          ) : (
            <div className="cl-preview-wrap">
              <img alt="preview" src={imagePreview} className="cl-preview" />
              <button
                type="button"
                className="cl-btn tiny"
                onClick={() => { setImagePreview(""); setImageFile(null); }}
              >
                remove
              </button>
            </div>
          )}
        </div>

        <button className="cl-btn primary" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Publish listing"}
        </button>
      </form>
    </div>
  );
}
