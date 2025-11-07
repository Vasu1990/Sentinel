This document outlines the high-level plan, technology choices, and architectural components for the **Sentinel Review Dashboard** application, focusing on the data ingestion, review workflows, and performance-critical operations.

## 🚀 Sentinel Review Dashboard - Technical Specification Summary

This application will be a **high-performance, cross-platform desktop application** built with **Tauri (Rust backend)** and **React (Frontend with MUI)**, using an embedded **SQLite** database to manage up to **80,000 product attribute records** efficiently.

---

## 1. Overview and Goals

### 1.1 Project Goal
The primary goal is to create a professional, dashboard-style desktop application for the **efficient bulk review and validation** of product attribute data. Performance is critical, especially around data ingestion and filtering, leveraging Rust/Tauri for native speed.

### 1.2 Technology Stack
| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Desktop Framework** | **Tauri (Rust)** | Provides a performant, small, and secure application bundle. Rust backend handles **heavy-lifting (CSV parsing, SQLite interaction)**. |
| **Frontend** | **React (Functional Components)** | Modern, declarative UI development. |
| **Styling/UI** | **Material UI (MUI)** | Professional, aesthetic, and robust component library. |
| **Database** | **SQLite** | Embedded, serverless, and fast database managed natively via Tauri's Rust backend. |

---

## 2. Data Structure and Database Schema

The **product\_attributes** table is the core source of truth.

### 2.1 Table: `product_attributes` Schema

| Column Name | Data Type | Constraint | Description |
| :--- | :--- | :--- | :--- |
| **id** | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique row identifier. |
| **item\_id** | `TEXT` | `NOT NULL` | Grouping key for products. |
| **attribute\_display\_name** | `TEXT` | `NOT NULL` | The attribute name (e.g., 'Age Group'). |
| **review\_status** | `TEXT` | `NOT NULL` | Application status: `UNREVIEWED`, `IN_REVIEW`, `REVIEWED`. |
| item\_number | `TEXT` | - | Item Number/Category. |
| classification | `TEXT` | - | Product classification. |
| product\_name | `TEXT` | - | Derived field for Item View. |
| long\_description | `TEXT` | - | Item description. |
| pim\_value | `TEXT` | - | Value from PIM source. |
| vody\_value | `TEXT` | - | Value from Vody source. |
| grounding\_value | `TEXT` | - | Value from Grounding source. |
| **final\_value** | `TEXT` | - | **Reviewer's selected and editable value.** |
| initial\_status | `TEXT` | - | Initial status from CSV (e.g., 'Auto-Approved'). |
| *(Remaining columns)* | `TEXT`/`Array` | - | `vendor`, `manufacturer`, `confidence`, `thought_process`, etc. |

### 2.2 💾 Indexing Strategy (Mandatory for Performance)
These indexes must be created **immediately after data import** to ensure efficient lookups and filtering on 80k+ rows:

1.  `CREATE INDEX idx_item_id ON product_attributes (item_id);` (Crucial for grouping and Item-Level Review)
2.  `CREATE INDEX idx_review_status ON product_attributes (review_status);` (Crucial for Summary Dashboard filters)
3.  `CREATE INDEX idx_long_attribute ON product_attributes (attribute_display_name);` (Crucial for Attribute-Level Review)

---

## 3. Application Components and Views

### 3.1 Main View: Upload and Summary Dashboard 📊
The central hub for data management and overview.

| Component | Functionality | Key Requirements |
| :--- | :--- | :--- |
| **CsvUploader** | Handles data ingestion. | 1. **Validation:** Must be a `.csv` file. 2. **Ingestion:** Clear table $\rightarrow$ Read/Parse $\rightarrow$ **Bulk SQLite Transactional Load** for speed. 3. Set `review_status` to **`UNREVIEWED`**. |
| **SummaryStats** | Real-time counts of review progress. | Fast `COUNT` queries on SQLite (e.g., `COUNT(DISTINCT item_id)`, `COUNT(*) WHERE review_status = 'REVIEWED'`). |
| **ItemList** | Display unique items for review. | An MUI **DataGrid** showing Item ID, Name, Attribute Count, and Review Status. **Action:** Click row $\rightarrow$ Navigate to **Item Review View (3.2)**. |
| **Action Buttons** | `Review by Attribute`, `Filter`, `Export & Save`. | `Filter` opens modal/dropdown utilizing `idx_review_status` in subsequent queries. |

### 3.2 Item Review View (Item-Level)
Focuses on reviewing **all attributes for a single product** (grouped by `item_id`).

* **View Logic:** Data for a single item is small, allowing for **client-side filtering** (e.g., Status Filters: *All, Auto Approved, Manual Review*).
* **Attribute Table:** A clean table displaying **Attribute Name**, comparison values (`Body Value`, `PIM Value`, `Grounding Value`), and the editable **`Final Value`** input.
* **Interaction:** Clicking a source value (PIM/Grounding/Vody) must **auto-fill** the `Final Value` input.
* **Save Action:** Triggers a **Tauri IPC call** to the Rust backend to perform a **single SQLite Transactional Update** for *all modified attributes* for that item. On success, the item's overall `review_status` is set to **`REVIEWED`**.

### 3.3 Attribute Review View (Bulk Consistency)
Focuses on reviewing **one specific attribute across multiple products** (leveraging `idx_long_attribute`).

* **Context Header:** Uses an MUI **Autocomplete/Select** to choose the `attribute_display_name` to review (e.g., "Age Group").
* **Review Card List:** The primary area displays a scrollable list of cards, where **each card represents a single item** containing the selected attribute.
* **Card Content:** Comparison fields and the editable `Final Value` input per attribute row.
* **Save Action:** Triggers a **Tauri IPC call** to the Rust backend to perform a **single SQLite Transactional Update** for *all modified attributes* currently displayed in this view.

---

## 4. Key Performance and UI Controls

### 3.4 Filtering and User Controls
| Feature | Implementation | Notes |
| :--- | :--- | :--- |
| **Global Filters** | SQLite `WHERE` clauses | Ensures efficient loading of smaller, focused datasets into the React frontend from the 80k total records. |
| **Loading States** | `useDBStatus` hook | Centralized state to track `isLoading` during any Tauri IPC/DB operations (Upload, Query, Save). Displays a **global backdrop with a spinner** (`<CircularProgress />`). |
| **Error Handling** | Tauri IPC `try...catch` | All native calls must handle errors. User-facing errors are displayed using an MUI **Snackbar** component. |

### 3.5 Export Feature
The final step for data delivery.

1.  **Query:** `SELECT * FROM product_attributes` (retrieves all records).
2.  **Transformation:** Transform the structured database rows back into the **original CSV format structure**, critically including the new `final_value` column.
3.  **File Save:** Use the **Tauri API's `fs` module** to prompt the user for a save location and save the output as a `.csv` file.
4.  **Notification:** Show success or failure via the Snackbar.

