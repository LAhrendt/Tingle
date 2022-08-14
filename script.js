$(document).ready(function() {
    var query = getUrlParameter("q");
    $("#query").val(query);

    var data = {
        apikey: "24mnMIv6lAJ4pz2nck8j3870sXA",
        dbowner: "lasse.ahrendt",
        dbname: "Skoler_i_Aarhus.db",
        sql: ""
    }
    var sqlQuery = "SELECT Skolenavn, Adresse FROM Skoler WHERE Skolenavn LIKE '%" + query + "%'";
    data.sql = btoa(sqlQuery);

    var dburl = "https://api.dbhub.io/v1/query"

    $.post(dburl, data, function(data, status) {
        if (status == "success") {
            // Gør noget
            $("#advarsel").hide();
            $("#results").empty();
            
            data = JSON.parse(data);
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                var text = '<div class="w3-panel">';
                for (var j = 0; j < data[i].length; j++) {
                    text += "<p>";
                    text += data[i][j].name;
                    text += ": "
                    text += data[i][j].value;
                    text += "</p>";
                }
                text += "</div>";
                $("#results").append(text);
            }

        } else {
            // Der er sket en fejl.
            $("#advarsel").show();
        }
    });
});


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};