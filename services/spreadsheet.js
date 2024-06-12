const { google } = require('googleapis');
const {authorize } = require('./slides')


function getSheetIdFromUrl(url) {
    const match = url.match(/\/d\/(.+?)\/|\/open\?id=(.+?)(?:&|$)/);
    return match ? (match[1] || match[2]) : null;
}

const fetchPresentationURL = async (auth, formID) => {
    try {
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = '1UF07enFFDux_HO2irb-sG1KS2V07iyDZZLvpofHuxjQ';
            const range = `final-sheet!A:C`;
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
    
            const rows = response.data.values;
            if (rows.length) {
                const matchingRow = rows.find(row =>row[1] === formID);
                if (matchingRow) {
                    return matchingRow[2]; // Return the PresentationURL
                }
            }
    
            return 'No matching data found';
        } catch (error) {
            console.error('The API returned an error:', error);
            return 'Error fetching data';
        }
};

const fetchPresentationURLfromsubmissionID = async (auth,formID) => {
    try {
       
            // const auth = await authorize(SCOPES);
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = '1UF07enFFDux_HO2irb-sG1KS2V07iyDZZLvpofHuxjQ';
            const range = 'final-sheet!A:D';
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
    
            const rows = response.data.values;
            if (rows.length) {
                const matchingRow = rows.find(row =>row[1] === formID);
                if (matchingRow) {
                    return matchingRow; // Return the PresentationURL
                }
            }
    
            return 'No matching data found';
        } catch (error) {
            console.error('The API returned an error:', error);
            return 'Error fetching data';
        }
};

const fetchSlideIDsfromsubmissionID = async (auth,formID) => {
    try {
       
            // const auth = await authorize(SCOPES);
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = '1UF07enFFDux_HO2irb-sG1KS2V07iyDZZLvpofHuxjQ';
            const range = 'Slide-display!A:G';
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
    
            const rows = response.data.values;
            if (rows.length) {
                const matchingRows = rows.filter(row => row[1] === formID);
                if (matchingRows.length) {
                    const sortedRows = matchingRows.sort((a, b) => a[3] - b[3]);
                    return sortedRows.map(subarray => [subarray[4],subarray[6]]);
                }
            }
            
    
            return 'No matching data found';
        } catch (error) {
            console.error('The API returned an error:', error);
            return 'Error fetching data';
        }
};

const fetchPresentationHistory = async (auth,userID) => {
    try {
       
            // const auth = await authorize(SCOPES);
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = '1UF07enFFDux_HO2irb-sG1KS2V07iyDZZLvpofHuxjQ';
            const range = 'final-sheet!A:E';
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
    
            const rows = response.data.values;
            if (rows.length) {
                const matchingRows = rows.filter(row => row[0] === userID);
                if (matchingRows.length) {
                    return matchingRows; 
                }
            }
    
            return 'No matching data found';
        } catch (error) {
            console.error('The API returned an error:', error);
            return 'Error fetching data';
        }
};



function findLatestFormIDByEmail(auth, email) {
    const spreadsheetId = '1huVEcxx5ACTgRv7X-OcikIZfSb5KCaKAQ63IQhm2ZLY';
    const sheets = google.sheets({ version: 'v4', auth });
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Form Responses!A:C',
        }, (err, response) => {
            if (err) {
                console.error('The API returned an error:', err);
                reject('Error fetching data');
                return;
            }

            const rows = response.data.values;
            if (rows.length) {
                const filteredRows = rows.filter(row => row[0] === email);
                if (filteredRows.length > 0) {
                    const latestRow = filteredRows.sort((a, b) => new Date(b[2]) - new Date(a[2]))[0];
                    resolve(latestRow[1]); // Return the latest Form ID
                }
            }
            resolve(null); 
        });
    });
}

    const updateMatchedRow = async (auth, userID, formID, newColumnValue) => {
        try {
            // Authorize and initialize the Google Sheets API
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = '1UF07enFFDux_HO2irb-sG1KS2V07iyDZZLvpofHuxjQ';
            const range = 'final-sheet!A:D';
            
            // Fetch the existing data from the spreadsheet
            const response = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            });
            
            const rows = response.data.values;
            if (rows.length) {
                // Find the index of the matching row
                const rowIndex = rows.findIndex(row => row[0] === userID && row[1] === formID);
                if (rowIndex !== -1) {
                    const updateRange = `D${rowIndex + 1}`;
            // Adding 1 to rowIndex because Sheets range starts from 1
                    const updateValue = [[newColumnValue]];
                    const updateResponse = await sheets.spreadsheets.values.update({
                        spreadsheetId,
                        range: updateRange,
                        valueInputOption: 'USER_ENTERED',
                        resource: { values: updateValue },
                    });
                    
                    console.log('Update response:', updateResponse);
                    return 'Row updated successfully';
                }
            }

            return 'No matching data found';
        } catch (error) {
            console.error('Error updating row:', error);
            return 'Error updating row';
        }
    };

const storeUserResponses = async (auth, formId, responses) => {
    try {
        // Authorize and initialize the Google Sheets API
        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = '1ibCX9dIotv0oKB_HNTEY7QpxWwh8_ANa7H3fcWIYiGc';
        const range = 'A:DF';

        // Fetch the existing data from the spreadsheet
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        let rows = response.data.values;

        // Find the index of the row with the matching form ID
        let existingRowIndex = -1;
        if (rows) {
            existingRowIndex = rows.findIndex(row => row[0] === formId);
        }

        // Preprocess responses to handle empty arrays
        const processedResponses = responses.map(response => {
            if (Array.isArray(response) && response.length === 1 && response[0] === "") {
                // If the response is an empty array, replace it with an empty string
                return "";
            } else {
                // Otherwise, return the response as is
                return response;
            }
        });

        const newRow = [formId, ...processedResponses];

        if (existingRowIndex !== -1) {
            // If the form ID already exists, update the existing row
            const updateRange = `A${existingRowIndex + 1}`; // Adjust index to 1-based
            const updateValues = [newRow];
            const updateResponse = await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: updateRange,
                valueInputOption: 'USER_ENTERED',
                resource: { values: updateValues },
            });

            // console.log('Update response:', updateResponse);
        } else {
            // If the form ID doesn't exist, add a new row
            const updateRange = `A${rows.length + 1}`; // Start from the next row after the last row
            const updateValues = [newRow];
            const updateResponse = await sheets.spreadsheets.values.update({
                spreadsheetId,
                range: updateRange,
                valueInputOption: 'USER_ENTERED',
                resource: { values: updateValues },
            });
            // console.log('Update response:', updateResponse);
        }

        return 'User responses stored successfully';
    } catch (error) {
        console.error('Error storing user responses:', error);
        return 'Error storing user responses';
    }
};

//some change

module.exports = {findLatestFormIDByEmail,getSheetIdFromUrl,fetchPresentationURL,fetchPresentationHistory,updateMatchedRow,fetchPresentationURLfromsubmissionID,fetchSlideIDsfromsubmissionID,storeUserResponses};
