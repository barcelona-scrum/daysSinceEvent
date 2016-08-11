<html>
	<head>
		<title>Days since event</title>
	</head>
	<body style="text-align:center">
		<div style="font-size:300pt"><?php echo daysSinceDate($_GET["eventDate"]); ?></div>
		<div style="font-size:40pt; font-style:italic">days since <?php echo htmlspecialchars($_GET["eventDescription"]); ?></div>
	</body>
</html>
<?php

	function daysSinceDate($date)
	{
		$datetime = date_create($date);
		$datetimetoday = new DateTime();
		$interval = date_diff($datetime, $datetimetoday);
		$differenceFormat = '%a';
		return $interval->format($differenceFormat);
	}

?>
