// КОНСТАНТЫ
// Ключь списка фильмов в Local Storage
const STORAGE_LABEL_MOVIES = 'movies';
// Статус просмотра фильма. Просмотрен - checked , не просмотрен - unchecked
const STATUSES = {
    checked: true,
    unchecked: false,
};
// ЭЛЕМЕНТЫ
// Ссылка на поле ввода фильмов 
const movieInputNode = document.querySelector('#movieInput');
// Ссылка на кнопку добавления фильмов из поля ввода
const newMovieButtonNode = document.querySelector('#newMovieButton');

// Массив объектов фильмов  
let movies = [
	//Массив, который хранит в себе список фильмов. Формат:
	// {
	// name: "Attack on Titan",
	// date: "00.00.0000 00:00",
    // status: checked / unchecked,
	// },
];
const moviesFormStorageString = localStorage.getItem(STORAGE_LABEL_MOVIES);
const moviesFormStorage = JSON.parse(moviesFormStorageString);

// Проверяем, есть ли в памяти фильмы. Если есть - записываем
if(Array.isArray(moviesFormStorage)) {
	movies = moviesFormStorage;
}

const getMovieFromUser = () => { 
    if (!checkInput()) {
        renderError(); 
        return
    }
    return new Movie(movieInputNode.value, getCurrentDate(), STATUSES.unchecked);
};

function Movie (name, date, status){
	this.name = name;
	this.date = date;
	this.status = status;
};

const getCurrentDate = () => {
    const date = new Date();
    
    return date.toLocaleString('ru-RU', {
		day: 'numeric', 
		month: 'numeric', 
		year: 'numeric'}) + 
		' ' + 
		date.toLocaleString('ru-RU', {
		hour: 'numeric', 
		minute: 'numeric', 
		second: 'numeric'});
};

const checkInput = () => {
    
	if(!movieInputNode.value.trim()) {
		renderError("emptyInputError", 0);
		return false
	}
	return true;
};

const addMovie = () => {
    const newMovie = getMovieFromUser();
    movies.unshift(newMovie);
    console.log(movies);
    saveMoviesToLocal(movies);
};

// загружаем траты в помять браузера через LocalStorage
function saveMoviesToLocal(movies) {
	const moviesString = JSON.stringify(movies);
	localStorage.setItem(STORAGE_LABEL_MOVIES, moviesString);
};

const renderError = () => console.log('error');
newMovieButtonNode.addEventListener('click', addMovie);
/*
getFU
date
status?
push

sort
render

focus

!!validation

*/