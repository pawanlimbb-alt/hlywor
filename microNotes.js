// microNotes.js – Firestore backed micro‑notes with expiration and visibility toggle
// This module expects a Firestore instance `db` and the Firebase Auth instance from auth.js.

import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const auth = getAuth();

/** Initialize the micro‑notes UI and Firestore listeners.
 * Call this after the page's Firebase `db` has been created.
 */
export function initMicroNotes(db) {
  const textarea = document.getElementById("microTextarea");
  const pinBtn = document.getElementById("microPinBtn");
  const feed = document.getElementById("microFeed");
  const visibilityInputs = document.getElementsByName("visibility");

  // Helper: find selected visibility ("following" or "global")
  const getSelectedVisibility = () => {
    for (const inp of visibilityInputs) {
      if (inp.checked) return inp.value;
    }
    return "following";
  };

  // Create a new note
  const createNote = async () => {
    const text = textarea?.value.trim();
    if (!text) return;
    if (!auth.currentUser) {
      alert("Please sign in to post a note.");
      return;
    }
    const visibility = getSelectedVisibility();
    const user = auth.currentUser;
    try {
      await addDoc(collection(db, "microNotes"), {
        authorUid: user.uid,
        authorName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        content: text,
        emoji: window.selectedMicroEmoji || "🌙",
        createdAt: serverTimestamp(),
        visibility,
      });
      textarea.value = "";
    } catch (e) {
      console.error("Failed to add micro‑note", e);
    }
  };

  // Delete a note (author only)
  const deleteNote = async (noteId) => {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteDoc(doc(db, "microNotes", noteId));
    } catch (e) {
      console.error("Failed to delete note", e);
    }
  };

  // Human‑readable time‑ago helper
  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
      { label: "year", secs: 31536000 },
      { label: "month", secs: 2592000 },
      { label: "day", secs: 86400 },
      { label: "hour", secs: 3600 },
      { label: "minute", secs: 60 },
    ];
    for (const it of intervals) {
      const count = Math.floor(seconds / it.secs);
      if (count >= 1) return `${count} ${it.label}${count > 1 ? "s" : ""} ago`;
    }
    return "just now";
  };

  // Render notes into the feed element
  const render = (notes) => {
    if (!feed) return;
    feed.innerHTML = notes
      .map((note, i) => {
        const isOwner = auth.currentUser && auth.currentUser.uid === note.authorUid;
        const timeAgo = note.createdAt ? timeSince(note.createdAt.toDate()) : "just now";
        return `
          <div class="micro-card" style="transform:rotate(${i % 2 === 0 ? -1 : 1}deg)">
            <div class="micro-card-text"><strong>${note.emoji}</strong> ${note.content}</div>
            <div class="micro-card-footer">
              <span>${note.authorName} • ${timeAgo}</span>
              ${isOwner ? `<button class="micro-card-delete" data-id="${note.id}">🗑️</button>` : ""}
            </div>
          </div>`;
      })
      .join("");

    // Attach delete handlers
    feed.querySelectorAll('.micro-card-delete').forEach((btn) => {
      btn.addEventListener('click', () => deleteNote(btn.dataset.id));
    });
  };

  // Listen for live updates, filter by expiration (48 h) and visibility
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000); // 48 hours ago
  const notesQuery = query(
    collection(db, "microNotes"),
    where("createdAt", ">", cutoff),
    orderBy("createdAt", "desc")
  );

  onSnapshot(notesQuery, (snap) => {
    const notes = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.visibility === "global" || data.visibility === "following") {
        notes.push({ id: docSnap.id, ...data });
      }
    });
    render(notes);
  }, (err) => console.error("Micro‑notes listener error", err));

  // Wire UI interactions
  pinBtn?.addEventListener("click", createNote);
  visibilityInputs.forEach((inp) => inp.addEventListener("change", () => {}));
}

export default { initMicroNotes };
