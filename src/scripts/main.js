function main() {

    /* 
        Fetch API dari BookData Web Server
    */

    const baseURL = "https://bookdataserver.herokuapp.com/";

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

    // const renderPage = () => {
    //     const navbarElement = document.querySelector("#NavBar");
    //     navbarElement.innerHTML = `
    //         <nav class="navbar navbar-dark bg-booksite">
    //             <span class="navbar-brand"><img class="logo" src="src\image\Logo_BookSite_navbar.png"></span>
    //             <a class="sign-out" href="#" onclick="signOut();">Sign out</a>
    //         </nav>
    //     `;

    //     const BoxElement = document.querySelector("#");
    //     BoxElement.innerHTML = `
    //         <div class="col-12">
    //             <div class="card">
    //                 <div class="card-header">
    //                     <h5 class="card-title">Input Buku</h5>
    //                 </div>
    //                 <div class="card-body">
    //                     <div class="form-group">
    //                         <label for="inputBookId">ID Buku</label>
    //                         <input id="inputBookId" type="number" class="form-control" placeholder="ID Buku">
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="inputBookTitle">Judul Buku</label>
    //                         <input id="inputBookTitle" type="text" class="form-control" placeholder="Judul Buku">
    //                     </div>
    //                     <div class="form-group">
    //                         <label for="inputBookAuthor">Pengarang</label>
    //                         <input id="inputBookAuthor" type="text" class="form-control" placeholder="Pengarang">
    //                     </div>
    //                     <div class="form-group">
    //                         <button id="buttonSave" class="btn btn-success">Save</button>
    //                         <button id="buttonUpdate" class="btn btn-primary">Update</button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     `;
    // }

    const renderAllBooks = (books) => {
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
