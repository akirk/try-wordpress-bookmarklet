<?php
// Get the contents of launcher.js
$js_content = file_get_contents('launcher.js');

// Minify the JavaScript code
$minified_js = jsmin($js_content);
$playground_script = file_get_contents('playground-script.js');
$playground_script = jsmin( $playground_script );
$playground_script = str_replace( "'", "\\'", $playground_script );

$minified_js = str_replace( 'PLAYGROUNDSCRIPT', $playground_script, $minified_js );
$minified_js = str_replace('OPENAI_API_KEY', getenv( 'OPENAI_API_KEY', true ), $minified_js);

// Add void(0) statement at the end to prevent navigation
$minified_js .= 'void(0);';

// Generate the bookmarklet
$bookmarklet = 'javascript:' . rawurlencode($minified_js);

// JavaScript minification function
function jsmin($js) {
    // Remove all comments
    $js = preg_replace('!/\*.*?\*/!s', '', $js);

    // Minify each line by removing extra whitespace
    $js = preg_replace('/\s+/', ' ', $js);

    return $js;
}

?>
<html>
<head>
    <title>Try WordPress</title>
</head>
<body>

Drag this to your bookmarks bar and launch it on another site:<br><a href="<?php echo $bookmarklet; ?>"><?php
// echo date('H:i:s');
?>Try WordPress</a>
</body>
</html>

