# 🌿 HabitFlow - Client Frontend Prototype

HabitFlow is a modern, responsive habit-tracking application built with React, Tailwind CSS, and React Router v6. This repository currently contains the complete client-side architecture featuring global authentication state broadcasting and robust private route guarding.

---

## 🚀 Key Features Implemented

- **Global Auth Context (`AuthContext`)**: Broadcasts the user's login status dynamically across the entire app workspace.
- **Private Route Guard Layout (`Protected`)**: Uses React Router nested layouts and `<Outlet />` wrappers to securely block unauthenticated traffic from reaching private pages.
- **Client Form Validations**: Enhanced registration forms with case-insensitive unique email matching, input field requirements, and automated API delay simulation.
- **User Experience (UX) Enhancements**: Automated 5-second dismiss timers for success indicators alongside manual click-to-dismiss `(X)` notification alerts.

---

## 📂 Project Architecture

```text
src/
├── components/
│   ├── Layout.jsx          # Master skeleton viewport container
│   ├── Navbar.jsx          # Conditional layout navigation anchor
│   └── Protected.jsx       # Nested wrapper route validation guard
├── context/
│   └── AuthContext.jsx     # Global authentication broadcasting station
├── pages/
│   ├── Auth.jsx            # Integrated Login / Sign-Up state screen
│   ├── Dashboard.jsx       # Private metrics landing zone
│   ├── Analytics.jsx       # Progress reporting tracking engine
│   └── MyHabits.jsx        # Core activity creation manager
└── routes/
    └── router.jsx          # Decoupled router dictionary configuration
```

---

## 🛠️ Local Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd habit-tracker
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```


