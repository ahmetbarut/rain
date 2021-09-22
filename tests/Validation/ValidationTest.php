<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class ValidationTest extends TestCase
{
    public function testRule(): string | bool
    {
        $this->assertTrue(true);
        return "first";
    }
}