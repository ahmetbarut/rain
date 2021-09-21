<?php


return [
    'rules' => [
        'tck_no' => App\Rules\TCKNo::class,
        'plate_number' => App\Rules\PlateNumber::class,
        'accepted' => App\Rules\CheckBox::class,
    ],
];