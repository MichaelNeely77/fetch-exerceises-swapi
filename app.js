const url = 'https://swapi.dev/api/planets';

function fetchData() {
    fetch(url).then(function(res) {
        return res.json()
    }).then(function(data){
        console.log(data);
    })
}
