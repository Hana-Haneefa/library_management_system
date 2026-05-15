import { useState } from "react";
import axios from "axios";

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publisher: "",
    year: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <div>
      <form className="max-w-md mx-auto p-4 bg-white rounded shadow grid gap-4 grid-cols-2">
        <p>Title:</p>
        <input type="text" placeholder="Title" />
        <p>Author:</p>
        <input type="text" placeholder="Author" />
        <p>ISBN:</p>
        <input type="text" placeholder="ISBN" />
        <p>Genre:</p>
        <input type="text" placeholder="Genre" />
        <p>Publisher:</p>
        <input type="text" placeholder="Publisher" />
        <p>Publication Year:</p>
        <input type="text" placeholder="Publication Year" />
        <p>Quantity of Books:</p>
        <input type="text" placeholder="Quantity of books" />
      </form>
    </div>
  );
}

export default AddBookForm;
