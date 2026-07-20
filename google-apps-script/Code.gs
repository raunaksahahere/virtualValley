const MEET_LINK = 'https://meet.google.com/qhx-nuog-fwj';

function setup() {
  // Utility function to initialize sheets if they don't exist
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let meetingSheet = ss.getSheetByName('VV_Meeting');
  if (!meetingSheet) {
    meetingSheet = ss.insertSheet('VV_Meeting');
    meetingSheet.appendRow([
      'Timestamp', 'Schedule Date', 'Client Name', 'Client Phone', 
      'Client Location', 'Client Email', 'Service', 
      'Sales Guy Name', 'Sales Guy ID', 'Status'
    ]);
  }
  
  let sellersSheet = ss.getSheetByName('sellers');
  if (!sellersSheet) {
    sellersSheet = ss.insertSheet('sellers');
    sellersSheet.appendRow([
      'ID', 'Name', 'Phone', 'Location', 'Email', 
      'Status', 'Clients Contacted', 'Clients Deal Closed'
    ]);
  }
}

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'slots') {
    return createJsonResponse({ slots: getBookedSlots() });
  }
  
  if (action === 'validateSeller') {
    const id = e.parameter.id;
    const name = validateSeller(id);
    return createJsonResponse({ name: name });
  }
  
  if (action === 'getAllMeetings') {
    return createJsonResponse({ meetings: getAllMeetings() });
  }
  
  return createJsonResponse({ error: 'Invalid GET action' });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'book') {
      return handleBooking(data);
    }
    
    if (action === 'updateStatus') {
      return updateMeetingStatus(data);
    }
    
    return createJsonResponse({ error: 'Invalid POST action' });
  } catch (error) {
    return createJsonResponse({ error: error.message });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}

function getBookedSlots() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('VV_Meeting');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const slots = [];
  
  // Start from 1 to skip header
  for (let i = 1; i < data.length; i++) {
    const status = data[i][9];
    if (status !== 'Cancelled') {
      slots.push(data[i][1]); // Schedule Date (which contains date + time)
    }
  }
  return slots;
}

function validateSeller(id) {
  if (!id) return null;
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('sellers');
  if (!sheet) return null;
  
  const data = sheet.getDataRange().getValues();
  // Start from 1 to skip header
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      return data[i][1]; // Return Name
    }
  }
  return null;
}

function handleBooking(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('VV_Meeting');
  if (!sheet) throw new Error("VV_Meeting sheet not found");

  const { clientName, clientPhone, clientLocation, clientEmail, service, scheduleDate, salesGuyId } = data;
  
  // Acquire lock to prevent race conditions
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // wait up to 10 seconds for other processes to finish
    
    const existingData = sheet.getDataRange().getValues();
    
    // Check for duplicates
    for (let i = 1; i < existingData.length; i++) {
      const rowDate = existingData[i][1];
      const rowPhone = existingData[i][3];
      const rowEmail = existingData[i][5];
      const rowStatus = existingData[i][9];
      
      if (rowStatus !== 'Cancelled' && rowDate === scheduleDate) {
        // Double booking slot check
        return createJsonResponse({ error: 'Slot already booked' });
      }
      
      if (rowDate === scheduleDate && rowStatus !== 'Cancelled') {
         if (rowPhone === clientPhone || rowEmail === clientEmail) {
            return createJsonResponse({ error: 'Duplicate booking found' });
         }
      }
    }
    
    let salesGuyName = "Direct Lead";
    let finalSalesGuyId = "";
    
    if (salesGuyId) {
      const name = validateSeller(salesGuyId);
      if (!name) {
        return createJsonResponse({ error: 'Invalid Sales Representative ID.' });
      }
      salesGuyName = name;
      finalSalesGuyId = salesGuyId;
    }
    
    const timestamp = new Date().toISOString();
    const status = 'Upcoming';
    
    sheet.appendRow([
      timestamp,
      scheduleDate,
      clientName,
      clientPhone,
      clientLocation,
      clientEmail,
      service,
      salesGuyName,
      finalSalesGuyId,
      status
    ]);
    
    // Send Email Confirmation
    sendConfirmationEmail(clientName, clientEmail, service, scheduleDate);
    
    return createJsonResponse({ success: true, message: 'Meeting scheduled successfully' });
    
  } catch (e) {
    return createJsonResponse({ error: e.message });
  } finally {
    lock.releaseLock();
  }
}

function sendConfirmationEmail(name, email, service, scheduleDate) {
  const subject = `Meeting Confirmed: ${service} with Virtual Valley`;
  const body = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #22C55E; text-align: center;">Virtual Valley</h2>
      <p>Hi ${name},</p>
      <p>Your meeting for <strong>${service}</strong> has been successfully scheduled.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Date & Time:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${scheduleDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Google Meet Link:</strong></td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="${MEET_LINK}" style="color: #22C55E;">${MEET_LINK}</a></td>
        </tr>
      </table>
      <p>Please make sure to join on time. We look forward to speaking with you!</p>
      <br/>
      <p>Best regards,</p>
      <p><strong>The Virtual Valley Team</strong></p>
    </div>
  `;
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: body
  });
}

function getAllMeetings() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('VV_Meeting');
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const meetings = [];
  
  for (let i = 1; i < data.length; i++) {
    meetings.push({
      rowIndex: i + 1, // Store actual sheet row number for updates
      timestamp: data[i][0],
      scheduleDate: data[i][1],
      clientName: data[i][2],
      clientPhone: data[i][3],
      clientLocation: data[i][4],
      clientEmail: data[i][5],
      service: data[i][6],
      salesGuyName: data[i][7],
      salesGuyId: data[i][8],
      status: data[i][9]
    });
  }
  
  // Sort descending by timestamp (newest first)
  return meetings.reverse();
}

function updateMeetingStatus(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('VV_Meeting');
  if (!sheet) throw new Error("VV_Meeting sheet not found");

  const { rowIndex, status } = data;
  
  if (!rowIndex || !status) {
    return createJsonResponse({ error: 'Missing rowIndex or status' });
  }
  
  // Row indexing starts at 1, header is 1, data starts at 2
  // We need to update column J (10th column)
  sheet.getRange(rowIndex, 10).setValue(status);
  
  return createJsonResponse({ success: true, message: 'Status updated successfully' });
}

// Handle preflight requests for CORS
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
