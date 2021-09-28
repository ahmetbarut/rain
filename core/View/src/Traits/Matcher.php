<?php

namespace Mudita\View\Traits;

trait Matcher
{
    /**
     * Some keywords must end with a colon (:). We need to specify here.
     * @var array|string[] $escapeSemicolon
     */
    private array $escapeSemicolon = [
        'else',
    ];

    /**
     * While matching, it may be necessary to call some keywords,
     * namely our methods, from a class (Template engine).
     * The keywords here are specified to be called on the engine.
     * @var array|string[] $customKeywords
     */
    private array $customKeywords = ["startSection", "endSection", "yield", "extends"];

    /**
     * Retrieves the codes between the curly brackets.
     * @param $content
     *
     * @return array|string|null
     */
    public function brackets($content): array|string|null
    {
        return preg_replace_callback("/{{(.*)}}/isU", function ($match) {
            return "<?=" . htmlspecialchars(trim($match[1])) . "?>";
        }, $content);
    }

    /**
     * Runs all mappings.
     *
     * @param $content
     *
     * @return array|string|null
     */
    public function matchAllTags($content): array|string|null
    {
        $content = $this->brackets($content);
        $content = $this->startTagMatch($content);
        return $this->endMatch($content);
    }

    /**
     * Matches and replaces start tags. Ex: if, foreach, for etc.
     *
     * @param $content
     *
     * @return array|string|null
     */
    public function startTagMatch($content): array|string|null
    {
        return preg_replace_callback("/@([a-zA-Z_]+[(].*[)])/", function ($match) {

            if (preg_match("/([a-zA-Z_]+)/", $match[1], $key)) {
                if (in_array($key[0],$this->customKeywords)) {
                    return "<?php \$this->" . $match[1] . "; ?>";
                }

                if (function_exists($key[0])) {
                    return "<?= " . $match[1] . "; ?>";
                }
            }
            if (!in_array($match[1], $this->customKeywords)) {
                return "<?php " . $match[1] . ": ?>";
            }
            return false;
        }, $content);
    }

    /**
     * Attempts to match and replace all keywords ending in (end).
     * @param $content
     *
     * @return array|string|null
     */
    public function endMatch($content): array|string|null
    {
        return preg_replace_callback("/@([end]+(.*))/", function ($match) {
            if (in_array($match[1], $this->escapeSemicolon)) {
                return "<?php " . $match[1] . ": ?>";
            }
            return "<?php " . $match[1] . "; ?>";
        }, $content);
    }
}