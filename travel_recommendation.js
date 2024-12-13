const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const searchInput = document.getElementById('searchInput')
const resultDiv = document.getElementById('result');

function displaySocial(){
    return '<div class="line"></div> \
    <div class="social"> \
    <i class="fa fa-brands fa-twitter"></i> \
    <i class="fa fa-brands fa-facebook"></i> \
    <i class="fa fa-brands fa-instagram"></i> \
    <i class="fa fa-brands fa-youtube"></i> \
</div>';
}

function printHome() {
    document.getElementById("social-logo").innerHTML = displaySocial();
}



function searchCondition() {
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let input = searchInput.value.toLowerCase();
        resultDiv.innerHTML = '';
        let result='';
        
        console.log(data);

        if (input == "country")
            input = "countries";
        else if (input == "beach")
            input = "beaches";
        else if (input == "temple")
            input = "temples";
        else
            result=data.countries.find(country => country.name.toLowerCase() === input);

        if (data.hasOwnProperty(input.toLowerCase())) {
            result = data[input];
        } else if (result) {
            result = result.cities;
        }
        console.log(" Result:"+ result);
        if (result) {
            if (input == "countries"){
                data.countries.forEach(country => {
                    printResult(country.cities);
                });
            }
            else   
                printResult(result);

        }
       })     
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = '';
    });
}
function printResult(result) {
    console.log(result);
    result.forEach(item => {
        const resultSubDiv = document.createElement('div');
        resultSubDiv.classList.add('subResult');
        resultSubDiv.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button>Visit</button>
      `;
      resultDiv.appendChild(resultSubDiv);
    });
}

function clearAll() {
    resultDiv.innerHTML = '';
    searchInput.value = '';
}
btnSearch.addEventListener('click', searchCondition);
btnClear.addEventListener('click', clearAll);