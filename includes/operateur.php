<?php
$cameroonOperators = [
    'MTN' => [
        'prefixes' => ['2376', '237650', '237651', '237652', '237653', '237654', '23767', '23768'],
        'sms_length' => 160,
        'cost_per_sms' => 25 // FCFA
    ],
    'Orange' => [
        'prefixes' => ['2379', '237655', '237656', '237657', '237658', '237659'],
        'sms_length' => 160,
        'cost_per_sms' => 25 // FCFA
    ]
];

function detectOperator($phoneNumber) {
    global $cameroonOperators;
    
    $phoneNumber = preg_replace('/[^0-9]/', '', $phoneNumber);
    
    foreach ($cameroonOperators as $operator => $data) {
        foreach ($data['prefixes'] as $prefix) {
            if (strpos($phoneNumber, $prefix) === 0) {
                return $operator;
            }
        }
    }
    
    return 'Autre';
}
?>