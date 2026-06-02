# Catalogue Generator - AI Prompts Guide

Welcome! This document contains the exact sequence of AI prompts used to generate the Client-Side PDF Catalogue Generator application using React, TypeScript, Vite, and TailwindCSS. You can use these prompts in an AI coding assistant (like Claude, ChatGPT, or Cursor) to recreate this project from scratch.

## Prompt 1: The Core Architecture & Foundation
*Use this prompt to set the overall project requirements. The AI will often outline the files or build the initial structure scaffolding based on this.*

**Prompt:**
```text
Create a Client-Side PDF Catalogue Generator using React, TypeScript, Vite, and TailwindCSS.

1. Visual & UI Requirements (Crucial)
You MUST match the following UI structure exactly. Do not use generic designs; follow these specific styling instructions to match the reference "Old App" UI.

General Layout:
Full Screen Utilization: The app main container should be max-w-full or w-full with comfortable padding, utilizing the available screen real estate (do not restrict to a narrow centered column).

A. Sticky Header Navigation:
Create a floating, sticky header (sticky top-2 z-40).
Style: bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-200.
Content: Navigation links for "Upload Files", "Add Manually", "Review List", and a "Start New" button (Red text/icon) to reset the app.
Separators between links (w-px h-4 bg-gray-300).

B. Upload Section (Side-by-Side Grid):
Layout: grid-cols-1 md:grid-cols-2 gap-8.
Box 1 (Images): Large dashed box (rounded-3xl border-2 border-dashed p-8). Dynamic state: Turn blue/active when dragging/files selected. Icon: Blue circular background with Image Icon. Text: "Upload Images" / "Drag & drop folder".
Box 2 (Data - Excel/CSV): Large dashed box (matching Box 1). Dynamic state: Turn green/active when file selected. Icon: Green circular background with Spreadsheet Icon. Text: "Upload Data (Optional)" / "Drag & drop CSV or Excel".

C. Manual Entry Form:
Container: bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm.
Grid layout with a large square Image Upload box on the left (aspect-square) and form fields on the right.
Fields needed: product Name (*Required), Input Price (Rs.), Material, Description.

D. Floating Footer & Preview:
A fixed bottom bar (fixed bottom-0 bg-white border-t p-4) appearing only when products are added.
Content: Product count (left) and a large black "Process & Preview Products" button (right).

PDF Preview Mode:
Full Screen Layout: The preview should take up the entire screen width and height (no small containers).
Download Button: A prominent, fixed "Download PDF" button must be available in the preview mode.

2. Core Functionality
A. Data Parsing Logic:
Excel/CSV Support: Use xlsx and papaparse.
Column Mapping: The app MUST recognize these exact headers to map data to images:
Image Name -> Matches the uploaded filename (e.g., chair_01.jpg).
Model Name -> Product Title.
Material -> Subtext/Subtitle.
Configuration -> Description.
Offer Price -> Price.
Image Matching: Automatically link rows in the Excel file to the uploaded images based on the Image Name column.

B. PDF Generation (@react-pdf/renderer):
Style: Clean, professional grid layout.
Page Content: Image (center), Model Name (uppercase), Underline separator, Material (labeled), Description (labeled), and Price Box.
Exclusions (IMPORTANT): NO Cover Page. NO Watermarks on images. NO Password Protection (The app should be open). NO Specific Branding: Do not use "Manley" or specific addresses. Make it generic.

C. "Start New" Feature:
Clicking "Start New" should trigger a custom modal (not window.confirm).
Modal Style: Centered white card, backdrop blur, "Are you sure?", "Yes, Start New" (Red button), "Cancel" (Gray button).
Action: Clears all state (images, data, products) and returns to the initial view.

3. Technical Constraints
Icons: Use lucide-react.
Drag & Drop: Implement native HTML5 drag-and-drop or react-dropzone.
State Management: Use React Context or simple State to manage the product list.
```

---

## Prompt 2: State Management & Types (The Data Context)
*Once the initial structure is outlined or generated, use this prompt to concretely define the application logic and React Context.*

**Prompt:**
```text
Now, let's create the state management for the application. Set up a React Context named `CatalogueContext.tsx`. 

First, define the TypeScript interface for a `Product`: 
- id (string)
- source (manual | automated)
- Image Name, Model Name, Material, Configuration, Offer Price, and an internal imagePreviewUrl.

Set up the state variables inside the provider to track: 
1. `rawImages`: The massive array of uploaded image files.
2. `dataFileName`: Name of the uploaded CSV/Excel to show the user.
3. `products`: The merged and verified array of Product objects.

Finally, write the core logic where `addImages` and `setDataFile` sync up. We need a helper function that reads the parsed Excel data from `papaparse` or `xlsx` and automatically matches a row with an image inside `rawImages` based strictly on the 'Image Name' column adding a createObjectURL to it. Export the hook `useCatalogue()` at the bottom.
```

---

## Prompt 3: Building the Upload Section & Data Parsing Logic
*Use this prompt to build out the Drag-and-Drop section, wiring it directly to the logic we just made.*

**Prompt:**
```text
Next, let's implement the UI for the `UploadSection.tsx`. Use `react-dropzone`. 

Create two side-by-side dashed boxes as described in the original architectural prompt: 
1. Box 1: For Images. It should accept multiple image files.
2. Box 2: For Excel/CSV data. It should accept one file.

When files are dropped:
1. Pass the generated images to `addImages` in the context.
2. Read the Excel/CSV file immediately. Use a FileReader. If it's a CSV, parse it with `papaparse`. If it's Excel (.xlsx), parse it with the `xlsx` parsing utility.
3. Map the raw array of rows into a consistent JSON array containing exactly: Image Name, Model Name, Material, Configuration, Offer Price.
4. Pass that JSON data to the `setDataFile` method in the context.
```

---

## Prompt 4: Manual Entry Form & Render List
*Use this prompt to add the manual editing form and the list rendering logic so users can review the matched products.*

**Prompt:**
```text
Let's build the `ManualEntryForm.tsx` and `ProductList.tsx`. 

The `ManualEntryForm` should have a modern Grid layout: a square box on the left allowing the user to upload a single image via `react-dropzone`, and form fields on the right for 'Model Name' (required), 'Price', 'Material', and 'Description'. Once submitted, use `addProduct` from the context to inject a single manual product into the global state.

Then, create `ProductList.tsx`. It should map over the `products` array from our context and display them in a responsive CSS Grid. Each product card should show the image on top and all the text/details beneath it. If the `products` array is empty, simply return null.
```

---

## Prompt 5: PDF Generator Engine
*Use this prompt to utilize React-PDF to actually generate the end-result generic catalogue grids.*

**Prompt:**
```text
Now we need the core PDF generation functionality. We'll use `@react-pdf/renderer` to create a `PDFPreview.tsx` component. 

This component should receive `onClose` as a prop and act as a full-screen fixed overlay covering the entire app. Inside this component:
1. Create a `CatalogueDocument` component using `@react-pdf/renderer` primitives (Document, Page, View, Image, Text).
2. The Document layout should be a clean, professional grid (e.g., 2 or 3 items per row per page).
3. Each item must display the Product Image centered, Model Name (uppercase bold), a thin line separator, Material, Configuration description, and an Offer Price.
4. Remember the constraints: No cover page, generic styling, no watermarks, open access.

Additionally, use the `PDFDownloadLink` component to place a prominent floating "Download PDF" button somewhere in the preview so users can save the render immediately.
```

---

## Prompt 6: Assembly (App, Header, Footer, Modals)
*Finally, to tie everything together in a single page flow.*

**Prompt:**
```text
Finally, let's assemble everything inside `App.tsx` and create the remaining layout components.

1. Implement the `Header.tsx` as a sticky Top-bar floating element using `bg-white/80` and `backdrop-blur-md`. It has an elegant logo on the left, and a "Start New" red text button on the right.
2. Implement the `StartNewModal.tsx`. It should be a centered modal with backdrop blur asking "Are you sure?" with a Red "Yes, Start New" button and a Gray "Cancel" button. 
3. Implement `Footer.tsx` as a fixed bottom bar (only visible if `products.length > 0`). It shows the total product count and a large black "Process & Preview Products" button that triggers `setIsPreviewOpen(true)`.

Inject `UploadSection`, `ManualEntryForm`, `ProductList`, `Header`, `Footer`, and `StartNewModal` cleanly into the `App` component return statement wrapping it all inside a common `Layout` component handling the container widths natively.
```
