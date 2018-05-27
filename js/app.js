// This programs adds pagination and a search bar to a long list of student records

// variable declarations
const studentList = document.querySelectorAll('.student-list li');
let pageNum = getNumberOfPages(studentList);
const max = 10;

// create elements
const parent = document.querySelector(".page");
const pageDiv = document.createElement('div');
pageDiv.className = "pagination";
parent.appendChild(pageDiv);
let pageULs = document.createElement('ul');
pageDiv.appendChild(pageULs);
pageULs = document.querySelector('.pagination ul');
const searchParent = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchParent.appendChild(searchDiv);
searchDiv.className = "student-search";
const searchInput = document.createElement('input');
searchInput.type = "search";
searchInput.id = "mySearch";
searchInput.name = "q";
searchInput.autocomplete = "on";
searchInput.placeholder = "Search for students...";
searchDiv.appendChild(searchInput);
const searchButton = document.createElement('button');
searchButton.textContent = "Search";
searchDiv.appendChild(searchButton);
let messageDiv = document.createElement('div');
messageDiv.className = "search-results";
parent.insertBefore(messageDiv, pageDiv);

// functions
function getNumberOfPages (list) {
    return Math.floor(list.length / 10) + 1;
}

function createPageLinks(count) {
  pageULs.innerHTML = "";
  for (let i = 0; i < count; i++) {
    let li = document.createElement('li');
    pageULs.appendChild(li);
  }
  const pageLis = document.querySelectorAll('.pagination li');
  for (let i = 0; i < count; i++) {
    pageLis[i].innerHTML = `<a href="#">${i+1}</a>`;
  }
}

// function createSearchLinks(count) {
//   for (let i = 0; i <= count; i++) {
//     let li = document.createElement('li');
//     messageDiv.appendChild(li);
//   }
//   const searchLis = document.querySelectorAll('.search-results li');
//   for (let i = 0; i <= count; i++) {
//     searchLis[i].innerHTML = `<a href="#">${i+1}</a>`;
//   }
// }

//function shows which students should be show on the current page
function showRecords(list, page) {

  // hide all records and clear messages
  for (let i = 0; i < list.length; i++) {
    list[i].style.display = "none";
  }
  messageDiv.innerHTML = "";

  // show only the selected range of records
  let begIndex = page * 10 - 10;
  for (let i = begIndex; i < (begIndex + max); i++) {
    if (i >= list.length) {
      break;
    }
    list[i].style.display = "block";
  }
  // create pagination
  createPageLinks(pageNum);
}

function searchList(terms) {
  // hide all records and clear messages
  for (let i = 0; i < studentList.length; i++) {
    studentList[i].style.display = "none";
  }
  messageDiv.innerHTML = "";
  let searchCount = 0;

  // search for match of input
  const h3s = document.querySelectorAll('h3');
  const emails = document.querySelectorAll('.email');
  let message = [];
  for (let i = 0; i < studentList.length; i++) {
    if (h3s[i].textContent.indexOf(terms) >= 0 || emails[i].textContent.indexOf(terms) >= 0) {
      message.push(studentList[i]);
    }
  }
  if (message.length === 0) {
    messageDiv.innerHTML = "<p>Sorry, no results found.</p>";
    return;
  }
  for (let i = 0; i < message.length; i++) {
    message[i].style.display = "block";
    parent.insertBefore(message[i], pageDiv);
    searchCount++;
  }
  createPageLinks(searchCount);
  message = [];
}

// show the first 10 students when the page loads
showRecords(studentList, 1);

// shows the correct records for the page selected via the page links
pageULs.addEventListener('click', (event) => {
  showRecords(studentList, event.target.text);
});

searchButton.addEventListener('click', () => {
  const searchTerms = mySearch.value;
  searchTerms.toLowerCase();
  searchList(searchTerms);
  mySearch.value = "";
});
