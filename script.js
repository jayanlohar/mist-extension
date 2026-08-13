/* =========================================================
   DEFAULT SHORTCUTS
========================================================= */

const defaultShortcuts = [

  {
    name: "YouTube",
    url: "https://www.youtube.com",
    icon:
      "https://www.google.com/s2/favicons?domain=youtube.com&sz=64"
  },

  {
    name: "Gmail",
    url: "https://mail.google.com",
    icon:
      "https://www.google.com/s2/favicons?domain=gmail.com&sz=64"
  },

  {
    name: "Google Drive",
    url: "https://drive.google.com",
    icon:
      "https://www.google.com/s2/favicons?domain=drive.google.com&sz=64"
  },

  {
    name: "GitHub",
    url: "https://github.com",
    icon:
      "https://www.google.com/s2/favicons?domain=github.com&sz=64"
  }

];


/* =========================================================
   STORAGE KEYS
========================================================= */

const SHORTCUTS_KEY =
  "custom_google_shortcuts_v2";

const GLOW_KEY =
  "new_tab_ambient_glow";

const ANIMATION_KEY =
  "new_tab_fluid_animation";

const PROFILE_KEY =
  "mist_google_profile_v1";


/* =========================================================
   ELEMENTS
========================================================= */

/* Main */

const clock =
  document.getElementById(
    "clock"
  );

const dateElement =
  document.getElementById(
    "date"
  );

const greeting =
  document.getElementById(
    "greeting"
  );


/* Search */

const searchForm =
  document.getElementById(
    "search-form"
  );

const searchInput =
  document.getElementById(
    "search-input"
  );

const micBtn =
  document.getElementById(
    "mic-btn"
  );

const lensBtn =
  document.getElementById(
    "lens-btn"
  );


/* Shortcuts */

const shortcutsGrid =
  document.getElementById(
    "shortcuts-grid"
  );


/* Profile */

const profileBtn =
  document.getElementById(
    "profile-btn"
  );

const profileCard =
  document.getElementById(
    "profile-card"
  );

const profileAvatar =
  document.getElementById(
    "profile-avatar"
  );

const profileImage =
  document.getElementById(
    "profile-image"
  );

const profileAvatarLarge =
  document.getElementById(
    "profile-avatar-large"
  );

const profileImageLarge =
  document.getElementById(
    "profile-image-large"
  );

const profileName =
  document.getElementById(
    "profile-name"
  );

const profileEmail =
  document.getElementById(
    "profile-email"
  );

const profileStatusLabelText =
  document.getElementById(
    "profile-status-label-text"
  );

const manageAccountBtn =
  document.getElementById(
    "manage-account-btn"
  );

const manageAccountText =
  document.getElementById(
    "manage-account-text"
  );

const profileHistory =
  document.getElementById(
    "profile-history"
  );

const profilePasswords =
  document.getElementById(
    "profile-passwords"
  );

const profilePersonalize =
  document.getElementById(
    "profile-personalize"
  );

const signOutBtn =
  document.getElementById(
    "sign-out-btn"
  );

const syncDot =
  document.getElementById(
    "sync-dot"
  );

const syncText =
  document.getElementById(
    "sync-text"
  );

const syncStatus =
  document.getElementById(
    "sync-status"
  );


/* Settings */

const settingsBtn =
  document.getElementById(
    "settings-btn"
  );

const settingsPanel =
  document.getElementById(
    "settings-panel"
  );

const settingsClose =
  document.getElementById(
    "settings-close"
  );

const toggleGlow =
  document.getElementById(
    "toggle-glow"
  );

const toggleAnimation =
  document.getElementById(
    "toggle-animation"
  );

const glowToggle =
  document.getElementById(
    "glow-toggle"
  );

const animationToggle =
  document.getElementById(
    "animation-toggle"
  );

const settingsReset =
  document.getElementById(
    "settings-reset"
  );


/* Modal */

const modalOverlay =
  document.getElementById(
    "modal-overlay"
  );

const modalTitle =
  document.getElementById(
    "modal-title"
  );

const modalClose =
  document.getElementById(
    "modal-close"
  );

const modalCancel =
  document.getElementById(
    "modal-cancel"
  );

const modalSave =
  document.getElementById(
    "modal-save"
  );

const modalDelete =
  document.getElementById(
    "modal-delete"
  );

const shortcutName =
  document.getElementById(
    "shortcut-name"
  );

const shortcutUrl =
  document.getElementById(
    "shortcut-url"
  );


/* Toast */

const toast =
  document.getElementById(
    "toast"
  );

const toastMessage =
  document.getElementById(
    "toast-message"
  );


/* Mac */

const macClose =
  document.getElementById(
    "mac-close"
  );

const macMinimize =
  document.getElementById(
    "mac-minimize"
  );

const macMaximize =
  document.getElementById(
    "mac-maximize"
  );


/* =========================================================
   STATE
========================================================= */

let shortcuts =
  loadShortcuts();

let editingIndex =
  null;

let toastTimer =
  null;


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

  const now =
    new Date();


  let hours =
    now.getHours();


  const minutes =
    String(
      now.getMinutes()
    ).padStart(
      2,
      "0"
    );


  const period =
    hours >= 12
      ? "PM"
      : "AM";


  hours =
    hours % 12 || 12;


  clock.textContent =
    `${String(hours).padStart(
      2,
      "0"
    )}:${minutes} ${period}`;


  dateElement.textContent =
    now.toLocaleDateString(
      undefined,
      {
        weekday:
          "long",

        month:
          "long",

        day:
          "numeric"
      }
    );


  const currentHour =
    now.getHours();


  if (
    currentHour < 5
  ) {

    greeting.textContent =
      "Still awake?";

  } else if (
    currentHour < 12
  ) {

    greeting.textContent =
      "Good morning";

  } else if (
    currentHour < 17
  ) {

    greeting.textContent =
      "Good afternoon";

  } else if (
    currentHour < 21
  ) {

    greeting.textContent =
      "Good evening";

  } else {

    greeting.textContent =
      "Good night";

  }

}


updateClock();


setInterval(
  updateClock,
  1000
);


/* =========================================================
   SHORTCUT STORAGE
========================================================= */

function loadShortcuts() {

  try {

    const stored =
      localStorage.getItem(
        SHORTCUTS_KEY
      );


    if (!stored) {

      return [
        ...defaultShortcuts
      ];

    }


    const parsed =
      JSON.parse(
        stored
      );


    if (
      !Array.isArray(
        parsed
      )
    ) {

      return [
        ...defaultShortcuts
      ];

    }


    return parsed;

  } catch (error) {

    console.error(
      "Could not load shortcuts:",
      error
    );


    return [
      ...defaultShortcuts
    ];

  }

}


function saveShortcuts() {

  try {

    localStorage.setItem(
      SHORTCUTS_KEY,
      JSON.stringify(
        shortcuts
      )
    );

  } catch (error) {

    console.error(
      "Could not save shortcuts:",
      error
    );

  }

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
  message
) {

  if (
    !toast ||
    !toastMessage
  ) {

    return;

  }


  toastMessage.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      1800
    );

}


/* =========================================================
   GET DOMAIN
========================================================= */

function getDomain(
  url
) {

  try {

    return new URL(
      url
    ).hostname;

  } catch {

    return url
      .replace(
        /^https?:\/\//i,
        ""
      )
      .split(
        "/"
      )[0];

  }

}


/* =========================================================
   GITHUB ICON
========================================================= */

function createGitHubIcon() {

  const svg =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );


  svg.setAttribute(
    "viewBox",
    "0 0 24 24"
  );


  svg.classList.add(
    "github-mark"
  );


  const path =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );


  path.setAttribute(
    "d",
    `
      M12 .5
      A11.5 11.5 0 0 0
      8.36 22.91
      c.58.1.79-.25.79-.55
      v-1.94
      c-3.23.7-3.91-1.37-3.91-1.37
      -.53-1.35-1.3-1.71-1.3-1.71
      -1.06-.72.08-.71.08-.71
      1.17.08 1.79 1.2
      1.79 1.2
      1.04 1.78 2.73 1.27
      3.4.97
      .1-.75.41-1.27.74-1.56
      -2.58-.29-5.29-1.29
      -5.29-5.74
      0-1.27.45-2.31
      1.19-3.12
      -.12-.29-.52-1.47.11-3.07
      0 0 .97-.31 3.18 1.19
      .92-.25 1.91-.37
      2.9-.37
      .98 0 1.97.13 2.89.37
      2.2-1.5 3.17-1.19
      3.17-1.19
      .64 1.6.24 2.78.12 3.07
      .74.81 1.19 1.85
      1.19 3.12
      0 4.46-2.71 5.45
      -5.3 5.73
      .42.36.8 1.07.8 2.16
      v3.2
      c0 .3.21.66.8.55
      A11.5 11.5 0 0 0 12 .5z
    `
  );


  svg.appendChild(
    path
  );


  return svg;

}


/* =========================================================
   SHORTCUT ICON
========================================================= */

function createShortcutIcon(
  item
) {

  const wrapper =
    document.createElement(
      "div"
    );


  wrapper.className =
    "shortcut-icon";


  const isGitHub =
    item.name
      .toLowerCase()
      .includes(
        "github"
      ) ||
    item.url
      .toLowerCase()
      .includes(
        "github.com"
      );


  if (
    isGitHub
  ) {

    wrapper.appendChild(
      createGitHubIcon()
    );


    return wrapper;

  }


  const img =
    document.createElement(
      "img"
    );


  img.src =
    item.icon;


  img.alt =
    "";


  img.loading =
    "lazy";


  img.onerror =
    () => {

      img.remove();


      const fallback =
        document.createElement(
          "span"
        );


      fallback.textContent =
        item.name
          .charAt(0)
          .toUpperCase();


      fallback.style.fontSize =
        "18px";


      fallback.style.fontWeight =
        "700";


      fallback.style.color =
        "#ffffff";


      wrapper.appendChild(
        fallback
      );

    };


  wrapper.appendChild(
    img
  );


  return wrapper;

}


/* =========================================================
   RENDER SHORTCUTS
========================================================= */

function renderShortcuts() {

  if (
    !shortcutsGrid
  ) {

    return;

  }


  shortcutsGrid.innerHTML =
    "";


  shortcuts.forEach(
    (item, index) => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        "shortcut-item";


      card.title =
        `Open ${item.name}`;


      const icon =
        createShortcutIcon(
          item
        );


      card.appendChild(
        icon
      );


      const title =
        document.createElement(
          "span"
        );


      title.textContent =
        item.name;


      card.appendChild(
        title
      );


      const menuButton =
        document.createElement(
          "button"
        );


      menuButton.className =
        "shortcut-menu-btn";


      menuButton.type =
        "button";


      menuButton.title =
        "Edit shortcut";


      menuButton.setAttribute(
        "aria-label",
        `Edit ${item.name}`
      );


      menuButton.innerHTML = `
        <svg viewBox="0 0 24 24">

          <circle
            cx="5"
            cy="12"
            r="1.7"
          ></circle>

          <circle
            cx="12"
            cy="12"
            r="1.7"
          ></circle>

          <circle
            cx="19"
            cy="12"
            r="1.7"
          ></circle>

        </svg>
      `;


      menuButton.addEventListener(
        "click",
        event => {

          event.stopPropagation();


          openEditModal(
            index
          );

        }
      );


      card.appendChild(
        menuButton
      );


      card.addEventListener(
        "click",
        () => {

          window.open(
            item.url,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );


      shortcutsGrid.appendChild(
        card
      );

    }
  );


  /*
    Keep Add Shortcut centered with the cards.
  */

  if (
    shortcuts.length < 8
  ) {

    const addCard =
      document.createElement(
        "div"
      );


    addCard.className =
      "shortcut-item add-shortcut";


    addCard.title =
      "Add shortcut";


    addCard.innerHTML = `
      <div class="shortcut-icon">

        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >

          <path d="
            M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z
          "/>

        </svg>

      </div>


      <span>
        Add shortcut
      </span>
    `;


    addCard.addEventListener(
      "click",
      openAddModal
    );


    shortcutsGrid.appendChild(
      addCard
    );

  }

}


renderShortcuts();


/* =========================================================
   SEARCH
========================================================= */

searchForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const query =
      searchInput.value.trim();


    if (
      !query
    ) {

      searchInput.focus();

      return;

    }


    const looksLikeUrl =
      /^(https?:\/\/)/i.test(
        query
      ) ||
      /^[\w-]+\.[\w.-]+/.test(
        query
      );


    if (
      looksLikeUrl
    ) {

      let url =
        query;


      if (
        !/^https?:\/\//i.test(
          url
        )
      ) {

        url =
          `https://${url}`;

      }


      window.location.href =
        url;


      return;

    }


    window.location.href =
      `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;

  }
);


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "/" &&
      document.activeElement !==
        searchInput
    ) {

      event.preventDefault();

      searchInput.focus();

    }


    if (
      event.key.toLowerCase() === "k" &&
      (
        event.ctrlKey ||
        event.metaKey
      )
    ) {

      event.preventDefault();

      searchInput.focus();

    }


    if (
      event.key === "Escape"
    ) {

      closeProfile();

      closeSettings();

      closeModal();

    }

  }
);


/* =========================================================
   VOICE
========================================================= */

micBtn.addEventListener(
  "click",
  () => {

    searchInput.focus();


    searchInput.placeholder =
      "Listening...";


    micBtn.classList.add(
      "active"
    );


    setTimeout(
      () => {

        searchInput.placeholder =
          "Search Google or type a URL...";


        micBtn.classList.remove(
          "active"
        );

      },
      1800
    );

  }
);


/* =========================================================
   LENS
========================================================= */

lensBtn.addEventListener(
  "click",
  () => {

    window.open(
      "https://lens.google.com",
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* =========================================================
   PROFILE HELPERS
========================================================= */

function resetProfileUI() {

  profileCard.dataset.signedIn =
    "false";


  /* Letter */

  profileAvatar.textContent =
    "?";

  profileAvatar.classList.remove(
    "hidden"
  );


  profileAvatarLarge.textContent =
    "?";

  profileAvatarLarge.classList.remove(
    "hidden"
  );


  /* Images */

  profileImage.src =
    "";

  profileImage.classList.add(
    "hidden"
  );


  profileImageLarge.src =
    "";

  profileImageLarge.classList.add(
    "hidden"
  );


  /* Text */

  profileName.textContent =
    "Not signed in";


  profileEmail.textContent =
    "Sign in with Google";


  profileStatusLabelText.textContent =
    "Not signed in";


  manageAccountText.textContent =
    "Sign in with Google";


  manageAccountBtn.classList.add(
    "auth-login"
  );


  manageAccountBtn.disabled =
    false;


  /* State */

  syncText.textContent =
    "Local profile";


  syncStatus.textContent =
    "Ready";


  syncDot.style.background =
    "#718096";


  syncDot.style.boxShadow =
    "none";

}


function displayGoogleProfile(
  profile
) {

  if (
    !profile
  ) {

    resetProfileUI();

    return;

  }


  const fullName =
    profile.name ||
    profile.given_name ||
    "Google User";


  const firstName =
    profile.given_name ||
    fullName
      .trim()
      .split(
        /\s+/
      )[0] ||
    "G";


  const firstLetter =
    firstName
      .charAt(0)
      .toUpperCase();


  const email =
    profile.email ||
    "Google Account";


  /* ---------------------------------------------
     Letter
  ---------------------------------------------- */

  profileAvatar.textContent =
    firstLetter;


  profileAvatarLarge.textContent =
    firstLetter;


  profileAvatar.classList.remove(
    "hidden"
  );


  profileAvatarLarge.classList.remove(
    "hidden"
  );


  /* ---------------------------------------------
     Name
  ---------------------------------------------- */

  profileName.textContent =
    fullName;


  /* ---------------------------------------------
     Email
  ---------------------------------------------- */

  profileEmail.textContent =
    email;


  profileEmail.title =
    email;


  /* ---------------------------------------------
     Signed-in state
  ---------------------------------------------- */

  profileCard.dataset.signedIn =
    "true";


  profileStatusLabelText.textContent =
    "Active";


  manageAccountText.textContent =
    "Manage your Google Account";


  manageAccountBtn.classList.remove(
    "auth-login"
  );


  manageAccountBtn.disabled =
    false;


  /* ---------------------------------------------
     Account state
  ---------------------------------------------- */

  syncText.textContent =
    "Google account";


  syncStatus.textContent =
    "Connected";


  syncDot.style.background =
    "#34a853";


  syncDot.style.boxShadow =
    "0 0 8px rgba(52,168,83,.55)";


  /* ---------------------------------------------
     Profile picture
  ---------------------------------------------- */

  if (
    profile.picture
  ) {

    profileImage.src =
      profile.picture;


    profileImage.classList.remove(
      "hidden"
    );


    profileAvatar.classList.add(
      "hidden"
    );


    profileImageLarge.src =
      profile.picture;


    profileImageLarge.classList.remove(
      "hidden"
    );


    profileAvatarLarge.classList.add(
      "hidden"
    );


    profileImage.onerror =
      () => {

        profileImage.classList.add(
          "hidden"
        );


        profileAvatar.classList.remove(
          "hidden"
        );

      };


    profileImageLarge.onerror =
      () => {

        profileImageLarge.classList.add(
          "hidden"
        );


        profileAvatarLarge.classList.remove(
          "hidden"
        );

      };

  }

}


/* =========================================================
   GOOGLE PROFILE STORAGE
========================================================= */

async function loadGoogleProfile() {

  try {

    const result =
      await chrome.storage.local.get(
        PROFILE_KEY
      );


    return (
      result[PROFILE_KEY] ||
      null
    );

  } catch (error) {

    console.error(
      "Could not load Google profile:",
      error
    );


    return null;

  }

}


async function saveGoogleProfile(
  profile
) {

  try {

    await chrome.storage.local.set({

      [PROFILE_KEY]:
        profile

    });

  } catch (error) {

    console.error(
      "Could not save Google profile:",
      error
    );

  }

}


async function removeGoogleProfile() {

  try {

    await chrome.storage.local.remove(
      PROFILE_KEY
    );

  } catch (error) {

    console.error(
      "Could not remove Google profile:",
      error
    );

  }

}


/* =========================================================
   GOOGLE USERINFO
========================================================= */

async function fetchGoogleUserInfo(
  accessToken
) {

  const response =
    await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        method:
          "GET",

        headers:
          {
            Authorization:
              `Bearer ${accessToken}`
          }
      }
    );


  if (
    !response.ok
  ) {

    throw new Error(
      `Google UserInfo request failed: ${response.status}`
    );

  }


  return response.json();

}


/* =========================================================
   GOOGLE SIGN-IN
========================================================= */

async function signInWithGoogle() {

  if (
    typeof chrome === "undefined" ||
    !chrome.identity
  ) {

    showToast(
      "Google sign-in only works inside the Mist extension."
    );


    return;

  }


  manageAccountBtn.disabled =
    true;


  manageAccountText.textContent =
    "Signing in...";


  manageAccountText.classList.add(
    "profile-auth-loading"
  );


  try {

    /*
      IMPORTANT:

      interactive:true is called only from the
      user's click on the Sign in button.
    */

    const tokenResult =
      await chrome.identity.getAuthToken(
        {
          interactive:
            true
        }
      );


    const accessToken =
      tokenResult?.token;


    if (
      !accessToken
    ) {

      throw new Error(
        "No OAuth token received."
      );

    }


    let profile;


    try {

      profile =
        await fetchGoogleUserInfo(
          accessToken
        );

    } catch (error) {

      /*
        If Chrome gave us an expired/invalid
        cached token, remove that token and
        retry once.
      */

      await chrome.identity.removeCachedAuthToken(
        {
          token:
            accessToken
        }
      );


      const retryResult =
        await chrome.identity.getAuthToken(
          {
            interactive:
              true
          }
        );


      const retryToken =
        retryResult?.token;


      if (
        !retryToken
      ) {

        throw error;

      }


      profile =
        await fetchGoogleUserInfo(
          retryToken
        );

    }


    if (
      !profile ||
      !profile.sub
    ) {

      throw new Error(
        "Google profile is missing the account ID."
      );

    }


    /*
      Save only what Mist actually needs.

      "sub" is the stable Google account identifier.
    */

    const safeProfile = {

      sub:
        profile.sub || "",

      name:
        profile.name || "",

      given_name:
        profile.given_name || "",

      family_name:
        profile.family_name || "",

      email:
        profile.email || "",

      picture:
        profile.picture || "",

      email_verified:
        Boolean(
          profile.email_verified
        )

    };


    await saveGoogleProfile(
      safeProfile
    );


    displayGoogleProfile(
      safeProfile
    );


    showToast(
      `Welcome, ${safeProfile.given_name || safeProfile.name || "Google user"}`
    );


  } catch (error) {

    console.error(
      "Google sign-in failed:",
      error
    );


    resetProfileUI();


    showToast(
      "Google sign-in failed. Check OAuth setup."
    );

  } finally {

    manageAccountText.classList.remove(
      "profile-auth-loading"
    );


    manageAccountBtn.disabled =
      false;

  }

}


/* =========================================================
   GOOGLE SIGN-OUT
========================================================= */

async function signOutGoogle() {

  try {

    await removeGoogleProfile();


    /*
      Clear Chrome identity's cached OAuth
      tokens and account preferences.
    */

    if (
      chrome.identity
    ) {

      await chrome.identity.clearAllCachedAuthTokens();

    }


    resetProfileUI();

    closeProfile();


    showToast(
      "Signed out of Mist"
    );


  } catch (error) {

    console.error(
      "Google sign-out failed:",
      error
    );


    showToast(
      "Could not sign out. Try again."
    );

  }

}


/* =========================================================
   PROFILE OPEN / CLOSE
========================================================= */

function openProfile() {

  closeSettings();


  profileCard.classList.remove(
    "hidden"
  );


  profileBtn.setAttribute(
    "aria-expanded",
    "true"
  );

}


function closeProfile() {

  profileCard.classList.add(
    "hidden"
  );


  profileBtn.setAttribute(
    "aria-expanded",
    "false"
  );

}


/* =========================================================
   PROFILE BUTTON
========================================================= */

profileBtn.addEventListener(
  "click",
  async event => {

    event.stopPropagation();


    const isHidden =
      profileCard.classList.contains(
        "hidden"
      );


    if (!isHidden) {

      closeProfile();

      return;

    }


    openProfile();


    const profile =
      await loadGoogleProfile();


    if (
      profile
    ) {

      displayGoogleProfile(
        profile
      );

    } else {

      resetProfileUI();

    }

  }
);


profileCard.addEventListener(
  "click",
  event => {

    event.stopPropagation();

  }
);


/* =========================================================
   MANAGE ACCOUNT / SIGN-IN
========================================================= */

manageAccountBtn.addEventListener(
  "click",
  async event => {

    event.stopPropagation();


    const profile =
      await loadGoogleProfile();


    if (
      !profile
    ) {

      await signInWithGoogle();

      return;

    }


    window.open(
      "https://myaccount.google.com",
      "_blank",
      "noopener,noreferrer"
    );

  }
);


/* =========================================================
   QUICK ACTIONS
========================================================= */

profileHistory.addEventListener(
  "click",
  () => {

    window.open(
      "https://myactivity.google.com",
      "_blank",
      "noopener,noreferrer"
    );

  }
);


profilePasswords.addEventListener(
  "click",
  () => {

    window.open(
      "https://passwords.google.com",
      "_blank",
      "noopener,noreferrer"
    );

  }
);


profilePersonalize.addEventListener(
  "click",
  () => {

    closeProfile();

    openSettings();

  }
);


/* =========================================================
   SIGN OUT BUTTON
========================================================= */

signOutBtn.addEventListener(
  "click",
  async event => {

    event.stopPropagation();

    await signOutGoogle();

  }
);


/* =========================================================
   INITIAL PROFILE
========================================================= */

(async function initializeProfile() {

  try {

    const profile =
      await loadGoogleProfile();


    if (
      profile
    ) {

      displayGoogleProfile(
        profile
      );

    } else {

      resetProfileUI();

    }

  } catch (error) {

    console.error(
      "Profile initialization failed:",
      error
    );


    resetProfileUI();

  }

})();


/* =========================================================
   SETTINGS
========================================================= */

function openSettings() {

  closeProfile();


  settingsPanel.classList.remove(
    "hidden"
  );


  settingsBtn.classList.add(
    "active"
  );

}


function closeSettings() {

  settingsPanel.classList.add(
    "hidden"
  );


  settingsBtn.classList.remove(
    "active"
  );

}


settingsBtn.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    const hidden =
      settingsPanel.classList.contains(
        "hidden"
      );


    if (
      hidden
    ) {

      openSettings();

    } else {

      closeSettings();

    }

  }
);


settingsClose.addEventListener(
  "click",
  closeSettings
);


settingsPanel.addEventListener(
  "click",
  event => {

    event.stopPropagation();

  }
);


document.addEventListener(
  "click",
  () => {

    closeProfile();

    closeSettings();

  }
);


/* =========================================================
   GLOW SETTINGS
========================================================= */

let glowEnabled =
  localStorage.getItem(
    GLOW_KEY
  ) !== "false";


function updateGlow() {

  glowToggle.classList.toggle(
    "active",
    glowEnabled
  );


  document.body.classList.toggle(
    "glow-disabled",
    !glowEnabled
  );

}


updateGlow();


toggleGlow.addEventListener(
  "click",
  () => {

    glowEnabled =
      !glowEnabled;


    localStorage.setItem(
      GLOW_KEY,
      String(
        glowEnabled
      )
    );


    updateGlow();

  }
);


/* =========================================================
   ANIMATION SETTINGS
========================================================= */

let animationsEnabled =
  localStorage.getItem(
    ANIMATION_KEY
  ) !== "false";


function updateAnimations() {

  animationToggle.classList.toggle(
    "active",
    animationsEnabled
  );


  document.body.classList.toggle(
    "animation-disabled",
    !animationsEnabled
  );

}


updateAnimations();


toggleAnimation.addEventListener(
  "click",
  () => {

    animationsEnabled =
      !animationsEnabled;


    localStorage.setItem(
      ANIMATION_KEY,
      String(
        animationsEnabled
      )
    );


    updateAnimations();

  }
);


/* =========================================================
   RESET SHORTCUTS
========================================================= */

settingsReset.addEventListener(
  "click",
  () => {

    shortcuts =
      defaultShortcuts.map(
        item => ({
          ...item
        })
      );


    saveShortcuts();

    renderShortcuts();

    closeSettings();


    showToast(
      "Shortcuts restored"
    );

  }
);


/* =========================================================
   MODAL
========================================================= */

function openAddModal() {

  editingIndex =
    null;


  modalTitle.textContent =
    "Add Shortcut";


  shortcutName.value =
    "";


  shortcutUrl.value =
    "";


  modalDelete.classList.add(
    "hidden"
  );


  modalOverlay.classList.remove(
    "hidden"
  );


  setTimeout(
    () => {

      shortcutName.focus();

    },
    50
  );

}


function openEditModal(
  index
) {

  const item =
    shortcuts[index];


  if (
    !item
  ) {

    return;

  }


  editingIndex =
    index;


  modalTitle.textContent =
    "Edit Shortcut";


  shortcutName.value =
    item.name;


  shortcutUrl.value =
    item.url;


  modalDelete.classList.remove(
    "hidden"
  );


  modalOverlay.classList.remove(
    "hidden"
  );


  setTimeout(
    () => {

      shortcutName.focus();

    },
    50
  );

}


function closeModal() {

  modalOverlay.classList.add(
    "hidden"
  );


  editingIndex =
    null;

}


modalClose.addEventListener(
  "click",
  closeModal
);


modalCancel.addEventListener(
  "click",
  closeModal
);


modalOverlay.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      modalOverlay
    ) {

      closeModal();

    }

  }
);


/* =========================================================
   SAVE SHORTCUT
========================================================= */

modalSave.addEventListener(
  "click",
  () => {

    const name =
      shortcutName.value.trim();


    let url =
      shortcutUrl.value.trim();


    if (
      !name
    ) {

      shortcutName.focus();

      return;

    }


    if (
      !url
    ) {

      shortcutUrl.focus();

      return;

    }


    if (
      !/^https?:\/\//i.test(
        url
      )
    ) {

      url =
        `https://${url}`;

    }


    const domain =
      getDomain(
        url
      );


    const icon =
      `https://www.google.com/s2/favicons?domain=${encodeURIComponent(
        domain
      )}&sz=64`;


    const newShortcut = {

      name,

      url,

      icon

    };


    if (
      editingIndex === null
    ) {

      shortcuts.push(
        newShortcut
      );


      showToast(
        "Shortcut added"
      );

    } else {

      shortcuts[
        editingIndex
      ] =
        newShortcut;


      showToast(
        "Shortcut updated"
      );

    }


    saveShortcuts();

    renderShortcuts();

    closeModal();

  }
);


/* =========================================================
   DELETE SHORTCUT
========================================================= */

modalDelete.addEventListener(
  "click",
  () => {

    if (
      editingIndex === null
    ) {

      return;

    }


    shortcuts.splice(
      editingIndex,
      1
    );


    saveShortcuts();

    renderShortcuts();

    closeModal();


    showToast(
      "Shortcut deleted"
    );

  }
);


/* =========================================================
   MODAL ENTER
========================================================= */

shortcutName.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      shortcutUrl.focus();

    }

  }
);


shortcutUrl.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      event.preventDefault();

      modalSave.click();

    }

  }
);


/* =========================================================
   MAC CONTROLS
========================================================= */

macClose.addEventListener(
  "click",
  () => {

    document.body.animate(
      [
        {
          opacity: 1,
          transform: "scale(1)"
        },

        {
          opacity: 0,
          transform: "scale(.98)"
        }
      ],
      {
        duration: 300,
        easing:
          "ease"
      }
    );

  }
);


macMinimize.addEventListener(
  "click",
  () => {

    document.body.animate(
      [
        {
          transform:
            "translateY(0)"
        },

        {
          transform:
            "translateY(8px)"
        },

        {
          transform:
            "translateY(0)"
        }
      ],
      {
        duration: 350,

        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }
    );

  }
);


macMaximize.addEventListener(
  "click",
  async () => {

    try {

      if (
        document.fullscreenElement
      ) {

        await document.exitFullscreen();

      } else {

        await document.documentElement.requestFullscreen();

      }

    } catch (error) {

      console.log(
        "Fullscreen is not available:",
        error
      );

    }

  }
);


/* =========================================================
   INITIAL SEARCH FOCUS
========================================================= */

window.addEventListener(
  "load",
  () => {

    setTimeout(
      () => {

        searchInput.focus();

      },
      350
    );

  }
);