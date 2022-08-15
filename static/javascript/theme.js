// theme.js

// Get the element based on ID
const checkbox = document.getElementById("switch");
let theme = localStorage.getItem('data-theme');

const changeThemeToLight = () => {
    checkbox.checked = false;
    document.documentElement.setAttribute("data-theme", "light") //set theme to light
    localStorage.setItem("data-theme", "light")
}

const changeThemeToDark = () => {
    checkbox.checked = true;
    document.documentElement.setAttribute("data-theme", "dark") //set theme to dark
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