// /src/scripts/index.js

import { readBodies, writeBodies } from "./data";

// time
const SIM_DATE = document.getElementById("simDate");
const SIM_TIME = document.getElementById("simTime");

// speed and status
const SIM_STATUS = document.getElementById("simStatus");
const SIM_PAUSE_TOGGLE = document.getElementById("simPauseToggle");
const SPEED_SIXTEENTH_BUTTON = document.getElementById("speedSixteenthButton");
const SPEED_ONE_BUTTON = document.getElementById("speedOneButton");
const SPEED_TWO_BUTTON = document.getElementById("speedTwoButton");
const SPEED_FIVE_BUTTON = document.getElementById("speedFiveButton");
const SPEED_TEN_BUTTON = document.getElementById("speedTenButton");

// sidebar buttons and content areas
const CREATE_BUTTON = document.getElementById("sidebarNavCreate");
const SIDEBAR_CONTENT_CREATE = document.getElementById("sidebarContentCreate");
const BODIES_BUTTON = document.getElementById("sidebarNavBodies");
const SIDEBAR_CONTENT_BODIES = document.getElementById("sidebarContentBodies");
const SIDEBAR_CONTENT_EDIT = document.getElementById("sidebarContentEdit");

// create area
const CREATE_NAME = document.getElementById("createName");
const CREATE_COLOR = document.getElementById("createColor");
const CREATE_COLOR_INPUT = document.getElementById("createColorInput");
const CREATE_MASS_RANGE = document.getElementById("createMassRange");
const CREATE_MASS_INPUT = document.getElementById("createMassInput");
const CREATE_RADIUS_RANGE = document.getElementById("createRadiusRange");
const CREATE_RADIUS_INPUT = document.getElementById("createRadiusInput");
const CREATE_INITIAL_VX = document.getElementById("createInitialVX");
const CREATE_INITIAL_VY = document.getElementById("createInitialVY");

// canvas
const MAIN_CANVAS = document.getElementById("canvas");
const PICK_POSITION_BUTTON = document.getElementById("pickPositionButton");
const CREATE_X = document.getElementById("createX");
const CREATE_Y = document.getElementById("createY");
let pickingMode = false;
let pickingTarget = "create";

// edit area
const EDIT_NAME = document.getElementById("editName");
const EDIT_COLOR = document.getElementById("editColor");
const EDIT_COLOR_INPUT = document.getElementById("editColorInput");
const EDIT_MASS_RANGE = document.getElementById("editMassRange");
const EDIT_MASS_INPUT = document.getElementById("editMassInput");
const EDIT_RADIUS_RANGE = document.getElementById("editRadiusRange");
const EDIT_RADIUS_INPUT = document.getElementById("editRadiusInput");
const EDIT_VX = document.getElementById("editVX");
const EDIT_VY = document.getElementById("editVY");
const EDIT_X = document.getElementById("editX");
const EDIT_Y = document.getElementById("editY");
const EDIT_BACK_BUTTON = document.getElementById("editBackButton");
const EDIT_DELETE_BUTTON = document.getElementById("editDeleteButton");
const EDIT_PICK_BUTTON = document.getElementById("editPickPositionButton");
let editingBodyName = null;

// bodies area
const BODIES_COUNT = document.getElementById("bodiesCount");

// sidebar tab buttons
CREATE_BUTTON.addEventListener("click", () => {
  SIDEBAR_CONTENT_CREATE.classList.remove("hide");
  SIDEBAR_CONTENT_BODIES.classList.add("hide");
  SIDEBAR_CONTENT_EDIT.classList.add("hide");

  CREATE_BUTTON.disabled = true;
  BODIES_BUTTON.disabled = false;
  editingBodyName = null;
});

BODIES_BUTTON.addEventListener("click", () => {
  SIDEBAR_CONTENT_BODIES.classList.remove("hide");
  SIDEBAR_CONTENT_CREATE.classList.add("hide");
  SIDEBAR_CONTENT_EDIT.classList.add("hide");

  BODIES_BUTTON.disabled = true;
  CREATE_BUTTON.disabled = false;
  editingBodyName = null;
});

// create

// mass
CREATE_MASS_RANGE.addEventListener("input", () => {
  CREATE_MASS_INPUT.value = CREATE_MASS_RANGE.value;
});
CREATE_MASS_INPUT.addEventListener("input", () => {
  CREATE_MASS_RANGE.value = CREATE_MASS_INPUT.value;
});

// radius
CREATE_RADIUS_RANGE.addEventListener("input", () => {
  CREATE_RADIUS_INPUT.value = CREATE_RADIUS_RANGE.value;
});
CREATE_RADIUS_INPUT.addEventListener("input", () => {
  CREATE_RADIUS_RANGE.value = CREATE_RADIUS_INPUT.value;
});

// color
CREATE_COLOR.addEventListener("input", () => {
  CREATE_COLOR_INPUT.value = CREATE_COLOR.value;
});
CREATE_COLOR_INPUT.addEventListener("input", () => {
  CREATE_COLOR.value = CREATE_COLOR_INPUT.value;
});

// form validation
SIDEBAR_CONTENT_CREATE.addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = [
    CREATE_NAME,
    CREATE_COLOR,
    CREATE_COLOR_INPUT,
    CREATE_MASS_RANGE,
    CREATE_MASS_INPUT,
    CREATE_RADIUS_RANGE,
    CREATE_RADIUS_INPUT,
    CREATE_INITIAL_VX,
    CREATE_INITIAL_VY,
    CREATE_X,
    CREATE_Y,
  ];

  let isValid = true;

  fields.forEach((field) => {
    field.style.border = "";

    if (field.value.trim() === "") {
      isValid = false;
      field.style.border = "2px solid red";
    }
  });

  const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;

  if (!hexColorRegex.test(CREATE_COLOR_INPUT.value)) {
    isValid = false;
    CREATE_COLOR_INPUT.style.border = "2p solid red";
  }

  const positiveNumberFields = [CREATE_MASS_INPUT, CREATE_RADIUS_INPUT];

  positiveNumberFields.forEach((field) => {
    const value = Number(field.value);

    if (isNaN(value) || value <= 0) {
      isValid = false;
      field.style.border = "2px solid red";
    }
  });

  const velocityFields = [CREATE_INITIAL_VX, CREATE_INITIAL_VY];

  velocityFields.forEach((field) => {
    const value = Number(field.value);

    if (isNaN(value)) {
      isValid = false;
      field.style.border = "2px solid red";
    }
  });

  if (!isValid) {
    alert("Please fill out all fields correctly");
    return;
  }

  const newName = CREATE_NAME.value.trim();

  // check for duplicate name
  const existing = readBodies();
  const isDuplicate = existing.some(
    (b) => b.name.toLowerCase() === newName.toLowerCase(),
  );

  if (isDuplicate) {
    CREATE_NAME.style.border = "2p solid red";
    alert(
      `A body named ${newName} already exists. Please choose a different name`,
    );
    return;
  }

  const newBody = {
    name: newName,
    color: CREATE_COLOR.value,
    mass: Number(CREATE_MASS_INPUT.value),
    radius: Number(CREATE_RADIUS_INPUT.value),
    x: Number(CREATE_X.value),
    y: Number(CREATE_Y.value),
    vx: Number(CREATE_INITIAL_VX.value),
    vy: Number(CREATE_INITIAL_VY.value),
    ax: 0,
    ay: 0,
    createdAt: Date.now(),
    updatedAt: null,
  };

  existing.push(newBody);
  writeBodies(existing);
  renderBodiesList();

  console.log("Body added:", newBody);
  SIDEBAR_CONTENT_CREATE.reset();
});

PICK_POSITION_BUTTON.addEventListener("click", () => {
  pickingMode = true;
  pickingTarget = "create";
  MAIN_CANVAS.classList.add("picking");
  PICK_POSITION_BUTTON.classList.add("picking");
  PICK_POSITION_BUTTON.textContent = "Click the canvas";
});

MAIN_CANVAS.addEventListener("click", (e) => {
  if (!pickingMode) return;

  const rect = MAIN_CANVAS.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);

  if (pickingMode === "create") {
    CREATE_X.value = x;
    CREATE_Y.value = y;
    PICK_POSITION_BUTTON.classList.remove("picking");
    PICK_POSITION_BUTTON.textContent = "Pick on Canvas";
  } else {
    EDIT_X.value = x;
    EDIT_Y.value = y;
    EDIT_PICK_BUTTON.classList.remove("picking");
    EDIT_PICK_BUTTON.textContent = "Pick on Canvas";
  }

  pickingMode = false;
  MAIN_CANVAS.classList.remove("picking");
});

function renderBodiesList() {
  const bodies = readBodies();

  BODIES_COUNT.textContent = bodies.length;

  const existing = SIDEBAR_CONTENT_BODIES.querySelectorAll(".bodiesContainer");
  existing.forEach((e) => e.remove());

  bodies.forEach((body, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "bodiesContainer";
    button.innerHTML = `
            <div class="bodyNumber" style="border-color:${body.color}">${index + 1}</div>
            <span class="bodyName">${body.name}</span>
        `;

    button.addEventListener("click", () => openEditPanel(body.name));
    SIDEBAR_CONTENT_BODIES.appendChild(button);
  });
}

function openEditPanel(bodyName) {
  const bodies = readBodies();
  const found = bodies.find((b) => b.name === bodyName);
  if (!found) return;

  editingBodyName = bodyName;

  EDIT_NAME.value = found.name;
  EDIT_COLOR.value = found.color;
  EDIT_COLOR_INPUT.value = found.color;
  EDIT_MASS_RANGE.value = found.mass;
  EDIT_MASS_INPUT.value = found.mass;
  EDIT_RADIUS_RANGE.value = found.radius;
  EDIT_RADIUS_INPUT.value = found.radius;
  EDIT_VX.value = found.vx;
  EDIT_VY.value = found.vy;
  EDIT_X.value = found.x;
  EDIT_Y.value = found.y;

  SIDEBAR_CONTENT_BODIES.classList.add("hide");
  SIDEBAR_CONTENT_EDIT.classList.remove("hide");
  CREATE_BUTTON.disabled = false;
  BODIES_BUTTON.disabled = false;
}

EDIT_BACK_BUTTON.addEventListener("click", () => {
  SIDEBAR_CONTENT_EDIT.classList.add("hide");
  SIDEBAR_CONTENT_BODIES.classList.remove("hide");
  BODIES_BUTTON.disabled = true;
  editingBodyName = null;
});

// edit

// mass
EDIT_MASS_RANGE.addEventListener("input", () => {
  EDIT_MASS_INPUT.value = EDIT_MASS_RANGE.value;
});
EDIT_MASS_INPUT.addEventListener("input", () => {
  EDIT_MASS_RANGE.value = EDIT_MASS_INPUT.value;
});

//radius
EDIT_RADIUS_RANGE.addEventListener("input", () => {
  EDIT_RADIUS_INPUT.value = EDIT_RADIUS_RANGE.value;
});
EDIT_RADIUS_INPUT.addEventListener("input", () => {
  EDIT_RADIUS_RANGE.value = EDIT_RADIUS_INPUT.value;
});

// color
EDIT_COLOR.addEventListener("input", () => {
  EDIT_COLOR_INPUT.value = EDIT_COLOR.value;
});
EDIT_COLOR_INPUT.addEventListener("input", () => {
  EDIT_COLOR.value = EDIT_COLOR_INPUT.value;
});

EDIT_PICK_BUTTON.addEventListener("click", () => {
  pickingMode = true;
  pickingTarget - "edit";
  MAIN_CANVAS.classList.add("picking");
  EDIT_PICK_BUTTON.classList.add("picking");
  EDIT_PICK_BUTTON.textContent = "Click the canvas";
});

SIDEBAR_CONTENT_EDIT.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!editingBodyName) return;

  const bodies = readBodies();
  const id = bodies.findIndex((b) => b.name === editingBodyName);
  if (id === -1) return;

  const newName = EDIT_NAME.value.trim();

  const isDuplicate = bodies.some(
    (b, i) => i !== id && b.name.toLowerCase() === newName.toLowerCase(),
  );
  if (isDuplicate) {
    EDIT_NAME.style.border = "2px solid red";
    alert(`A body named ${newName} already exists`);
    return;
  }

  bodies[id] = {
    ...bodies[id],
    name: newName,
    color: EDIT_COLOR.value,
    mass: Number(EDIT_MASS_INPUT.value),
    radius: Number(EDIT_RADIUS_INPUT.value),
    vx: Number(EDIT_VX.value),
    vy: Number(EDIT_VY.value),
    x: Number(EDIT_X.value),
    y: Number(EDIT_Y.value),
    updatedAt: Date.now(),
  };

  writeBodies(bodies);
  editingBodyName = newName;
  renderBodiesList();
  alert(`${newName} updated`);
});

EDIT_DELETE_BUTTON.addEventListener("click", () => {
  if (!editingBodyName) return;
  if (!confirm(`Delete ${editingBodyName}?`)) return;

  const bodies = readBodies().filter((b) => b.name !== editingBodyName);
  writeBodies(bodies);

  SIDEBAR_CONTENT_EDIT.classList.add("hide");
  SIDEBAR_CONTENT_BODIES.classList.remove("hide");
  editingBodyName = null;
  renderBodiesList();
});

renderBodiesList();
