function main() {

    /* 
        Fetch API dari BookData Web Server
    */

    const baseURL = "https://bookdataserver.herokuapp.com/";

    // Mengambil data buku yang ada pada web server
    const getBook = () => {
        fetch(`${baseURL}/api/books`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.error){
                    showResponseMessage(responseJson.messages);
                } else{
                    renderAllBooks(responseJson.books);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
    };

    // Memasukkan data buku ke database dari data input pengguna
    const insertBook = (book) => {
        fetch(`${baseURL}/api/books`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": "12345"
            },
            body: JSON.stringify(book)
        })
        .then(response =>{
            return response.json();
        })
        .then(responseJson => {
            showResponseMessage(responseJson.messages);
            getBook();
        })
        .catch(error =>{
            showResponseMessage(error);
        })
    };

    // Mengupdate data buku pada database dari 
    const updateBook = (book) => {
        fetch(`${baseURL}/api/books/${book.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": "12345"
            },
            body: JSON.stringify(book)
        })
        .then(response =>{
            return response.json();
        })
        .then(responseJson =>{
            showResponseMessage(responseJson.messages);
            getBook();
        })
        .catch(error =>{
            showResponseMessage(error);
        })
    };

    // Mengahapus data buku dari database berdasarkan id
    const removeBook = (bookId) => {
        fetch(`${baseURL}/api/books/${bookId}`, {
            method: "DELETE",
            headers: {
                "X-Auth-Token": "12345"
            }
        })
        .then(response =>{
            return response.json();
        })
        .then(responseJson =>{
            showResponseMessage(responseJson.messages);
            getBook();
        })
        .catch(error =>{
            showResponseMessage(error);
        })
    };

    /* 
        Proses data dari API
    */

    // Menampilkan list buku dari data yang diterima dari API ke dalam bentuk komponen HTML
    const renderAllBooks = (books) => {
        // Menampilkan Box beserta elemen item 
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";
        
        books.forEach(book => {
            listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Membuat tombol delete pada setiap box buku
        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                removeBook(bookId);
            })
        })
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    // menambahkan action untuk setiap elemen
    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");

        buttonSave.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });
        getBook();

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.disabled = true;
        })

    });
}

export default main;
