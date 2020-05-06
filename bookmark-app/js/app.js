// Listen for the submit event
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark 
function saveBookmark(event) {
    // prevent the form from submitting immediately
    event.preventDefault();
    
    // declaring variables
    const siteName = document.getElementById('siteName').value;
    const siteUrl = document.getElementById('siteUrl').value;

    if (!validate(siteName, siteUrl)) {
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    let bookmarks;

    // Test to check whether the local storage is empty
    if (localStorage.getItem('bookmarks') === null) {
        // Create an array to store the bookmark object
        bookmarks = [];
        // push the bookmark object to the array
        bookmarks.push(bookmark);
        // store the array in the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get back the array from the local storage
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // check whether the bookmark has already been used
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].name === siteName || bookmarks[i].url === siteUrl) {
                // clear form
                document.getElementById('myForm').reset();
                alert('The bookmark already exists');
                return false;
            }
        }
        // push the bookmark object to the array
        bookmarks.push(bookmark);
        // store the updated array in the local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset();

    // re-fetch bookmarks
    fetchBookmarks();
}

// Delete bookmark
function deleteBookmark(url) {
    // get the bookmarks from the local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    // store the updated array in the local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // get the bookmarks from the local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // get the output id
    const bookmarksResults = document.getElementById('bookmarksResults');
    // build the output
    bookmarksResults.innerHTML = '';
    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="card">'+
                                      '<div class="card-body">'+
                                      '<h5 class="card-title">'+name+'</h5>'+
                                      '<a class="btn btn-outline-info" target="_blank" href="'+url+'">Visit</a>'+
                                      '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-outline-danger mx-2" href="#">Delete</a>'+
                                      '</div>'+
                                      '</div>';
        
        
        

                                       //'<div class="card bg-light text-dark card-body">'+
                                      //'<h5 class="card-title">'+name+'</h5>'+
                                      //'<a class="btn btn-outline-info" target="_blank" href="'+url+'">Visit</a>'+
                                      //'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-outline-danger" href="#">Delete</a>'+
                                      //'</div>';
    }
}

// Validate Form
function validate(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }
    
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    
    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}







