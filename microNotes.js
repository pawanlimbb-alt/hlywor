// microNotes.js – Firestore backed micro-notes with expiration and visibility toggle
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

/**
 * Initialize the micro-notes UI and Firestore listeners.
 * Must be called AFTER initializeApp() has run so getAuth() can find the default app.
 */
export function initMicroNotes(db) {
  const auth = getAuth();

  const textarea = document.getElementById("microTextarea");
  const pinBtn = document.getElementById("microPinBtn");
  const feed = document.getElementById("microFeed");
  const visibilityInputs = document.getElementsByName("visibility");
  const toggleBtns = document.querySelectorAll(".micro-view-toggle-btn");

  // Which feed to view: "global" (everyone) or "following" (people you follow)
  let viewMode = "global";

  // Cache of followed UIDs for the current user
  let followedUids = new Set();

  const getSelectedVisibility = () => {
    for (const inp of visibilityInputs) {
      if (inp.checked) return inp.value;
    }
    return "global";
  };

  // Load the set of UIDs the current user follows (from sticks collection)
  const loadFollowedUids = async () => {
    followedUids = new Set();
    const user = auth.currentUser;
    if (!user || !db) return;
    try {
      const snap = await getDocs(
        query(collection(db, "sticks"), where("fromUid", "==", user.uid))
      );
      snap.forEach((d) => followedUids.add(d.data().toUid));
    } catch (e) {
      // sticks not available – leave followedUids empty
    }
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

  // All notes fetched from Firestore (client-side filtered by viewMode)
  let allNotes = [];

  const render = () => {
    if (!feed) return;

    const user = auth.currentUser;

    // Filter by current viewMode
    const filtered = allNotes.filter((note) => {
      if (viewMode === "global") {
        // Show all global notes + own notes regardless
        return note.visibility === "global" || (user && note.authorUid === user.uid);
      } else {
        // "following" mode: show notes from people you follow (+ own notes)
        return (
          (user && note.authorUid === user.uid) ||
          followedUids.has(note.authorUid)
        );
      }
    });

    if (filtered.length === 0) {
      const msg = viewMode === "following"
        ? "No notes from people you follow yet."
        : "No notes yet. Drop the first one!";
      feed.innerHTML = '<p style="opacity:0.4;font-size:0.8rem;text-align:center;padding:12px 0;">' + msg + "</p>";
      return;
    }

    feed.innerHTML = filtered
      .map((note, i) => {
        const isOwner = user && user.uid === note.authorUid;
        const timeAgo = note.createdAt ? timeSince(note.createdAt.toDate()) : "just now";
        const visBadge = note.visibility === "global"
          ? '<span class="micro-vis-badge global">🌍 Global</span>'
          : '<span class="micro-vis-badge following">👥 Following</span>';
        const deleteBtn = isOwner
          ? '<button class="micro-card-delete" data-id="' + note.id + '" title="Delete note">✕</button>'
          : "";
        return '<div class="micro-card" style="transform:rotate(' + (i % 2 === 0 ? -1 : 1) + 'deg)">'
          + '<div class="micro-card-emoji">' + note.emoji + "</div>"
          + '<div class="micro-card-text">' + note.content + "</div>"
          + '<div class="micro-card-footer">'
          + '<span class="micro-card-author">' + note.authorName + "</span>"
          + '<span class="micro-card-time">' + timeAgo + "</span>"
          + visBadge
          + deleteBtn
          + "</div>"
          + "</div>";
      })
      .join("");

    feed.querySelectorAll(".micro-card-delete").forEach((btn) => {
      btn.addEventListener("click", () => deleteNote(btn.dataset.id));
    });
  };

  // Listen to all non-expired notes; client-side filter handles visibility
  const cutoff = Timestamp.fromDate(new Date(Date.now() - 48 * 60 * 60 * 1000));
  const notesQuery = query(
    collection(db, "microNotes"),
    where("createdAt", ">", cutoff),
    orderBy("createdAt", "desc")
  );

  onSnapshot(
    notesQuery,
    (snap) => {
      allNotes = [];
      snap.forEach((docSnap) => allNotes.push({ id: docSnap.id, ...docSnap.data() }));
      render();
    },
    (err) => console.error("Micro-notes listener error:", err)
  );

  // Wire view-mode toggle buttons (Following / Global tabs on the feed)
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      viewMode = btn.dataset.view || "global";
      toggleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  // Wire pin button
  pinBtn?.addEventListener("click", createNote);

  // Load followed UIDs when auth state is known, then re-render
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      await loadFollowedUids();
      render();
    } else {
      followedUids = new Set();
      render();
    }
  });
}
