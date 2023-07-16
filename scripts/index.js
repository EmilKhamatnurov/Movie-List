// КОНСТАНТЫ
// Ключь списка фильмов в Local Storage
const STORAGE_LABEL_MOVIES = 'movies';
// Статус просмотра фильма. Просмотрен - checked , не просмотрен - unchecked
const STATUS = {
    viewed: 'viewed',
    not_viewed: 'not_viewed',
};
const CLASSES_BY_STATUS = {
	[STATUS.viewed] : 'checked',
	[STATUS.not_viewed] : 'unchecked',
}
// ЭЛЕМЕНТЫ
// Ссылка на поле ввода фильмов 
const movieInputNode = document.querySelector('#movieInput');
// Ссылка на кнопку добавления фильмов из поля ввода
const newMovieButtonNode = document.querySelector('#newMovieButton');
// Ссылка на HTML-элемент, в который выводится список фильмов
const movieListNode = document.querySelector('#movieList');
// ?
const moviesFormStorageString = localStorage.getItem(STORAGE_LABEL_MOVIES);
// ?
const moviesFormStorage = JSON.parse(moviesFormStorageString);

// Массив объектов фильмов 
let movies = [];
// Проверяем, есть ли в памяти фильмы. Если есть - записываем
if(Array.isArray(moviesFormStorage)) {
	movies = moviesFormStorage;
}

const init = () => renderMovieList(movies);

const addMovie = () => {
	if (!checkInput()) { 
        return
    }
    addToMovieList();
    saveMoviesToLocal(movies);
	renderMovieList(movies);
	clearMovieInput();
	switchFocusToMovieInput();
};

const checkInput = () => {
	if(!movieInputNode.value.trim()) {
		renderError("Неправильно заполненное поле");
		return false
	}
	return true;
};

const addToMovieList = () => {
	const newMovie = getMovieFromUser();
    movies.unshift(newMovie);
};

function saveMoviesToLocal(movies) {
	const moviesString = JSON.stringify(movies);
	localStorage.setItem(STORAGE_LABEL_MOVIES, moviesString);
};

const getMovieFromUser = () => { 
    return new Movie(movieInputNode.value, getCurrentDate(), STATUS.not_viewed);
};

const renderMovieList = (movie_list) => {
	let movieMarkup = '';
	movie_list.forEach((movie, index) => {
		if (!movie) {
			renderError("Йоооооу");
			return
		}
		movieMarkup += `    
		<div class="movie" data-check="check_${index}">
			<div>
				<input type="checkbox" id="check_${index}" class="check-btn" name="check_${index}" >
				<label class="movie-label" for="check_${index}">${movie.name}</label>
			</div>
			<button" class="movie-delete-btn">
				<img data-movie="${index}" src="../resources/delete-movie-btn-image.svg" alt="кнопка удаления фильма">
			</button>
		</div>`;
	});
	(movie_list.length == 0) ? 
		movieListNode.innerHTML = 'Фильмов нет, так что иди работай...' : 
		movieListNode.innerHTML = movieMarkup;
};

function Movie(name, date, status){
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

// Удаление фильма
const deleteMovie = (movie_index) => {
	movies.splice(movie_index,1);
	saveMoviesToLocal(movies);
	renderMovieList(movies);
};

// загружаем траты в помять браузера через LocalStorage
const clearMovieInput = () => movieInputNode.value = '';
const switchFocusToMovieInput = () => movieInputNode.focus();
// Рендер сообщения об ошибке
const renderError = (message_error) => console.error(`${message_error}`);

init()
// ОТРАБОТЧИК 
newMovieButtonNode.addEventListener('click', addMovie);

movieListNode.addEventListener('click', function(e){
	(e.target.tagName === 'IMG') ? deleteMovie(e.target.movie) : "";
	(e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') ? "" : ""
});

