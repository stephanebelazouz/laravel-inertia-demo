<?php

use App\Rules\PasswordComplexityRule;
use Illuminate\Support\Facades\Validator;

it('accepts a valid password', function () {
    $rule = new PasswordComplexityRule(
        regex: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/',
        description: []
    );

    $validator = Validator::make([
        'password' => 'Valid123'
    ], [
        'password' => [$rule],
    ]);

    expect($validator->fails())->toBeFalse();
});

it('rejects an invalid password', function () {
    $rule = new PasswordComplexityRule(
        regex: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/',
        description: ['min 8 chars', 'one number']
    );

    $validator = Validator::make([
        'password' => 'abc'
    ], [
        'password' => [$rule],
    ]);

    expect($validator->fails())->toBeTrue();
});
