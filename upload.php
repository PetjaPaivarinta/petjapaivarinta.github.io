<?php
if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Text to send if user hits Cancel button';
    exit;
} else {
    echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
    echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as your password.</p>";
}
?>

<?php
require_once("handler-php/PluploadHandler.php");

$ph = new PluploadHandler(array(
	'target_dir' => 'uploads/',
	'allow_extensions' => 'jpg,jpeg,png'
));

$ph->sendNoCacheHeaders();
$ph->sendCORSHeaders();

if ($result = $ph->handleUpload()) {
	die(json_encode(array(
		'OK' => 1,
		'info' => $result
	)));
} else {
	die(json_encode(array(
		'OK' => 0,
		'error' => array(
			'code' => $ph->getErrorCode(),
			'message' => $ph->getErrorMessage()
		)
	)));
}
?>