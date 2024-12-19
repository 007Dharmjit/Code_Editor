export const LANGUAGES = {
  js: {
    name: "JS file",
    language: "javascript",
    language_version: "18.15.0",
    value: `// Hello World in JavaScript
      console.log("Hello, World!");`,
  },
  c: {
    name: "C file",
    language: "c",
    language_version: "10.2.0",
    value: `#include <stdio.h>
      int main() {
          printf("Hello, World!\\n");
          return 0;
      }`,
  },
  cpp: {
    name: "C++ file",
    language: "c++",
    language_version: "10.2.0",
    value: `#include <iostream>
      using namespace std;
      int main() {
          cout << "Hello, World!" << endl;
          return 0;
      }`,
  },
  matl: {
    name: "MATL file",
    language: "matl",
    language_version: "22.7.4",
    value: `// Hello World in MATL (example code depends on actual syntax)`,
  },
  sh: {
    name: "Shell file",
    language: "bash",
    language_version: "5.2.0",
    value: `# Hello World in Bash
echo "Hello, World!"`,
  },
  b93: {
    name: "Befunge93 file",
    language: "befunge93",
    language_version: "0.2.0",
    value: `// Hello World in Befunge93`,
  },
  bqn: {
    name: "BQN file",
    language: "bqn",
    language_version: "1.0.0",
    value: `// Hello World in BQN`,
  },
  brachylog: {
    name: "Brachylog file",
    language: "brachylog",
    language_version: "1.0.0",
    value: `// Hello World in Brachylog`,
  },
  bf: {
    name: "Brainfuck file",
    language: "brainfuck",
    language_version: "2.7.3",
    value: `// Hello World in Brainfuck`,
  },
  cjam: {
    name: "CJam file",
    language: "cjam",
    language_version: "0.6.5",
    value: `// Hello World in CJam`,
  },
  clj: {
    name: "Clojure file",
    language: "clojure",
    language_version: "1.10.3",
    value: `// Hello World in Clojure
(println "Hello, World!")`,
  },
  cob: {
    name: "COBOL file",
    language: "cobol",
    language_version: "3.1.2",
    value: `// Hello World in COBOL`,
  },
  coffee: {
    name: "CoffeeScript file",
    language: "coffeescript",
    language_version: "2.5.1",
    value: `# Hello World in CoffeeScript
console.log "Hello, World!"`,
  },
  cow: {
    name: "Cow file",
    language: "cow",
    language_version: "1.0.0",
    value: `// Hello World in Cow`,
  },
  cr: {
    name: "Crystal file",
    language: "crystal",
    language_version: "0.36.1",
    value: `// Hello World in Crystal
puts "Hello, World!"`,
  },
  dart: {
    name: "Dart file",
    language: "dart",
    language_version: "2.19.6",
    value: `// Hello World in Dart
void main() {
  print("Hello, World!");
}`,
  },
  deno_ts: {
    name: "TypeScript file",
    language: "typescript",
    language_version: "5.0.3",
    value: `// Hello World in TypeScript
console.log("Hello, World!");`,
  },
  deno_js: {
    name: "JavaScript file",
    language: "javascript",
    language_version: "18.15.0",
    value: `// Hello World in JavaScript
console.log("Hello, World!");`,
  },
  vb: {
    name: "Visual Basic file",
    language: "basic.net",
    language_version: "5.0.201",
    value: `// Hello World in Visual Basic`,
  },
  fs: {
    name: "F# file",
    language: "fsharp.net",
    language_version: "5.0.201",
    value: `// Hello World in F#`,
  },
  cs: {
    name: "C# file",
    language: "csharp.net",
    language_version: "5.0.201",
    value: `// Hello World in C#`,
  },
  exs: {
    name: "Elixir file",
    language: "elixir",
    language_version: "1.11.3",
    value: `# Hello World in Elixir
IO.puts "Hello, World!"`,
  },
  erl: {
    name: "Erlang file",
    language: "erlang",
    language_version: "23.0.0",
    value: `// Hello World in Erlang
io:format("Hello, World!~n").`,
  },
  go: {
    name: "Go file",
    language: "go",
    language_version: "1.16.2",
    value: `// Hello World in Go
package main
import "fmt"
func main() {
  fmt.Println("Hello, World!")
}`,
  },
  hs: {
    name: "Haskell file",
    language: "haskell",
    language_version: "9.0.1",
    value: `-- Hello World in Haskell
main = putStrLn "Hello, World!"`,
  },
  kt: {
    name: "Kotlin file",
    language: "kotlin",
    language_version: "1.8.20",
    value: `// Hello World in Kotlin
fun main() {
  println("Hello, World!")
}`,
  },
  ml: {
    name: "OCaml file",
    language: "ocaml",
    language_version: "4.12.0",
    value: `(* Hello World in OCaml *)
print_endline "Hello, World!";`,
  },
  py: {
    name: "Python file",
    language: "python",
    language_version: "3.10.0",
    value: `# Hello World in Python
print("Hello, World!")`,
  },
  pl: {
    name: "Perl file",
    language: "perl",
    language_version: "5.36.0",
    value: `# Hello World in Perl
print "Hello, World!\n";`,
  },
  php: {
    name: "PHP file",
    language: "php",
    language_version: "8.2.3",
    value: `<?php
// Hello World in PHP
echo "Hello, World!";
?>`,
  },
  rb: {
    name: "Ruby file",
    language: "ruby",
    language_version: "3.0.1",
    value: `# Hello World in Ruby
puts "Hello, World!"`,
  },
  rs: {
    name: "Rust file",
    language: "rust",
    language_version: "1.68.2",
    value: `// Hello World in Rust
fn main() {
  println!("Hello, World!");
}`,
  },
  swift: {
    name: "Swift file",
    language: "swift",
    language_version: "5.3.3",
    value: `// Hello World in Swift
print("Hello, World!")`,
  },
  ts: {
    name: "TypeScript file",
    language: "typescript",
    language_version: "5.0.3",
    value: `// Hello World in TypeScript
console.log("Hello, World!");`,
  },
  zig: {
    name: "Zig file",
    language: "zig",
    language_version: "0.10.1",
    value: `// Hello World in Zig`,
  },
};
