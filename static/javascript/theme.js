// theme.js

// Get the element based on ID
const checkbox = document.getElementById("switch");
let theme = localStorage.getItem('data-theme');

const changeThemeToLight = () => {
    // Toggle checkbox 
    checkbox.checked = false;
    // set theme in HTML body 
    document.documentElement.setAttribute("data-theme", "light")
    // Update theme in local storage 
    localStorage.setItem("data-theme", "light")
}

const changeThemeToDark = () => {
    // Toggle checkbox 
    checkbox.checked = true;
    // set theme in HTML body 
    document.documentElement.setAttribute("data-theme", "dark") 
    // Update theme in local storage 
    localStorage.setItem("data-theme", "dark")
}

// Check theme preference and set it 
if (theme == 'light'){
    changeThemeToLight()
} else {
    changeThemeToDark()
}

// Listen for a change in the button, and update theme accordingly
checkbox.addEventListener('change', () => {
    let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage
    if (theme == 'dark'){
        changeThemeToLight()
    } else {
        changeThemeToDark()
    }
});

// Remove the theme slider's animation preventation class once page has loaded
$(function() {
    $("#slider").removeClass("preload");
});