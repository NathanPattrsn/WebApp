var pageCounter = 1;
var moduleContainer = document.getElementById('module-info');
var btn = document.getElementById("btn");

btn.addEventListener("click", function(){
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://raw.githubusercontent.com/profharimohanpandey/CW2/master/module-'+ pageCounter +'.json');
  ourRequest.onload = function(){
    //console.log(ourRequest.responseText);
    var ourData = JSON.parse(ourRequest.responseText);
    //console.log(ourData[0]);
    renderHTML(ourData);
  };
  ourRequest.send();
pageCounter++;
if (pageCounter > 3){
//btn.classList.add("hide-me");
  btn.disabled = true;
}
});

function renderHTML(data){
  var htmlString = "";

  for(i = 0; i < data.length; i++){
    htmlString += "<p>" + data[i].Name + " is a " + data[i].Course + " has assements "; //".</p>";
    for(ii = 0; ii < data[i].Module.Assignment.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.Assignment[ii];
      } else {
        htmlString += " and " + data[i].Module.Assignment[ii];
      }
    }
    htmlString += ' and Learning Outcome ';
    for(ii = 0; ii < data[i].Module.Learning_outcomes.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.Learning_outcomes[ii];
      } else {
        htmlString += " and " + data[i].Module.Learning_outcomes[ii];
      }
    }

    htmlString += ' and Volume ';
    for(ii = 0; ii < data[i].Module.Volume.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.Volume[ii];
      } else {
        htmlString += " and " + data[i].Module.Volume[ii];
      }
    }

    htmlString += ' and weights ';
    for(ii = 0; ii < data[i].Module.weights.length; ii++){
      if (ii == 0){
        htmlString += data[i].Module.weights[ii];
      } else {
        htmlString += " and " + data[i].Module.weights[ii];
      }
    }
    htmlString += '.</p>';
  }
  moduleContainer.insertAdjacentHTML('beforeend', htmlString);

}; //all code above is pre-loaded code for "fetch info" button to collect text from Hari git repo and combine it with module 1,2,3 json files
//all code for form begins below
let courses = []; //course variable is declared and set with a addable value

const addCourse = (ev)=>{
  ev.preventDefault();
  let course = {
    id: Math.floor(Math.random() * 100), //so the ID of the module and degree entered is attacked with a random number between 1 & 100
    degree: document.getElementById('degree').value, //degree variable declared with the value of the degree variable used in html file
    module: document.getElementById('module').value //module variable declared with the value of the module variable used in html file
  }
  courses.push(course); 
  document.forms[0].reset(); //this clears both input boxes after user has submitted information

  console.warn('added', {courses} ); //user is warned the info has been added
  let pre = document.querySelector('#msg pre');
  pre.textContent = '\n' + JSON.stringify(courses, '\t', 2); 

  localStorage.setItem('CourseList', JSON.stringify(courses) ); //info entered is then saved locally
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('btn2').addEventListener('click', addCourse); //code for button to add user input to webpage
});
//user input (degree and module form section) ends here
