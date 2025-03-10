if(!document.getElementById("gmail-prompt")){
// above is to check if the prompt is already there or not
const promptContainer=document.createElement('div');
promptContainer.id='gmail-prompt';
promptContainer.style = `
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 10000;
background: white;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
border-radius: 8px;
padding: 20px;
text-align: center;
animation: fadeIn 0.5s ease;
font-family: Arial, sans-serif;
width: 300px;
`;
}
// asking questions and buttons to container 

// main congainer for prompt
const promptContainer= document.createElement("div");
 const h3 = document.createElement("h3");
 h3.textContent= " Schedule  More Actions?";
 
 const PlannedAct= document.createElement("PlannedAct");
 PlannedAct.textContent= "See your planned actions";

 const Yesbtn=document.createElement("Yesbtn");
 Yesbtn.textContent="Yes";
 Yesbtn.textContent = "Yes";
Yesbtn.style.background = "#4CAF50";
Yesbtn.style.color = "white";
Yesbtn.style.padding = "10px 20px";
Yesbtn.style.border = "none";
Yesbtn.style.borderRadius = "4px";
Yesbtn.style.marginRight = "10px";



//adding animation to prompt
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);


(function () {
  console.log("Gmail Prompt Script Loaded");

  // Isolated logic: Adds a simple non-intrusive banner to Gmail
  const banner = document.createElement("div");
  banner.textContent = "This is Gmail Prompt running!";
  banner.style.position = "fixed";
  banner.style.top = "0";
  banner.style.left = "0";
  banner.style.width = "100%";
  banner.style.backgroundColor = "lightblue";
  banner.style.color = "black";
  banner.style.textAlign = "center";
  banner.style.zIndex = "10000";
  banner.style.padding = "10px";
  banner.style.fontSize = "16px";

  document.body.appendChild(banner);

  // Automatically remove the banner after 5 seconds
  setTimeout(() => {
    banner.remove();
  }, 5000);
})();
