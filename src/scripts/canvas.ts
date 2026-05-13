import interact from "interactjs";
import { formatRelativeTime } from "@/utils/timeUtils";
import { rtdb } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import {
  careersDict,
  type Location,
  type Opinion,
} from "@/types/opinion.types";

const opinionsRef = ref(rtdb, "opinions");
let allOpinions: Opinion[] = [];
let currentFilter: Location | "" = "";
let loading = true;

const postItColors = ["#70755E", "#965C39", "#743996", "#963F39", "#394C6C"];

const container = document.getElementById("container") as HTMLElement;
const emptyState = document.getElementById("emptyState") as HTMLElement;
const canvas = document.getElementById("canvas") as HTMLElement;
const recenterBtn = document.getElementById(
  "recenter-btn",
) as HTMLButtonElement;

interface ViewState {
  x: number;
  y: number;
  scale: number;
}

let state: ViewState = { x: 0, y: 0, scale: 1 };
const POST_IT_WIDTH = 350;
const GAP_X = 65;
const GAP_Y = 90;
let contentWidth = 0;
let contentHeight = 0;

// --- Firebase Sync ---
onValue(opinionsRef, (snapshot) => {
  loading = false;
  const data = snapshot.val();
  if (data) {
    /* opinions = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    renderMasonry();
    recenter(); */

    allOpinions = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    // Every time DB changes, we re-apply current filter and render
    filterAndRender();

    // Only recenter on first load or big data changes
    recenter();
  } else {
    filterAndRender();
  }
});

function filterAndRender(): void {
  if (!container) return;

  // Apply the logic: Show all or filter by key
  const filteredOpinions = currentFilter.length
    ? allOpinions.filter((op) => op.location === currentFilter)
    : allOpinions;

  // Call your existing render function with the filtered subset
  // (Modify your renderMasonry to accept an array as an argument)
  renderMasonry(filteredOpinions);
}

const locationFilter = document.getElementById(
  "location-filter",
) as HTMLSelectElement;
// 4. Dropdown Event Listener
if (locationFilter) {
  locationFilter.addEventListener("change", (e) => {
    currentFilter = (e.target as HTMLSelectElement).value as Location;
    filterAndRender();
  });
}

/** 1. Masonry Logic (Unchanged) **/
function renderMasonry(dataToRender: Opinion[]): void {
  if (!loading) {
    container.innerHTML = "";

    if (dataToRender.length === 0) {
      emptyState.style.display = "flex";
      return;
    }
  }

  emptyState.style.display = "none";

  const columns = Math.min(dataToRender.length, 4);
  const colHeights: number[] = new Array(columns).fill(0);

  dataToRender.forEach((data) => {
    let randomBgIndex = Math.floor(Math.random() * 5) + 1;

    const postIt = document.createElement("div");
    postIt.classList.add("post-it");
    postIt.innerHTML = `
            <div class="background" style="background-image: url('/post-it/body-${randomBgIndex}.png');" >
              <img src="/post-it/top-${randomBgIndex}.png" class="top" />
              <img src="/post-it/bottom-${randomBgIndex}.png" class="bottom" />
            </div>

            <p class="time">${formatRelativeTime(data.createdAt)}</p>
            <span class="place">${data.location}</span>
            
            <div class="column">
              <p class="email">${data.email}</h3>
              <p class="career">${careersDict[data.career].label}</h3>
            </div>


            <p class="text">${data.text}</p>
        `;
    container.appendChild(postIt);
    const shortestCol = colHeights.indexOf(Math.min(...colHeights));
    const random = Math.random();
    const posX = shortestCol * (POST_IT_WIDTH + GAP_X) + (random * 10 - 5);
    const posY = colHeights[shortestCol] + (random * 50 - 25);
    postIt.style.left = `${posX}px`;
    postIt.style.top = `${posY}px`;
    postIt.style.rotate = `${random * 6 - 3}deg`;
    postIt.style.filter = `drop-shadow(0px 12px 12px ${postItColors[randomBgIndex - 1]}72)`;
    colHeights[shortestCol] += postIt.offsetHeight + GAP_Y;
  });
  contentWidth = columns * (POST_IT_WIDTH + GAP_X) - GAP_X;
  contentHeight = Math.max(...colHeights);
}

function updateTransform(): void {
  container.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.scale})`;
}

/** 2. Multi-Touch & Desktop Zoom/Pan Logic **/

// State for pointer tracking
const evCache: PointerEvent[] = [];
let prevDiff = -1;

const debugText = document.getElementById("debugText");

/* function initPointerEvents() {
  canvas.style.touchAction = "none"; // Critical for mobile

  canvas.onpointerdown = (e) => evCache.push(e);

  canvas.onpointermove = (e) => {
    const index = evCache.findIndex((ev) => ev.pointerId === e.pointerId);
    if (index === -1) return;
    
    const prevEvent = evCache[index];
    evCache[index] = e;

    // PINCH AND MULTI-FINGER PAN
    if (evCache.length === 2) {
      const curDiff = Math.hypot(
        evCache[0].clientX - evCache[1].clientX,
        evCache[0].clientY - evCache[1].clientY
      );

      // Midpoint calculation for panning while pinching
      const midX = (evCache[0].clientX + evCache[1].clientX) / 2;
      const midY = (evCache[0].clientY + evCache[1].clientY) / 2;
      const prevMidX = (evCache[0].clientX - (evCache[0].clientX - prevEvent.clientX) + evCache[1].clientX) / 2;
      const prevMidY = (evCache[0].clientY - (evCache[0].clientY - prevEvent.clientY) + evCache[1].clientY) / 2;

      // Handle Pan part of the gesture
      if (prevEvent.pointerId === e.pointerId) {
          state.x += (midX - prevMidX);
          state.y += (midY - prevMidY);
      }

      // Handle Zoom part of the gesture
      if (prevDiff > 0) {
        const zoomFactor = curDiff / prevDiff;
        const newScale = Math.min(Math.max(0.1, state.scale * zoomFactor), 3);
        
        const rect = canvas.getBoundingClientRect();
        const offsetX = midX - rect.left;
        const offsetY = midY - rect.top;

        state.x = offsetX - (offsetX - state.x) * (newScale / state.scale);
        state.y = offsetY - (offsetY - state.y) * (newScale / state.scale);
        state.scale = newScale;
      }
      prevDiff = curDiff;
      updateTransform();
    } 
    // SINGLE FINGER PAN (Handled by interact.js)
  };

  canvas.onpointerup = canvas.onpointerleave = (e) => {
    const index = evCache.findIndex((ev) => ev.pointerId === e.pointerId);
    if (index !== -1) evCache.splice(index, 1);
    if (evCache.length < 2) prevDiff = -1;
  };
} */

function initPointerEvents() {
  canvas.onpointerdown = (e) => {
    evCache.push(e);
  };

  canvas.onpointermove = (e) => {
    const index = evCache.findIndex((ev) => ev.pointerId === e.pointerId);
    if (index === -1) return;

    const prevEvent = { ...evCache[index] }; // Clone previous state
    evCache[index] = e;

    if (evCache.length === 2) {
      // 1. Calculate current distance between two fingers
      const curDiff = Math.hypot(
        evCache[0].clientX - evCache[1].clientX,
        evCache[0].clientY - evCache[1].clientY,
      );

      // 2. Only zoom if we have a previous distance to compare to
      if (prevDiff > 0) {
        // Calculate the ratio of change
        const zoomFactor = curDiff / prevDiff;
        const newScale = Math.min(Math.max(0.1, state.scale * zoomFactor), 4);

        // Find the midpoint between fingers to anchor the zoom
        const midX = (evCache[0].clientX + evCache[1].clientX) / 2;
        const midY = (evCache[0].clientY + evCache[1].clientY) / 2;

        const rect = canvas.getBoundingClientRect();
        const offsetX = midX - rect.left;
        const offsetY = midY - rect.top;

        // Apply anchoring math
        state.x = offsetX - (offsetX - state.x) * (newScale / state.scale);
        state.y = offsetY - (offsetY - state.y) * (newScale / state.scale);
        state.scale = newScale;

        updateTransform();
      }

      // IMPORTANT: Update prevDiff for the next move event
      prevDiff = curDiff;
    }
  };

  canvas.onpointerup =
    canvas.onpointerleave =
    canvas.onpointercancel =
      (e) => {
        const index = evCache.findIndex((ev) => ev.pointerId === e.pointerId);
        if (index !== -1) evCache.splice(index, 1);

        // Reset diff when fingers are removed so next pinch starts fresh
        if (evCache.length < 2) {
          prevDiff = -1;
        }
      };
}

// Single finger panning via Interact.js (works with pointers)
interact("#canvas").draggable({
  inertia: {
    resistance: 5, // Higher = stops faster
    minSpeed: 150, // Minimum speed to trigger inertia
    endSpeed: 10, // Speed at which it stops completely
  },
  listeners: {
    move(event) {
      // Only drag if one finger is used
      if (evCache.length <= 1) {
        state.x += event.dx;
        state.y += event.dy;
        updateTransform();
      }
    },
  },
});

// Desktop Wheel Zoom
canvas.addEventListener(
  "wheel",
  (e: WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const delta = -e.deltaY;
    const oldScale = state.scale;
    const newScale = Math.min(
      Math.max(0.1, oldScale + delta * (e.ctrlKey ? 10 : 1) * zoomSpeed),
      3,
    );

    if (
      (!e.ctrlKey && Math.abs(e.deltaX) > 0) ||
      (Math.abs(e.deltaY) > 0 && !e.ctrlKey)
    ) {
      // Trackpad panning
      state.x -= e.deltaX;
      state.y -= e.deltaY;
    } else {
      // Zooming
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      state.x = mouseX - (mouseX - state.x) * (newScale / oldScale);
      state.y = mouseY - (mouseY - state.y) * (newScale / oldScale);
      state.scale = newScale;
    }
    updateTransform();
  },
  { passive: false },
);

/** 3. Recenter (Unchanged) **/
function recenter(): void {
  state.scale = 0.7;
  state.x = window.innerWidth / 2 - (contentWidth / 2) * state.scale;
  state.y = window.innerHeight / 2 - (contentHeight / 2) * state.scale;
  container.style.transition =
    "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
  updateTransform();
  setTimeout(() => {
    container.style.transition = "none";
  }, 600);
}

recenterBtn.addEventListener("click", recenter);

// Init
initPointerEvents();
renderMasonry(allOpinions);
/* window.addEventListener("load", recenter); */
window.addEventListener("resize", recenter);
