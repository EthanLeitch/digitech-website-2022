const changeThemeToLight = () => {
    document.documentElement.setAttribute("data-theme", "light")//set theme to light
    localStorage.setItem("data-theme", 'light')
}
const changeThemeToDark = () => {
    document.documentElement.setAttribute("data-theme", "dark")//set theme to dark
    localStorage.setItem("data-theme", "dark")
}
changeThemeToDark();

// Get the element based on ID
const checkbox = document.getElementById("switch");
let theme = localStorage.getItem('data-theme');

// Apply retrived them to the website
checkbox.addEventListener('change', () => {
    //alert("ARGAIOSFDVSERNGIVN");
    let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage
    if (theme ==='dark'){
        changeThemeToLight()
    }else{
        changeThemeToDark()
    }   
});