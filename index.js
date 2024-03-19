const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://anyxouliokeebiczikkc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueXhvdWxpb2tlZWJpY3ppa2tjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ1NjYzMzMsImV4cCI6MjAyMDE0MjMzM30.UQuQPUrI3J0a6750lYEggSNZ9F4gGyLUl3XPQvub18A'
);
// const STORAGE_BUCKET = 'Posters';

async function getFilmes() {
  let filmes = { data: Filmes, error } = await supabase
    .from('Filmes')
    .select('*')
  return filmes.data;
}

async function getPesquisaFilmes(filme) {
  let filmes = { data: Filmes, error } = await supabase
    .from('Filmes')
    .select('*')
    .ilike('Filme', `%${filme}%`)
  return filmes.data;
}

async function getFilmesPreferidosUsuario(lista) {
  let filmes = { data: Filmes, error } = await supabase
    .from('Filmes')
    .select('*')
    .in('id', lista)
  return filmes.data;
}

async function getFilme(filme) {
  let filmes = { data: Filmes, error } = await supabase
    .from('Filmes')
    .select('*')
    .like('Filme', filme)
  return filmes.data;
}


async function getUltimosFilmesAdicionados() {
  let filmes = { data: Filmes, error } = await supabase
    .from('Filmes')
    .select('*')
    .order('id', { ascending: false })
    .limit(10)
  return filmes.data;
}

module.exports = {
  getFilmes, getFilme, getUltimosFilmesAdicionados, getPesquisaFilmes,getFilmesPreferidosUsuario
}
