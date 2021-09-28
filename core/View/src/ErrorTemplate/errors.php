<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?=$message?></title>
    <style>
        *{
        margin: 0;padding:0
        }
        .error
        {
            width: 200px;
            border: 1px solid #2d2d2d;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
        }
    </style>
</head>
<body style="position: relative">
    <div class="error" style="position:absolute;padding: 25px;top: 0;background-color: aliceblue; height: 50vh; width: 100%">
        <?=$message?>:<?=$line?><br>
        <?=str_replace(md5($viewName),$viewName, $file)?><br>
    </div>
</body>
</html>