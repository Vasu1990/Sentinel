# Sentinel Review Dashboard: Implementation Todo List

This document outlines the development tasks required to build the Sentinel Review Dashboard, broken down by phase.

---

## Phase 1: Project Setup & Backend Foundation

- [x] **Project Initialization**
    - [x] Initialize a new Tauri project with the React (TypeScript) template.
    - [x] Configure `tauri.conf.json` with application details (name, version, permissions).
    - [x] Install frontend dependencies: `@mui/material`, `@mui/x-data-grid`, `react-router-dom`.
    - [ ] Add Rust dependencies for SQLite (`rusqlite`) and CSV parsing (`csv`) to `Cargo.toml`.
- [ ] **Database Layer**
    - [ ] Create a Rust module (`database.rs`) to manage the SQLite connection.
    - [ ] Implement a Tauri command (`init_database`) to create the `product_attributes` table on app startup.

---

## Phase 2: Data Ingestion & Main Dashboard

- [ ] **Data Ingestion**
    - [ ] Create a Tauri command (`ingest_csv`) that accepts a file path.
    - [ ] Implement the ingestion pipeline in `ingest_csv`:
        - [ ] Clear the `product_attributes` table.
        - [ ] Parse the CSV file.
        - [ ] Perform a bulk transactional load into SQLite.
        - [ ] Set `review_status` to `UNREVIEWED` for all records.
    - [ ] Create the three mandatory indexes (`item_id`, `review_status`, `attribute_display_name`) immediately after data import.
    - [x] Create the `CsvUploader` React component with file type validation.
    - [x] Connect the `CsvUploader` component to the `ingest_csv` Tauri command.
- [x] **Summary Dashboard UI**
    - [ ] Create a Tauri command (`get_summary_stats`) to fetch review counts.
    - [ ] Create a Tauri command (`get_item_list`) to fetch the main list of unique items.
    - [x] Build the `MainView` React component.
    - [ ] Build the `Attribute Review` cta.
    - [ ] Build the `Status Filter` dropdown to filter client side records by sentined status.
    - [x] Build the `SummaryStats` component to display data.
    - [x] Build the `ItemList` component using MUI DataGrid.
    - [x] Implement the review status filter dropdown.
    - [x] Implement text-based filtering for item number and name.
    - [x] Center-align the review status column.
    - [x] Set up routing to navigate from `ItemList` to `ItemReviewView`.
    - [x] Set up routing to navigate from `Attribute Review` cta to `AttributeReviewView`.
    = 

---

## Phase 3: Core Review Workflows

- [x] **Item-Level Review**
    - [ ] Create a Tauri command (`get_attributes_for_item`) to fetch attributes for a specific item.
    - [ ] Create a Tauri command (`update_item_attributes`) to save changes for an item.
    - [x] Build the `ItemReviewView` React component.
    - [x] Implement the attribute table with editable "Final Value" and radio button selection.
    - [x] Implement client-side status filters (tabs).
    - [x] Connect the "Save" button to the `update_item_attributes` command.
- [x] **Attribute-Level Review**
    - [x] Create the `AttributeReviewList` view to show all unique attributes.
    - [ ] Create a Tauri command (`get_unique_attribute_names`).
    - [ ] Create a Tauri command (`get_items_for_attribute`).
    - [ ] Create a Tauri command (`update_attributes_bulk`) to save bulk changes.
    - [x] Build the `AttributeReviewView` React component.
    - [x] Implement the attribute selection dropdown.
    - [x] Implement the review content list with expandable accordion details.
    - [x] Implement status filters for the attribute review list.
    - [x] Connect the "Save" button to the `update_attributes_bulk` command.

---

## Phase 4: Finalization & Core Features

- [x] **Global UX and State**
    - [x] Implement a global state management solution (e.g., `useDBStatus` hook or Zustand) for loading and error states.
    - [x] Create a global `LoadingBackdrop` component.
    - [x] Create a global `Snackbar` component for notifications.
- [ ] **Data Export**
    - [ ] Create a Tauri command (`export_csv`).
    - [ ] Implement the backend logic to query, transform, and save data as a CSV file.
    - [ ] Add an "Export & Save" button to the `MainView` and connect it to the `export_csv` command.