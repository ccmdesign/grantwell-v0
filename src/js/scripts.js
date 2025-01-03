document.addEventListener("DOMContentLoaded", function () {
  // Function to open the dialog
  function openDialog(event) {
    const targetId = event.target.getAttribute("modal-target");
    const dialog = document.getElementById(targetId);
    if (dialog) {
      dialog.setAttribute("open", "open");
    }
  }

  // Function to close the dialog
  function closeDialog(event) {
    const dialog = event.target.closest("dialog");
    if (dialog) {
      dialog.removeAttribute("open");
    }
  }

  // Add event listeners to buttons with the modal-target attribute
  const modalButtons = document.querySelectorAll("button[modal-target]");
  modalButtons.forEach((button) => {
    button.addEventListener("click", openDialog);
  });

  // Add event listeners to close buttons inside dialogs
  const closeButtons = document.querySelectorAll("dialog button[modal-close]");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeDialog);
  });
});

// Function to toggle aria attribute for visibility
function toggleAriaVisibility(event) {
  const targetId = event.target.getAttribute("trigger-for");
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const isVisible = targetElement.getAttribute("aria-hidden") === "true";
    targetElement.setAttribute("aria-hidden", isVisible ? "false" : "true");
  }
}

// Add event listeners to elements with the trigger-for attribute
const triggerElements = document.querySelectorAll("[trigger-for]");
triggerElements.forEach((element) => {
  element.addEventListener("click", toggleAriaVisibility);
});

/////////////////////////////////////
// GEMS MENU AND SIDEBAR FUNCTIONS //
/////////////////////////////////////

function handleGemTriggerClick(event) {
  // Set all elements with [gem-trigger-for] to 'aria-active="false"'
  const gemTriggerElements = document.querySelectorAll("[gem-trigger-for]");
  gemTriggerElements.forEach((element) => {
    element.setAttribute("aria-active", "false");
  });

  // Set the clicked button with 'aria-active="true"'
  event.target.setAttribute("aria-active", "true");

  // Set all elements under #gems-sidebar-menu to aria-hidden="true"
  const gemsSidebarMenuElements = document.querySelectorAll(
    "[gems-sidebar-content]"
  );
  gemsSidebarMenuElements.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });

  // Find an element with an id equal to the value from the 'gem-trigger-for' value, and set it to 'aria-hidden="false"'
  const targetId = event.target.getAttribute("gem-trigger-for");
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.setAttribute("aria-hidden", "false");

    // Check if any of #gems-sidebar-menu children has aria-hidden="false"
    const gemsSidebarMenuElements = document.querySelectorAll(
      "[gems-sidebar-content]"
    );
    const anyVisible = Array.from(gemsSidebarMenuElements).some(
      (element) => element.getAttribute("aria-hidden") === "false"
    );

    // If any child is visible, set #sidebar-left to aria-hidden="false"
    if (anyVisible) {
      const sidebarLeft = document.getElementById("sidebar-left");
      if (sidebarLeft) {
        sidebarLeft.setAttribute("aria-hidden", "false");
      }
    }
  }
}

// Add event listeners to elements with the gem-trigger-for attribute
const gemTriggerElements = document.querySelectorAll("[gem-trigger-for]");
gemTriggerElements.forEach((element) => {
  element.addEventListener("click", handleGemTriggerClick);
});

function handleCloseGemsSidebarClick() {
  // Set all elements under #gems-sidebar-menu to aria-hidden="true"
  const gemsSidebarMenuElements = document.querySelectorAll(
    "[gems-sidebar-content]"
  );

  gemsSidebarMenuElements.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });

  // Set #sidebar-left to aria-hidden="true"
  const sidebarLeft = document.getElementById("sidebar-left");
  if (sidebarLeft) {
    sidebarLeft.setAttribute("aria-hidden", "true");
  }
}

// Add event listeners to elements with the close-gems-sidebar attribute
const closeGemsSidebarElements = document.querySelectorAll(
  "[close-gems-sidebar]"
);
closeGemsSidebarElements.forEach((element) => {
  element.addEventListener("click", handleCloseGemsSidebarClick);
});

function activateMicrophone() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        console.log("Microphone activated");
        // You can add additional logic here to handle the audio stream
      })
      .catch(function (err) {
        console.error("Error accessing the microphone: ", err);
      });
  } else {
    console.error("getUserMedia not supported on your browser!");
  }
}

const dockGravarButton = document.getElementById("dock-gravar");
if (dockGravarButton) {
  dockGravarButton.addEventListener("click", activateMicrophone);
}
