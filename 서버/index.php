<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>테스트</title>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
    <script>
        $(document).ready(function(){
            $('input[type="submit"]').click(function(e){
                e.preventDefault();
                let form = $('#formTest')[0];
                let formData = new FormData(form);
                console.log(form);
                console.log(formData);
                $.ajax({
                    contentType: false,       // The content type used when sending data to the server.
                    cache: false,             // To unable request pages to be cached
                    processData: false,        // To send DOMDocument or non processed data file it is set to false
                    type: "POST",
                    url: './send_email.php',
                    data: formData,
                    progress: function (e) {
                        console.log('??');
                    },
                    error: function (request, textStatus, errorThrown) {
                        // alert(textStatus);
                        alert("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + errorThrown);
                    },
                    success : function(){
                      console.log('성공');
                      $('input[type="submit"]').css('background','red')
                    }
                })
            })
        })
    </script>
</head>
<body>
    <form id="formTest">
        <fieldset>
          <input type="text" id="test" name="userName">
          <input type="submit" value="테스트">
        </fieldset>
      </form>
      <a href="send_email.php">test</a>
</body>
</html>