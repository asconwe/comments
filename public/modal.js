$(document).ready(function () { 
    $('.comments').click(function () { 
        $('.modal').show();
        console.log('hey')
    })

    $('.close').click(function () { 
        $('.modal').hide();
    })
})   