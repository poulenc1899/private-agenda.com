$(document).ready(function() {

    //filtering the items
    $(".filter-button").click(function() {
        var cat = $(this).attr('id');
        $("#discography-list article ").each(function() {
            if ($(this).hasClass(cat))
                $(this).show();
            else
                $(this).hide();
        });
    });

    //displaying the preview info
    $(".all-discog-items a").mouseover(function() {
        //get data from link fields
        var releaseTitle = $(this).attr('data-title');
        var releaseFormat = $(this).attr('data-format');
        var releaseDate = $(this).attr('data-date');
        var thumbImageURL = decodeURIComponent($(this).attr('data-thumb'));
        //update the preview elements
        $("#discography-preview-title").text(releaseTitle);
        $("#discography-preview-format").text(releaseFormat);
        $("#discography-preview-date").text(releaseDate);
        $("#discography-preview-image").css("background-image", "url(" + thumbImageURL + ")");

    });
    //remove the preview on mouseout
    $(".all-discog-items a").mouseout(function() {
        $("#discography-preview-title").text("");
        $("#discography-preview-format").text("");
        $("#discography-preview-date").text("");
        $("#discography-preview-image").css("background-image", "none");

    });

});