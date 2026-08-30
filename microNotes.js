// microNotes.js – Firestore backed micro-notes with expiration and visibility toggle
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/**
 * Initialize the micro-notes UI and Firestore listeners.
 * Must be called AFTER initializeApp() has run so getAuth() can find the default app.
 */
export function initMicroNotes(db) {
  // Moved inside the function – runs after initializeApp()
  const auth = getAuth();

  const textarea = document.getElementById("microTextarea");
  const pinBtn = document.getElementById("microPinBtn");
  const feed = document.getElementById("microFeed");
  const visibilityInputs = document.getElementsByName("visibility");

  const getSelectedVisibility = () => {
    for (const inp of visibilityInputs) {
      if (inp.checked) return inp.value;
    }
    return "following";
  };

  const createNote = async () => {
    const text = textarea?.value.trim();
    if (!text) return;
    if (!auth.currentUser) {
      alert("Please sign in to post a note.");
      return;
    }
    const user = auth.currentUser;
    try {
      await addDoc(collection(db, "microNotes"), {
        authorUid: user.uid,
        authorName: user.displayName || user.email?.split("@")[0] || "Anonymous",
        content: text,
        emoji: window.selectedMicroEmoji || "🌙",
        createdAt: serverTimestamp(),
        visibility: getSelectedVisibility(),
      });
      textarea.value = "";
    } catch (e) {
      console.error("Failed to add micro-note", e);
    }
  };

  const deleteNote = async (noteId) => {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteDoc(doc(db, "microNotes", noteId));
    } catch (e) {
      console.error("Failed to delete note", e);
    }
  };

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
      if (count >= 1) return count + " " + it.label + (count > 1 ? "s" : "") + " ago";
    }
    return "just now";
  };

  const render = (notes) => {
    if (!feed) return;
    if (notes.length === 0) {
      feed.innerHTML = '<p style="opacity:0.4;font-size:0.8rem;text-align:center;padding:12px;">No notes yet. Be the first to drop one!</p>';
      return;
    }
    feed.innerHTML = notes
      .map((note, i) => {
        const isOwner = auth.currentUser && auth.currentUser.uid === note.authorUid;
        const timeAgo = note.createdAt ? timeSince(note.createdAt.toDate()) : "just now";
        const deleteBtn = isOwner
          ? '<button class="micro-card-delete" data-id="' + note.id + '" title="Delete">🗑️</button>'
          : "";
        return '<div class="micro-card" style="transform:rotate(' + (i % 2 === 0 ? -1 : 1) + 'deg)">'
          + '<div class="micro-card-text"><strong>' + note.emoji + "</strong> " + note.content + "</div>"
          + '<div class="micro-card-footer">'
          + "<span>" + note.authorName + " • " + timeAgo + "</span>"
          + deleteBtn
          + "</div>"
          + "</div>";
      })
      .join("");

    feed.querySelectorAll(".micro-card-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteNote(btn.dataset.id));
    });
  };

  // Use Firestore Timestamp for the cutoff – plain JS Date is not accepted
  const cutoff = Timestamp.fromDate(new Date(Date.now() - 48 * 60 * 60 * 1000));

  const notesQuery = query(
    collection(db, "microNotes"),
    where("createdAt", ">", cutoff),
    orderBy("createdAt", "desc")
  );

  onSnapshot(
    notesQuery,
    (snap) => {
      const notes = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.visibility === "global" || data.visibility === "following") {
          notes.push({ id: docSnap.id, ...data });
        }
      });
      render(notes);
    },
    (err) => console.error("Micro-notes listener error:", err)
  );

  pinBtn?.addEventListener("click", createNote);
}
