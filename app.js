
const button = document.createElement('button');


button.textContent = 'Press me';
document.body.appendChild(button);
button.setAttribute('class', 'btn btn-primary')
document.querySelector('.container').appendChild(button);

button.addEventListener('click', function() {
    fetchData('https://swapi.dev/api/planets');
});
const output = document.createElement('div');
document.body.appendChild(output);
document.querySelector('.container').appendChild(output);

function outputPlanets(data) {

}

function fetchData(url) {
    fetch(url).then(function(res) {
        return res.json()
    }).then(function(data){
        output.textContent = `${data.count} result found`;
        if(data.next){
            const buttonNext = document.createElement('button');
            buttonNext.setAttribute('class', 'btn btn-primary m-2');
            buttonNext.textContent = 'Next';
            output.appendChild(buttonNext);
            buttonNext.addEventListener('click', function(){
                fetchData(data.next);
            });
        }
        const planets = data.results.map(function(item){
            console.log(item);
            return {name:item.name, films:item.films};
        })
        console.log(planets);
    })
}
