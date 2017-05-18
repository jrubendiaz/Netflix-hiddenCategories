/* We will use the endpoint json file generated previusly by categories.php as data source */
const endpoint = 'http://www.airforcechallenge.es/js/categories.json';

/* Initialize and format the data in order to use them */
const categories = [];
fetch(endpoint, {mode: 'no-cors'})
    .then(blob => blob.json())
    .then(data => {
        data.forEach(cat =>{
            cat.nombre = cat.nombre.replace('&amp;', '&');
        })
        //adding to our store
        categories.push(...data)
    });

/* we look for matches between our store and the data typed by the search input */
function findMatches(wordToMatch, categories) {
    return categories.filter(category =>{
        const regEx = new RegExp(wordToMatch, 'gi');
        return category.nombre.match(regEx);
    })
}
/*  1 - Check if search input is empty
    2 - Looking for matches
    3 - Check if we have something to show
    4 - Build html elements
    5 - Elements to the DOM
*/

function displayMatches() {    
    if(this.value == ""){
        // 1 - Empty input?
        suggestions.innerHTML= '<li>Filter for a category or a genre</li>';
        return;
    }
    // 2 - Looking for matches
    const matchArray = findMatches(this.value, categories);
    let html;
    if(matchArray.length > 0){
        // 3 - Something to show?
        html = matchArray.map(category =>{
            // 4 - Build html element
            const regEx = new RegExp(this.value, 'gi');
            let url=`http://www.netflix.com/browse/genre/${category.id}`;
            const categoryName = category.nombre.replace(regEx, `<span class="hl">${this.value}</span>`);
            return `
            <li>
                <a href="${url}" target="_blank">
                    <span class="name">${categoryName}</span>
                </a>
            </li>
            `;
        }).join('');
    }else{
        //We have not something to show
        html = "No matches to show";
    }
    // 5 - Elements to the DOM    
    suggestions.innerHTML = html;
}

/* 
    MAYBE WE CAN IMPROVE WITH TOGGLE FUNCTIONS
    1 - Take and build the elements to show links to return
    2 - Check if the active element is a link from suggestion
    3 - Animations of selected suggestion and "navigate to" element

*/
function activatedElement(){
    // 1 - Taking elements
    const links = document.querySelectorAll('a'); // suggestions
    const element = document.activeElement; // active element by tab

    //"navigate to" link container
    const activeLink = document.querySelector('.active-link'); 
        const link = activeLink.querySelector('.link');
        link.innerHTML = " ";

    links.forEach(a =>{
        // 3 - Animations off
        a.classList.remove("active");
        activeLink.classList.remove('on');
    });
    // 2 - Check if the element is a link
    if(element.tagName =="A"){
        let html = `<div id="navigate-to">${element.attributes.href.value}</div>`;
        link.innerHTML = html;

        // 3 - Animations on
        activeLink.classList.add('on');
        element.classList.add("active");        
    }
}

// Taking the elements we need
const searchInput = document.querySelector('.search');
    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', displayMatches);

const suggestions = document.querySelector('.suggestions');

const links = document.querySelectorAll('a');
    links.forEach(a =>{
        a.addEventListener('keyup', activatedElement);
    })
// Global listener of keyup
document.addEventListener('keyup', activatedElement);
