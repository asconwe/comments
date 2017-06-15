$(document).ready(function () { 
    $('.comments').click(function () { 
        // Get object_id for target
        var _id = $(this).data("object_id");
        // Get comment form HTML
        var commentForm = $('.comment-form');
        commentForm.prepend('<input type="hidden" name="_id" value="' + _id + '">');
        // Add the comment form 
        $("#" + _id).append(commentForm);
        
        $.get("/api/comments/" + _id).done(function (result) { 
            console.log(result);
        })
    })

    $('.cancel').click(function (e) { 
        e.preventDefault();
    })
})   