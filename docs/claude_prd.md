
# Product Requirements Document: Sentinel Review Dashboard

---

## 1. Executive Summary

The Sentinel Review Dashboard is a high-performance, cross-platform desktop application designed for the efficient bulk review and validation of product attribute data. The current process of reviewing large datasets is manual, time-consuming, and prone to errors. This application will streamline the workflow by providing a centralized dashboard for data ingestion, review, and export. By leveraging a powerful tech stack (Tauri, Rust, React, and SQLite), the Sentinel Review Dashboard will handle datasets of up to 80,000 records, ensuring a responsive and seamless user experience. The primary goal is to empower our data and quality assurance teams to review and approve product data with greater speed, accuracy, and consistency.

---

## 2. Goals and Objectives

### Business Goals
- **Increase Operational Efficiency:** Reduce the time and effort required to review and validate large volumes of product attribute data.
- **Improve Data Accuracy:** Minimize human error by providing a structured and intuitive review process.
- **Enhance Data Consistency:** Ensure that product attributes are consistent across all items through a bulk review interface.

### Project Objectives
- Develop a desktop application capable of ingesting, processing, and displaying up to 80,000 product attribute records.
- Implement two primary review workflows: an item-level review for in-depth analysis and an attribute-level review for bulk consistency checks.
- Provide a user-friendly interface with a summary dashboard, intuitive filtering, and clear action items.
- Ensure the application is performant, with fast data ingestion and real-time feedback during review and save operations.

---

## 3. User Personas

### Primary Persona: Data Steward
- **Role:** Responsible for the day-to-day management and quality of product data.
- **Goals:** To quickly process large CSV files, identify inconsistencies, and ensure all product attributes meet the required standards before being published.
- **Frustrations:** The current process is slow and lacks a centralized view, making it difficult to track progress and ensure consistency across thousands of items.

### Secondary Persona: QA Analyst
- **Role:** Responsible for the final review and approval of product data.
- **Goals:** To efficiently verify the accuracy of the data reviewed by the Data Stewards and to perform spot-checks for quality control.
- **Frustrations:** Needs a tool that allows for both high-level summaries and deep dives into specific items or attributes to quickly identify and address any remaining issues.

---

## 4. User Stories & Requirements

### Data Ingestion
- **As a Data Steward,** I want to easily upload a CSV file so that I can begin the review process without any technical assistance.
- **As a Data Steward,** I want the application to validate the uploaded file to ensure it is a `.csv` file, so that I can avoid ingestion errors.
- **As a Data Steward,** I want to see a clear loading indicator during data ingestion so that I know the application is working.

### Main Dashboard
- **As a Data Steward,** I want to see a summary of the review status (e.g., total products, reviewed, unreviewed) so that I can quickly assess the overall progress.
- **As a Data Steward,** I want to view a list of all products that need to be reviewed so that I can prioritize my work.
- **As a QA Analyst,** I want to filter the product list by review status so that I can focus on the items that are ready for final approval.

### Item-Level Review
- **As a Data Steward,** I want to select a single product and see all of its attributes in one place so that I can perform a comprehensive review.
- **As a Data Steward,** I want to be able to click on a suggested value (e.g., from PIM or Vody) to auto-fill the final value, so that I can speed up the review process.
- **As a Data Steward,** I want to save all my changes for a single item in one action so that my workflow is efficient.

### Attribute-Level Review
- **As a QA Analyst,** I want to review a single attribute (e.g., "Age Group") across all products so that I can ensure consistency.
- **As a QA Analyst,** I want to see the comparison values for each product's attribute on a single screen so that I can make quick decisions.
- **As a QA Analyst,** I want to save all my changes for a specific attribute across multiple items in one action to maximize my efficiency.

### Data Export
- **As a Data Steward,** I want to export the reviewed data into a single CSV file, including my approved `final_value` for each attribute, so that I can deliver the final dataset.
- **As a Data Steward,** I want to be prompted to choose a save location for the exported file so that I can easily manage my files.

---

## 5. Features in Detail

### Data Ingestion (`CsvUploader`)
A user-friendly drag-and-drop interface will allow users to upload a `.csv` file. The application will validate the file type and display a full-screen loader with status messages during the ingestion process. The backend will clear any existing data, parse the CSV, and load the new records into the SQLite database in a single, high-performance transaction, setting all records to an "UNREVIEWED" status.

### Summary Dashboard
This is the main hub of the application. It will feature:
- **Summary Statistics:** Real-time counts of total products and their review statuses.
- **Action Buttons:** Clear calls-to-action to "Review by Attribute," "Filter by Status," and "Export & Save."
- **Item List:** A data grid displaying all unique products, with columns for Item Number, Item Name, Total Attributes, and Review Status. Clicking a row will navigate the user to the Item Review View. Item Reviewed with light green background.
= **Review Filter:** A dropwdown on top of the table to filter rows vy review status and filter records in the table.

### Item Review View
This view is designed for a detailed review of all attributes for a single product. It will include:
- **Item Header:** Displays key product details.
- **Attribute Table:** A table listing each attribute with its comparison values (Vody, PIM, Grounding) and an editable "Final Value" input field. Radio buttons will allow for quick selection of a source value to populate the Final Value.
- **Status Filters:** Tabs to filter attributes by their initial status (e.g., Auto Approved, Manual Review).
- **Save Action:** A "Save" button that triggers a single transactional update for all modified attributes for the item, setting its overall status to "REVIEWED."

### Attribute Review List
- This will be displayed when user clicks on review by attribute from home screen.
- This will list all unique attributes of the classification by grouping using csv column 'Display Name' in a table. With count of         occurence of each attribute in CSV as another column.
= Clicking on individual attribute name row in table will launch 'Attribute Review View'

### Attribute Review View
This view is designed for bulk consistency checks of a single attribute across multiple products. It will include:
- **Attribute Selection:** An autocomplete dropdown to select the attribute to be reviewed.
- **Review Content:** A list of cards or rows, each representing a product that contains the selected attribute. Each card will display the comparison values and an editable "Final Value" input.
- **Review Content Detail:** A view button with each row that can be clicke to expand as an accordion to show all item related details, like product name, id, long description and all other columns of the row to which the attribute belongs. This button can be clicked again to hide the details.And togglet between view and hide text.
- **Status Filters:** Buttons to filter the list based on whether a "Final Value" has been entered (Reviewed, Pending, All).
- **Save Action:** A "Save" button that performs a single transactional update for all modified attributes in the current view.

### Data Export
A straightforward export feature that queries all records from the database, transforms them back into the original CSV format (with the addition of the `final_value` column), and prompts the user to save the file to their desired location.

---

## 6. Success Metrics

### Key Performance Indicators (KPIs)
- **Time-to-Review:** A 30% reduction in the average time it takes to review a dataset of 10,000 records.
- **Error Rate Reduction:** A 50% decrease in the number of data errors identified in post-review spot-checks.
- **User Adoption:** 90% of the data review team actively using the application for all review tasks within the first month of launch.
- **User Satisfaction:** An average user satisfaction score of 8/10 or higher, measured through quarterly surveys.

---

## 7. Assumptions, Risks, and Dependencies

### Assumptions
- The input CSV files will have a consistent and predictable structure.
- Users will have the necessary permissions to install and run the desktop application.
- The volume of records will not exceed 80,000 in the initial phase.

### Risks
- **Performance Degradation:** The application's performance may degrade if the dataset significantly exceeds 80,000 records. Mitigation: Implement robust indexing and performance testing.
- **Data Ingestion Failures:** Inconsistent CSV formatting could lead to data ingestion failures. Mitigation: Implement clear error messaging and provide a template for the expected CSV format.
- **Scope Creep:** Additional feature requests during development could delay the project timeline. Mitigation: Adhere to the defined requirements and manage scope through a formal change request process.

### Dependencies
- **Tauri and Rust Development Environments:** The development team must have the necessary tools and expertise to work with the chosen technology stack.
- **User Feedback:** The project's success depends on continuous feedback from the Data Stewards and QA Analysts during the development process.
- **IT Support:** Availability of IT support for application deployment and troubleshooting.
