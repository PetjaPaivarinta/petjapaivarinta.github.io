let sidebarState = false;
const field = document.getElementById("drag-field");
const dragDropElem = document.getElementById("dragdrop-text");
const dragDropText =
  "Click here to select files to upload or drag & drop them here!<br>(You can upload up to 10 files at the time.)";
const dragDropEventText = "Drop it here!";
function showSidebar() {
  sidebarState = !sidebarState;
  if (sidebarState) {
    document.getElementById("sidebar").className = "sidebar-full";
    document.getElementsByClassName("logo")[0].className = "logo-inv";
    document.getElementsByClassName("onhover logo")[0].className =
      "onhover logo-inv";
  } else {
    document.getElementById("sidebar").className = "sidebar";
    document.getElementsByClassName("logo-inv")[0].className = "logo";
    document.getElementsByClassName("onhover logo-inv")[0].className =
      "onhover logo";
  }
}
field.addEventListener("click", (event, element) => {
  document.getElementById("file-input").click();
});
function allowDrop(e) {
  dragDropElem.innerHTML = dragDropEventText;
  e.preventDefault();
}
function dropLeave(e) {
  dragDropElem.innerHTML = dragDropText;
  e.preventDefault();
}
function drop(e) {
  e.preventDefault();
  newDragDropInput(e);
}
dragDropElem.innerHTML = dragDropText;
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.setAttribute("download", name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
  document.getElementById("bmc-wbtn").click();
}
