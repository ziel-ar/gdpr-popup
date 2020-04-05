"use strict";

var vendorlist;
var acceptedVendorsIds;

if (window.location.protocol === "https:") {
  var requestURL = "./assets/vendors.json";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function() {
    vendorlist = sortAlphabetically(request.response.vendors);

    if (!checkCookie("gdpr")) {
      generatePopup();
      populateVendors();
    }
  };
} 

function generatePopup() {
  var popup = document.createElement("div");
  var content = document.createElement("div");
  var header = document.createElement("h3");
  var vendors = document.createElement("div");
  var vendorsTable = document.createElement("table");
  var vendorsThead = document.createElement("thead");
  var vendorsTr = document.createElement("tr");
  var vendorsTh1 = document.createElement("th");
  var vendorsTh2 = document.createElement("th");
  var vendorsTh3 = document.createElement("th");
  var vendorsTbody = document.createElement("tbody");
  var acceptBtn = document.createElement("button");
  var rejectBtn = document.createElement("button");
  popup.classList.add("popup");
  content.classList.add("popup__content");
  header.textContent = "GDPR consent";
  vendors.classList.add("popup__vendors");
  vendorsTable.classList.add("popup__table");
  vendorsTr.classList.add("popup__table__tr");
  vendorsTh1.textContent = "Company";
  vendorsTh2.textContent = "Privacy policy";
  vendorsTh3.textContent = "Acceptation";
  vendorsTh1.classList.add("popup__table__th");
  vendorsTh2.classList.add("popup__table__th");
  vendorsTh3.classList.add("popup__table__th");
  vendorsTbody.classList.add("popup__vendors__tbody");
  acceptBtn.classList.add("popup__button", "popup__button--accept");
  acceptBtn.textContent = "Accept";
  rejectBtn.classList.add("popup__button");
  rejectBtn.textContent = "Reject";
  document.body.appendChild(popup);
  popup.appendChild(content);
  content.appendChild(header);
  content.appendChild(vendors);
  content.appendChild(acceptBtn);
  content.appendChild(rejectBtn);
  vendors.appendChild(vendorsTable);
  vendorsTable.appendChild(vendorsThead);
  vendorsTable.appendChild(vendorsTbody);
  vendorsThead.appendChild(vendorsTr);
  vendorsTr.appendChild(vendorsTh1);
  vendorsTr.appendChild(vendorsTh2);
  vendorsTr.appendChild(vendorsTh3);

  acceptBtn.onclick = function() {
    updateAcceptedVendorsIds();
    setCookie("gdpr", "accepted", 5);
    setCookie("vendors", acceptedVendorsIds, 10);
    document.body.classList.remove("popup--open");
    document.body.removeChild(popup);
  };

  rejectBtn.onclick = function() {
    setCookie("gdpr", "rejected", 5);
    setCookie("vendors", "", 0);
    document.body.classList.remove("popup--open");
    document.body.removeChild(popup);
  };

  document.body.classList.add("popup--open");
}

function populateVendors() {
  for (var i = 0; i < vendorlist.length; i++) {
    var vendorsTbody = document.querySelector(
      ".popup__vendors__tbody"
    );
    var vendorsTr = document.createElement("tr");
    var vendorsTd1 = document.createElement("td");
    var vendorsTd2 = document.createElement("td");
    var vendorsTd3 = document.createElement("td");
    var vendorsLink = document.createElement("a");
    var vendorsInput = document.createElement("input");
    vendorsTr.classList.add("popup__table__tr");
    vendorsTd1.textContent = vendorlist[i].name;
    vendorsTd1.classList.add("popup__table__td");
    vendorsTd2.classList.add("popup__table__td");
    vendorsTd3.classList.add("popup__table__td");
    vendorsLink.textContent = vendorlist[i].policyUrl;
    vendorsLink.setAttribute("href", vendorlist[i].policyUrl);
    vendorsInput.classList.add("popup__vendors__input");
    vendorsInput.setAttribute("type", "checkbox");
    vendorsInput.setAttribute("data-vendor-id", vendorlist[i].id);
    vendorsTbody.appendChild(vendorsTr);
    vendorsTr.appendChild(vendorsTd1);
    vendorsTr.appendChild(vendorsTd2);
    vendorsTr.appendChild(vendorsTd3);
    vendorsTd2.appendChild(vendorsLink);
    vendorsTd3.appendChild(vendorsInput);
    vendorsTd3.classList.add("popup__table__input");

    if (!checkCookie("vendors")) {
      vendorsInput.checked = true;
    } else {
      acceptedVendorsIds = getCookie("vendors").split(",");

      for (var j = 0; j < acceptedVendorsIds.length; j++) {
        if (acceptedVendorsIds[j] == vendorlist[i].id) {
          vendorsInput.checked = true;
        }
      }
    }
  }
}

function updateAcceptedVendorsIds() {
  console.log(vendorlist);
  acceptedVendorsIds = [];

  for (var i = 0; i < vendorlist.length; i++) {
    var vendor = document.querySelectorAll(".popup__vendors__input")[i];

    if (vendor.checked) {
      acceptedVendorsIds.push(vendor.getAttribute("data-vendor-id"));
    }
  }
} 

function setCookie(cname, cvalue, exseconds) {
  var d = new Date();

  d.setTime(d.getTime() + exseconds * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

function checkCookie(cname) {
  var data = getCookie(cname);

  if (data === "") {
    return false;
  } else {
    return true;
  }
}

function sortAlphabetically(obj) {
  obj.sort(function(a, b) {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }

    if (b.name.toLowerCase() > a.name.toLowerCase()) {
      return -1;
    }

    return 0;
  });
  return obj;
}
