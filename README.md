# audit-urls

## cli

```
Usage: audit-urls audit-urls [option]... [file]...
  With no file(s), or when file is -, read standard input.

Get and display url status(es) to standard output.

Options:
  -V, --version  output the version number
  -v, --verbose  display all url statuses
  -h, --help     display help for command

Examples:
  audit-urls urls1.txt urls2.txt
  echo "https://johnteskemusic.com invalid_url" | audit-urls
  echo "https://johnteskemusic.com invalid_url" | audit-urls -


```
