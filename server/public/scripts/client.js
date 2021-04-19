console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    $('#addJokeButton').on('click', (function () {
        console.log('clicked');
        event.preventDefault();
        addJoke();        
    }));
    getJokes();
}

function addJoke(){
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokeQuestion: $('#questionIn').val(),
        punchLine: $('#punchlineIn').val(),
    }
    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke,
    })
    .then( function (response){
        console.log('Added joke');
        getJokes();
    })
    .catch( function(error){
        console.log('Error', error);
    })
    $('#whoseJokeIn').val('');
    $('#questionIn').val('');
    $('#punchlineIn').val('');
}// end addJoke

function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/jokes',
    })
    .then( function(response){
        console.log('Response from server', response);
        renderJoke(response);
    })
    .catch( function(error){
        console.log('Error from server', error);
    })
    console.log('After making server request...');
}//end getJokes

function renderJoke(jokes){
    $('#outputDiv').empty();
    for (let item of jokes){
        console.log(`${item.whoseJoke} ${item.jokeQuestion} ${item.punchLine}`);
        $('#outputDiv').append(`
        <div>
        <p>${item.whoseJoke}</p>
        <p>${item.jokeQuestion}</p>
        <p>${item.punchLine}</p>
        </div>
        `);
    }
}