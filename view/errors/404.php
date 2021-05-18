<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hata</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <style>
        span {
            background-color: rgb(0, 0, 0);
        }

        .d-flex {
            /*    top: 160px;
            right: 350px; */
        }

        h1 {
            font-size: 70px;
        }
    </style>
</head>

<body style="background-color: rgb(248, 232, 232);">
    <div class="d-flex align-items-center justify-content-center">
        <div class="col-6 text-center">
            <h1 class="font-weight-bold"><?= $code ?></h1>
            <?= $message ?> <?php if ($uri !== null) : ?> <br><span class="p-1 rounded text-white"><?= $uri ?></span>&nbsp;URL tanımlanmamış olabilir <?php endif; ?>
        </div>
    </div>
</body>

</html>