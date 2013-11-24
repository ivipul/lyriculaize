<!DOCTYPE html>
<html lang="en">
 
  <head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
 
    <div class="container">
      <input class="typeahead" type="text" data-provide="typeahead" autocomplete="off">
    </div><!-- /.container -->
 
    <!-- Le javascript -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
 
    <script type="text/javascript">
      $(document).ready(function() {
		console.log("inside ready");
        $('input.typeahead').typeahead({
          source: function (query, process) {
			console.log(query);
			console.log(process);
            $.ajax({
              url: 'index.php',
              type: 'POST',
              dataType: 'JSON',
              data: {
					type: "artist",
					val: query,<!DOCTYPE html>
<html lang="en">
 
  <head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
 
    <div class="container">
      <input class="typeahead" type="text" data-provide="typeahead" autocomplete="off">
    </div><!-- /.container -->
 
    <!-- Le javascript -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
 
    <script type="text/javascript">
      $(document).ready(function() {
		console.log("inside ready");
        $('input.typeahead').typeahead({
          source: function (query, process) {
			console.log(query);
            $.ajax({
              url: 'index.php',
              type: 'POST',
              dataType: 'JSON',
              data: {
					type: "artist",
					val: query,
					action:"getAutoSuggestData"
				},
              success: function(data) {
                console.log(data);
                process(data);
              }
            });
          }
        });
      });
    </script>
 
  </body>
</html>
					action:"getAutoSuggestData"
				},
              success: function(data) {
                console.log(data);
                process(data);
              }
            });
          }
        });
      });
    </script>
 
  </body>
</html>