/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate

const studentList = document.querySelector(".student-list");
const students = document.querySelectorAll(".student-list li");
const parentEl = document.querySelector(".page");

// Setting some base variables to use later in our functions

let page = 1;
let maxPageLength = 10;
let pageCount = Math.ceil(students.length / maxPageLength);


// Create a function to hide all of the items in the list excpet for the ten you want to show

let showPage = (page, students) => {

  // Loop through the list of students
  for (let i = 0; i < students.length; i++) {

    // Ternary operator showing the truncated list of students by page
    (i >= (page - 1) * maxPageLength) && (i < page * maxPageLength)
    ? (students[i].style.display = "block")
    : (students[i].style.display = "none");
  }

};

// Create and append the pagination links - Creating a function that can do this is a good approach


let appendPageLinks = (students) => {

  // Setting some variables to create DOM elements
  let pageContainer = document.createElement("div");
  let pagerList = document.createElement("ul");

  // Setting classname for div element
  pageContainer.className = "pagination";
  pageContainer.appendChild(pagerList);

  // Looping through our student list and creating our pagination links
  for(let i = 1; i <= pageCount; i++) {

    // Setting some variables to create our list items and anchor links
    let pagerListItem = document.createElement("li");
    let pagerAnchor = document.createElement("a");
    let pagerChildren = pagerList.children;

    // Setting our anchor's innerHTML to be equal to its index in the array
    pagerAnchor.innerHTML = i;

    // Setting our anchor links attributes to contain a hash and appending our list and anchors to their parent elements
    pagerAnchor.setAttribute("href", "#");
    pagerList.appendChild(pagerListItem);
    pagerListItem.appendChild(pagerAnchor);

    // Adding an event listener to listen to the click event and setting/removing the active class on that event's target
    pagerAnchor.addEventListener("click", function(event){
      showPage(event.target.innerHTML, students);
      for (let i = 0; i < pagerChildren.length; i++) {
        pagerChildren[i].children[0].classList.contains("active")
        ? pagerChildren[i].children[0].classList.remove("active")
        : '';
      }
      event.target.classList = "active";
    })
  }
  // Bringing all the HTML together to form our pagination
  parentEl.appendChild(pageContainer);

};

// Showing the first 10 students in the list
showPage(1, students);

// Setting the pagination and injecting it into the DOM
appendPageLinks(students);