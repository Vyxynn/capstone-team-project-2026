// /src/scripts/index.js

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

// sidebar create elements

// sidebar tab buttons
CREATE_BUTTON.addEventListener("click", () => {
    SIDEBAR_CONTENT_CREATE.classList.remove("hide");
    SIDEBAR_CONTENT_BODIES.classList.add("hide");

    CREATE_BUTTON.disabled = true;
    BODIES_BUTTON.disabled = false;
});

BODIES_BUTTON.addEventListener("click", () => {
    SIDEBAR_CONTENT_BODIES.classList.remove("hide");
    SIDEBAR_CONTENT_CREATE.classList.add("hide");

    BODIES_BUTTON.disabled = true;
    CREATE_BUTTON.disabled = false;
});
