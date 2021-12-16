$('#Nationalresorts').ready(function() {
    $.ajax({
        url: 'http://localhost:8080/api/country/view-homepage',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: 
        function (response) 
        {
            console.log("Venue Successfully Patched!");
            console.log(response);
            $('#nationalResortContent>div').remove();
            showCountry(response);
        }
        ,
        error: function (jqXHR) {
            // log the error to the console
            console.log("The following error: " + textStatus, errorThrown);
        },
        complete: function () {
            console.log("Venue Patch Ran");
        }
    })
})
function showCountry(response)
{
    let countryArray=response.content;
    let size=countryArray.length;
    if(size>3)
    {
        size=3;
    }
    let nationalResortContent=$('#nationalResortContent');
    for(let i=0;i<size;i++)
    {
        let template = Handlebars.compile( $("#nation-template").html());
        let contentVAL={
            link:countryArray[i].link,
            image:countryArray[i].image,
            name:countryArray[i].name
        }
        nationalResortContent.append(template(contentVAL));
    }
}
