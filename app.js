
const button = document.createElement('button');


button.textContent = 'Press me';
document.body.appendChild(button);
button.setAttribute('class', 'btn btn-primary')
document.querySelector('.container').appendChild(button);

button.addEventListener('click', function() {
    fetchAll('https://swapi.dev/api/planets', []).then(function(planets){
        outputPlanets(planets);
    })
});

function fetchAll(url, planets) {
    return new Promise(function(resolve, reject) {
        return fetch(url).then(function(res){
            return res.json()
    }).then(function(data){
        planets = planets.concat(data.results);
        console.log(planets);
        if(data.next) {
            fetchAll(data.next, planets).then(resolve);
        } else {
            let arr = planets.map(function(item){
                return {
                    name:item.name, 
                    films:item.films
                    };
                })
            resolve(arr);
        }

            
        })
    });
}



const output = document.createElement('div');
document.body.appendChild(output);
document.querySelector('.container').appendChild(output);

function outputPlanets(data) {
    data.forEach(function(item) {
        console.log(item);
        const div = document.createElement('div');
        div.textContent = item.name;
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'list-group')


        for(let x = 0; x < item.films.length; x++) {
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item')

            li.textContent = item.films[x];
            ul.appendChild(li);
            

        }
        div.appendChild(ul);
        output.appendChild(div);
    });
    
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
        outputPlanets(planets);
    });


}
