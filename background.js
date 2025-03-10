// Function to perform OAuth and Gmail API actions
function performGmailAction(action) {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    if (chrome.runtime.lastError) {
      console.error("OAuth error or no token");
      return;
    }
    if (!token) {
      console.error("Failed to retrieve token");
      return;
    }
    console.log("Token retrieved:", token);

    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };

    let actionUrl;
    const requestData = {
      labelIds: ["INBOX"], // Emails selected from INBOX
      q: "is:unread", // Only unread emails
    };

    // Determine the action and URL
    if (action === "Archive") {
      actionUrl = "https://www.googleapis.com/gmail/v1/users/me/messages/modify";
      requestData.removeLabelIds = ["INBOX"];
    } else if (action === "Trash") {
      actionUrl = "https://www.googleapis.com/gmail/v1/users/me/messages/trash";
    } else {
      console.error("Invalid action:", action);
      return;
    }

    console.log("Action URL:", actionUrl);
    console.log("Request Data:", requestData);

    // Perform the API request
    fetch(actionUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log("Action performed on emails:", data))
      .catch((error) => console.error("Error performing action:", error));
  });
}

// Notify when the extension is installed
console.log("chrome.storage:", chrome.storage);

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  initializeSchedule(); // Corrected function name
  console.log("Default schedule initialized");
});
// Notify when the extension is installed and set default schedule
function initializeSchedule() { // Corrected the function name
  if (chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.set(
      {
        schedule: {
          Days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          Time: "14:30",
          action: "Archive",
        },
      },
      () => {
        console.log("Data saved to storage");
        console.log("Default schedule initialized.");
      }
    );
  } else {
    console.error("chrome.storage.sync is not available. Ensure permissions are set in the manifest.");
  }
}

// Function to check the schedule and execute Gmail actions
function checkSchedule() {
  chrome.storage.sync.get("schedule", (data) => {
    if (!data || !data.schedule) {
      console.error("Error retrieving schedule from storage:", chrome.runtime.lastError?.message);
      return;
    }
    const { Days, Time, action } = data.schedule;

    const currentDate = new Date()
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();
    const currentTime = new Date()
      .toLocaleTimeString("en-GB", { hour12: false })
      .substring(0, 5);

    console.log("Current Date:", currentDate);
    console.log("Current Time:", currentTime);
    console.log("Schedule Time:", Time);

    if (Days.includes(currentDate) && currentTime === Time) {
      performGmailAction(action);
      console.log("Scheduled Action Executed:", action);
    } else {
      console.warn("No valid schedule found in storage.");
    }
  });
}

// Start schedule checking
setInterval(checkSchedule, 60000); // Check every 60 seconds

// Inject script when Gmail tabs are updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.includes("mail.google.com") && changeInfo.status === "complete") {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["gmailPrompt.js", "pikadayinit.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting scripts", chrome.runtime.lastError.message);
        } else {
          console.log("Scripts injected successfully");
        }
      }
    );
  }
});

// Badge toggle for specific URLs
chrome.action.onClicked.addListener(async (tab) => {
  const extensions = "https://developer.chrome.com/docs/extensions";
  const webstore = "https://developer.chrome.com/docs/webstore";

  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === "ON" ? "OFF" : "ON";

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  }
});

// Reminder scheduling
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "scheduleEmailClearing") {
    const startDate = new Date(message.startDate);
    const endDate = new Date(message.endDate);
    console.log("Reminder scheduled from:", startDate, "to:", endDate);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("chrome.tabs:", chrome.tabs);
  console.log("chrome.scripting:", chrome.scripting);

  if (changeInfo.status === "complete" && tab.url?.includes("mail.google.com")) {
    console.log(`Tab Updated: ${tab.url}`);
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["pikadayinit.js"],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error injecting script", chrome.runtime.lastError.message);
        } else {
          console.log("Script injected successfully");
        }
      }
    );
  }
});