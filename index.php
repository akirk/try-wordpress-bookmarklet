<?php
// Get the contents of launcher.js
$js_content = file_get_contents('launcher.js');

// Minify the JavaScript code
$minified_js = jsmin($js_content);

// Add void(0) statement at the end to prevent navigation
$minified_js .= 'void(0);';

// Generate the bookmarklet
$bookmarklet = 'javascript:' . rawurlencode($minified_js);

// Display the link to the bookmarklet
echo '<a href="' . $bookmarklet . '">Try WordPress</a>';

// JavaScript minification function
function jsmin($js) {
    // Remove all comments
    $js = preg_replace('!/\*.*?\*/!s', '', $js);
    $js = preg_replace('/\/\/.*/', '', $js);

    // Minify each line by removing extra whitespace
    $js = preg_replace('/\s+/', ' ', $js);

    return $js;
}
