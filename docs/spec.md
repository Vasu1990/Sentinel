## 🚀 Sentinel Review Dashboard - Detailed Specification

### 1. Main View (Post-Upload Dashboard)

This is the landing page and central hub of the application.

#### 1.1 Data Ingestion Component (`CsvUploader`)

| Feature | Specification |
| :--- | :--- |
| **Interface** | Clear, prominent drag-and-drop zone with a fallback "Browse" button. |
| **Validation** | **Mandatory:** Must validate the file extension is `.csv`. Display a Snackbar error on failure. |
| **Processing** | 1. Clear existing `product_attributes` table. 2. Read and parse CSV. 3. **Load data into SQLite** using a single, bulk transactional insert. 4. Set all new records' `review_status` to **`UNREVIEWED`**. |
| **Loading State** | A global `isLoading` state (via `useDBStatus` hook) must be active, displaying a full-screen **loader** with changing status messages: **"Uploading File..."** $\rightarrow$ **"Updating Database..."** |

#### 1.2 Summary & Action Bar

| Component | Specification |
| :--- | :--- |
| **Review Summary** | Displays high-level statistics calculated from the database: **Classification**, **Total Products** (count of unique `item_id`), and **Status of Reviewed** (count of `item_id` where overall `review_status` is `REVIEWED`). |
| **Review by Attribute** | Button: Redirects the user to the **Attribute Listing Screen** (Section 3). |
| **Filter by Status** | Dropdown: Allows filtering the **Item List** (1.3) by the overall item `review_status` (`UNREVIEWED`, `IN_REVIEW`, `REVIEWED`). Default is `UNREVIEWED` (Pending). |
| **Export & Save** | Button: Queries **all** records, transforms them back into CSV, adding a new column: **`final_value`**. Prompts user for save location via Tauri `fs` API. |

#### 1.3 Item List Component (`ItemList`)

* **Display:** A data grid listing unique products.
* **Columns:** **Item Number** (`item_number`), **Item Name** (`product_name`), **Total Attributes** (calculated by grouping `item_id`), **Status** (overall item `review_status`).
* **Action:** Clicking an individual item row redirects to the **Item Review View** (Section 2).

---

## 2. Item Review View (Item-Level Review)

This view focuses on reviewing all attributes for a single selected item.

#### 2.1 Item Header

The top section highlights core product details: **Item Number**, **Product Name**, **Product Long Description**, **Manufacturer**, and **Vendor**.

#### 2.2 Status Toggles (Attribute-Level Filter)

A tabbed view is used to filter the attribute list based on the **individual attribute's status** (from the `initial_status` CSV column):

* **Tabs:** **Auto Approved**, **Auto Updated**, **Manual Review**, **Expert Review**, **Out of Ref**, **Rejected**.
* **Action:** Clicking a tab filters the displayed attribute table to show only the rows matching that status for the current item.

#### 2.3 Attribute Table and Interaction

The main area displays the attributes for the item, filtered by the selected tab.

| Column | Specification | Interaction |
| :--- | :--- | :--- |
| **Attribute Name** | (`attribute_display_name`) | - |
| **Vody Value**, **PIM Value**, **Grounding Value** | Comparison source values. | Each value must be selectable via a **radio button**. Selecting a radio button **populates the Final Value text box** for that row. |
| **Final Value** | Input field (`TEXT` type) | **Editable.** User can modify the pre-populated value or enter a value manually without using the radio buttons. |
| **Grounding Data** | Additional supporting details. | - |

#### 2.4 Footer and Item Status Control

* **Item Status Dropdown:** Located at the top of the view, used to set the **overall item `review_status`** before saving.
    * **Default Value:** `UNREVIEWED` (Pending).
    * **Review Flow:** User must manually change the status to **`IN_REVIEW`** before clicking Save, and then potentially **`REVIEWED`** upon final approval.
* **Save Button:** Critical Action.
    * Triggers a **SQLite Transactional Update** for **all modified attributes** for this item, saving their new value to the `final_value` column.
    * Updates the overall item's `review_status` in the `review_status` column based on the dropdown selection.
* **Back Button:** Returns to the Main View (Dashboard).

---

## 3. Attribute Review View (Bulk Consistency Review)

This view facilitates reviewing one specific attribute across multiple items.

### 3.1 Attribute Listing Screen

* **Function:** Lists all **unique attribute names** (from `attribute_display_name` column) present in the database.
* **Action:** Clicking an attribute name redirects to the **Attribute View Screen** (3.2).

### 3.2 Attribute View Screen

#### 3.2.1 Context Header

Displays metadata for the selected attribute across all items: **Classification Name**, **Attribute Name**, **Attribute Short Name**, and **Total Attribute Count** (total number of rows with this `attribute_display_name`).

#### 3.2.2 Status Toggles (Dynamic Filtering)

Uses buttons to filter the display based on the status of the **`final_value`** for the attribute rows:

* **Buttons:** **Reviewed**, **Pending**, **All**.
* **Logic:**
    * **Reviewed:** Dynamically calculated; shows rows where the **`final_value` text box has a value**.
    * **Pending:** Dynamically calculated; shows rows where the **`final_value` text box is empty**.
    * **All:** Reverts to showing all rows for the selected attribute.

#### 3.2.3 Review Content Table (Card/Row List)

The main area lists all items that contain the selected attribute, with comparative fields.

| Column | Specification | Interaction |
| :--- | :--- | :--- |
| **Product Name** | Item identifier. | - |
| **Vody Value**, **PIM Value**, **Grounding Value** | Comparison source values. | Each value must be selectable via a **radio button**. Selecting a radio button **populates the Final Value text box**. |
| **Final Value** | Input field (`TEXT` type) | **Editable.** User can modify the pre-populated value or enter a value manually. |
| **Confidence Score** | (`confidence` column) | Displays the score for that row. |
| **View Button** | Button | **Expands the row/card** to show full product detail: **Product Long Description**, **Manufacturer**, **Vendor**, **Grounding Data**, **Supporting Quote**, and **Website Names**. |

#### 3.2.4 Footer Actions

* **Save Button:** Critical Action. Triggers a **SQLite Transactional Update** for all attribute rows currently displayed and modified, saving the new value to the `final_value` column.
* **Back Button:** Returns to the **Attribute Listing Screen** (3.1).