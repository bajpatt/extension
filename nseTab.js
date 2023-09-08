
let extractedContent = [];
// Function to extract the content of the table rows
function extractTableContent() {

    const tableElement = document.querySelector('#CFanncEquityTable');
    if (tableElement) {
        // Extract rows from the table
        const tableRows = Array.from(tableElement.querySelectorAll('tbody tr'));
        const newContent = [];
        // Initialize an array to store the extracted data


        // Loop through each row and extract required data
        tableRows.forEach(row => {
            const tds = row.querySelectorAll('td');

            // Check if all expected data elements are present
            if (tds.length >= 5) {
                const companyName = tds[1].textContent.trim();
                const subject = tds[2].textContent.trim();
                const attachmentLink = tds[4].querySelector('a')?.getAttribute('href') || '';

                const rowData = [companyName, subject, attachmentLink];
                // Check if rowData is not already in extractedContent
                const exists = extractedContent.some(existingRow => JSON.stringify(existingRow) === JSON.stringify(rowData));
                if (!exists) {
                    newContent.push(rowData);
                }


            }
        });


        return newContent;
    }


}

async function extractTableContentAfterDelay() {
    const newTableContent = extractTableContent();
    
    const clearBtn = document.querySelector('a[data-val="Clear"]');
  clearBtn.click();
//    if (clearBtn) {
//      const clickEvent = document.createEvent("MouseEvents");
// clickEvent.initMouseEvent(
//   "click",      // type of event
//   true,         // bubbles (events bubble up)
//   true,         // cancelable
//   window,       // event's view
//   0,            // mouse click count
//   0,            // screenX
//   0,            // screenY
//   0,            // clientX
//   0,            // clientY
//   false,        // ctrlKey
//   false,        // altKey
//   false,        // shiftKey
//   false,        // metaKey
//   0,            // button (0 = left button, 1 = middle button, 2 = right button)
//   null          // relatedTarget
// );

// // Dispatch the click event on the anchor element
// clearBtn.dispatchEvent(clickEvent);
      
      
   // }

    if (newTableContent.length > 0) {
        extractedContent = extractedContent.concat(newTableContent); // Add new content to extractedContent
        console.log('Updated extracted content:');
        console.log(extractedContent);

        // Send the new extracted content to the background script if needed
        // chrome.runtime.sendMessage({ action: 'newNseResulttobackground', content: newTableContent });
    }

}

setInterval(extractTableContentAfterDelay, 5000);