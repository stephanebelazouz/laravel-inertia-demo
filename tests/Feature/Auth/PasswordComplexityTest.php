<?php

use App\Rules\PasswordComplexityRule;

it('accepts a valid password', function () {
    $rule = new PasswordComplexityRule(
        regex: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/',
        description: ['Test rule']
    );

    expect(
        $rule->validate('password', 'Valid123', fn () => throw new Exception('Invalid'))
    )->toBeNull();
});

it('rejects an invalid password', function () {
    $rule = new PasswordComplexityRule(
        regex: '/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/',
        description: ['Test rule']
    );

    $this->expectExceptionMessage('Test rule');

    $rule->validate('password', 'weak', function ($msg) {
        throw new Exception($msg);
    });
});