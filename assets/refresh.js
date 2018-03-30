'use strict';
var url  = "http://localhost:8080/api";
var is_admin = false;

function login(username, password) {
    makePostRequest('/login', function(response) {
        is_admin = true;
    })
}

// Update our page data without reloading.
function refresh() {
    console.log('Client-side async refresh');
    makeGetRequest('/things', function(response) {
        renderThings(response);
    });
}

function doStuff() {
    makeGetRequest('/login', function(response) {

    })
}

// Delete our MongoDB data
function removeall() {
    // Only runs if user is admin... or does it?
    if (is_admin) {
        makeDeleteRequest('/things', function(response) {
            clearThings();
        });
    } else {
        console.log('Delete not allowed for non-admin users!');
        alert('Delete is not allowed for non-admin users!');
    }
}

function clearThings() {
    // Get the list element
    var el = document.getElementById('main-list');

    // Empty the list element
    var total = el.childNodes.length;
    for (let i = 0; i < total; i++) {
        el.removeChild(el.childNodes[0]);
    }
}

function renderThings(data) {
    // Get the list element
    var el = document.getElementById('main-list');

    // Empty the list element
    clearThings();

    // Refresh the list element with data
    for (let i = 0; i < data.length; i++) {
        let thing = data[i];
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', 'things/'+thing._id);
        a.setAttribute('style', 'color:'+thing.color+';text-decoration:none;');
        a.innerText = thing.name;
        li.append(a);
        el.append(li);
    }
}

// Reload to see new data every 5 seconds
//setInterval(refresh, 5000);



// Get
function makeGetRequest(endpoint, callback) {
    var xhr  = new XMLHttpRequest();
    xhr.open('GET', url + endpoint, true);
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(response);
        } else {
            console.error(response);
        }
    };
    xhr.send(null);
    return xhr;
}

// Post
function makePostRequest(endpoint, data, callback) {
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + endpoint, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 201) {
            callback(response);
        } else {
            console.error(response);
        }
    };
    xhr.send(json);
    return xhr;
}


// Update
function makePutRequest(endpoint, data, callback) {
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url + endpoint, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(response);
        } else {
            console.error(response);
        }
    };
    xhr.send(json);
}

// Delete
function makeDeleteRequest(endpoint, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + endpoint, true);
    xhr.onload = function () {
        console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(response);
        } else {
            console.error(response);
        }
    };
    xhr.send(null);
}