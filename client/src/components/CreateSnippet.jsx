import React, { useState ,useEffect} from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_SNIPPET } from '../utils/mutations';



const CreateSnippet = () => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  const [saveSnippet, { error }] = useMutation(SAVE_SNIPPET)





  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the saveSnippet mutation with the snippet data
    const response =   await saveSnippet({
        variables: {
          title: title,
          language: language,
          code: code,
          description: description,
        },
      });
      console.log(response);

      setTitle('');
      setLanguage('');
      setCode('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };





  return (
    <div className="container">
   <div className="card bg-sucess text-center text-black bg-success">
            <div className="card-body ">
              <h5 className="card-title ">Create Snippets </h5>
            </div>
          </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="language" className="form-label">
            Language:
          </label>
          <input
            type="text"
            className="form-control"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="code" className="form-label">
            Code:
          </label>
          <textarea
            className="form-control"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Snippet
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error.message}</div>}
    </div>
  );
};

export default CreateSnippet;
