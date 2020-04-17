# BKFS Test

This is a test project created for Black Knight Inc test.

## Project Status & Description:
This app is hosted on aws server.
Demo link: http://18.222.135.156:3000/

* Front-end github source code link: https://github.com/shankyDoodle/bkfs-test-1
* Back-end github source code link: https://github.com/shankyDoodle/bkfs-test-1-backend

#### Project technical description
* Front-end is created using React.Js and following Redux architecture. 
* Backend is created as Node.js express server. Currently, no database technology is integrated with this server and all data is stored on server itself

##### Given Requirements and their status 
* Classification Screen
    All required features are completed.
    1. User have two dropdowns i.e. Customer Names and Document Types.
    2. User options:
        1. Select one or more values from it.
        2. Select all option.
        3. Remove all selected options.
        4. can search on list by typing string in dropdown.
    3. Based on dropdown selection, editable table is rendered.
    4. User have options to save or discard edited data from the table. On save click, this data is updated on node server as well.
    5. On mouse over on Document Type names, sample PDF is shown. This PDF data is lazy loaded i.e. PDF is fetched from backend only after mouse over.
    6. This PDF viewer popover has option to add or update PDF sample for current document.
    7. User can export current state of table data to desired csv format.
    8. Both dropdowns have "ADD" feature i.e. when we type any string in dropdown box, it will search for that child 
       option and if typed string is present then upon "ENTER" click new element is created from backend with the same 
       typed string as label. This is how user can add customer and document type.
    
* Extraction Screen
    All required features are completed.
    1. User can see one dropdown and select one element at a time.
    2. Upon create button click user can see grouped element list and sample PDF for the selected document type.
    3. Groped element list items have ability to re-order themselves between same group as well as across the different lists.
       This can be done by simple mouse dragging operation.
    4. After list order is changed, user can save or discard the operation. This also reflect to backend.
    5. PDF view is view only and have navigations buttons to go over different pages.
    6. 'Export' button exports desired data which is present at current screen.
    7. 'Export all' button exports desired data which is stored on server database.
    
If any of the screen is in dirty condition, then user is prevented from leaving the current screen before either saving it or discarding it.
And from the bonus feature, although multi user scenario is not implemented, app will work for multi-window scenario serving latest saved data on server.
All UI components are tested with help of Jest + Enzyme automated testing tool.(Snapshot testing)