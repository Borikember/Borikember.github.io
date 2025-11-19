<?php
include('storage.php');

class Movie {
  public $id = NULL;
  public $title = NULL;
  public $year = NULL;

  public function __construct($id, $title, $year) {
    $this->id = $id;
    $this->title = $title;
    $this->year = $year;
  }
}

$movies = [
  '1' => new Movie('1', 'The Shack', 2017),
  '2' => new Movie('2', 'Thor: Ragnarok', 2017),
  '3' => new Movie('3', 'Avatar', 2009),
];

$file_content = serialize($movies);
file_put_contents('movies.txt', $file_content);

$file_content = file_get_contents('movies.txt');
print_r(unserialize($file_content));


$movieStorage = new Storage(io: new SerializeIO('movies.txt'));
$id = $movieStorage->add(
  new Movie(NULL, 'Liza, a rókatündér', 2015));
print_r($movieStorage->findAll());
print_r($movieStorage->findAll(['year' => 2015]));
print_r($movieStorage->findById($id));
print_r($movieStorage->findOne(['year' => 2015]));
print_r($movieStorage->findMany(function ($movie) {
  return strpos($movie->title, 'ide') !== false;
}));

$liza = $movieStorage->findById($id);
$liza->year = 2006;
$movieStorage->update($id, $liza);

$movieStorage->delete($id);