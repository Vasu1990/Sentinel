# Sentinel Review Dashboard TODO

## Completed Tasks

- [x] **Styling Refactor:** Migrated all components from inline `sx` props to external CSS Modules for improved maintainability.
- [x] **Theming:** Implemented a global MUI theme to standardize application colors, setting the primary color to `#1928a0`.
- [x] **Dev Server Fixes:** Resolved multiple startup issues, including port conflicts and syntax errors in mock data.
- [x] **Main Dashboard UI:**
    - [x] Relocated action buttons (`Review by Attribute`, `Export`) to the main header for better visibility.
    - [x] Made `ItemList` and `AttributeReviewList` rows clickable with a pointer cursor to improve navigation.
- [x] **Item List View:**
    - [x] Adjusted column alignment (Status: right, Total Attributes: center) and increased width for the "Item Name" column.
- [x] **Item Review View:**
    - [x] Redesigned the product details section into a responsive 2-column grid layout.
    - [x] Implemented dynamic data display based on the selected item from the `ItemList`.
    - [x] Replaced the "Mark as Reviewed" button with a more flexible status dropdown (`Unreviewed`, `In Review`, `Reviewed`).
    - [x] Added "Confidence Score" and a conditional "Status" column to the parent attribute row.
    - [x] Refined the layout of the attribute summary row to be tabular and evenly spaced.
    - [x] Added "Grounding Website" and "Grounding Links" to the expanded details section, with conditional rendering for when no data is available.
    - [x] Fixed a critical `ReferenceError` for `filteredAttributes`.
    - [x] Updated the state initialization logic to set `finalValue` to blank by default.
    - [x] Added a visual indicator (check icon) to tabs when all items are reviewed.
- [x] **Attribute List View:**
    - [x] Added a visual indicator (check icon) to each attribute row when reviewed.
- [x] **Attribute Review View:**
    - [x] Refactored the accordion summary to use a `Box` layout for a clean, evenly spaced, multi-column appearance.
    - [x] Ensured "Confidence Score" only appears on the parent row.
    - [x] Added "Grounding Website" and "Grounding Links" to the expanded details section.
- [x] **Initial Bug Fixes & Cleanup:**
    - [x] Fixed a typo in `ItemReviewView.tsx`, changing `Tablevody` to `TableBody`.
- [x] **Resolve Vite Server Errors:**
    - [x] Fix duplicate `CheckCircleIcon` import in `ItemReviewView.tsx`.
    - [x] Fix syntax error (`Unexpected token`) in `ItemReviewView.tsx`.
    - [x] Fix missing file error for `AttributeReviewList.module.css` import in `AttributeReviewList.tsx`.
- [x] **Git Configuration:**
    - [x] Updated `.gitignore` to exclude all `node_modules` directories.

## Pending Tasks

