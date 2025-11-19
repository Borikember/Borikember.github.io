<?php
include('storage.php');

function save_movies_to_file() {
  $movies = [
    '1' => [
      'id'    => '1',
      'title' => 'The Shack',
      'year'  => 2017,
    ],
    '2' => [
      'id'    => '2',
      'title' => 'Thor: Ragnarok',
      'year'  => 2017,
    ],
    '3' => [
      'id'    => '3',
      'title' => 'Avatar',
      'year'  => 2009,
    ],
  ];
  
  $file_content = json_encode($movies, JSON_PRETTY_PRINT);
  file_put_contents('movies.json', $file_content);
  
  $file_content = file_get_contents('movies.json');
  print_r(json_decode($file_content, true));
}

function add_movie() {
  $io = new JsonIO('movies.json');
  // print_r($io->load());
  $movies = $io->load();
  $id = uniqid();
  $movies[$id] = [
    'id'    => $id,
    'title' => 'Pride and Prejudice',
    'year'  => 1995,
  ];
  $io->save($movies);
}

function liza_crud() {
  $movieStorage = new Storage(new JsonIO('movies.json'));
  $id = $movieStorage->add([
    'title' => 'Liza, a rókatündér',
    'year'  => 2015,
  ]);
  print_r($movieStorage->findAll());
  print_r($movieStorage->findAll(['year' => 2015]));
  print_r($movieStorage->findById($id));
  print_r($movieStorage->findOne(['year' => 2015]));
  print_r($movieStorage->findMany(function ($movie) {
    return strpos($movie['title'], 'ide') !== false;
  }));
  
  $liza = $movieStorage->findById($id);
  $liza['year'] = 2006;
  $movieStorage->update($id, $liza);
  
  $movieStorage->delete($id);
}

class MovieStorage extends Storage {
  public function __construct() {
    parent::__construct(new JsonIO('movies.json'));
  }
  public function findByTitleContaining($part) {
    return $this->findMany(function ($movie) use ($part) {
      return strpos($movie['title'], $part) !== false;
    });
  }
}
$movieStorage = new MovieStorage();
print_r($movieStorage->findAll());
print_r($movieStorage->findByTitleContaining('iza'));