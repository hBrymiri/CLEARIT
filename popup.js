
document.getElementById('ok').addEventListener('click', function(){
    const selectedDay = Array.from(document.getElementById('Schedule-Days').selectedOptions).map(option => option.value);
    const selectTime = document.getElementById('Schedule-Time').value;
    const selectedAction = document.getElementById('action-select').value;

    // this means thats is zero char then it ask for fill the fields
    if(!selectedDay.length == 0 || !selectTime || !selectedAction){
        alert('Please fill in fields');
        return ;
    }
       // save to chrome strg
       chrome.storage.sync.set({
        schedule:{
            days: selectedDay,
            time : selectedTime,
            action: selectedAction
        },
        // once its all saved and done this will save it and notfy 
        function(){
            alert('Schedule Saved!');
        }
    
    });
});
 
    // add animation to the popup

// will close pop up below 
document.getElementById("popup").style.display="none";

document.addEventListener("DOMComtentloaded",()=>{
    console.log("Buttons on the page: ", document.querySelectorAll("Button"));
}
)
function togglepopup() {
    let popup = document.getElementById('popup');
    if (popup.style.display === 'none' || popup.style.display === 'empty' || popup.style.display === '') {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}



 function handleAction(request){
    if(request ===' Emails Cleared!'){
        action.ClearEmails();
    }
    else if( request === ' Reminders Sent!'){
        action.sendReminders();
    }
    else {
        console.log( 'invalid action');
    }
 }
  function action(request){
   if(action(request) ==='Clear Emails'){
    console.log(' Emails Cleared');    
   }
 else if (action(request) === 'Send Reminder'){
    console.log('Reminder Sent');
 }
 chrome.runtime.onMessage.addLIstener((message, sender, sendResponse)=>{
    if(message.action && action[message.action]){
    action[message.action]()
    }
});


}

