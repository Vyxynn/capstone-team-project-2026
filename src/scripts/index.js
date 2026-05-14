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
const SIDEBAR_CREATE_SUBMIT_BUTTON = document.getElementById(
    "sidebarCreateSubmitButton",
);

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

    const formData = {
        name: CREATE_NAME.value,
        color: CREATE_COLOR.value,
        mass: Number(CREATE_MASS_INPUT.value),
        radius: Number(CREATE_RADIUS_INPUT.value),
        vx: Number(CREATE_INITIAL_VX.value),
        vy: Number(CREATE_INITIAL_VY.value),
    };

    console.log("valid form");
});
