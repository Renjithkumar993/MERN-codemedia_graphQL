import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { REMOVE_SNIPPET, EDIT_SNIPPET } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { Button, Modal } from 'react-bootstrap';

export default function MySnippets() {
  const [removeSnippet] = useMutation(REMOVE_SNIPPET);
  const [editSnippet] = useMutation(EDIT_SNIPPET);
const [snippetid,setsnippetid]=useState(0)

  const { loading, data } = useQuery(GET_ME);
  const mySnippets = data?.me?.savedSnippets;

  const [modalCode, setModalCode] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false); // Track copy action
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (snippetID) => {
    try {
      const { data } = await removeSnippet({
        variables: { snippetID },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewCode = (code,id) => {
    setModalCode(code);
    setShowModal(true);
    setsnippetid(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalCode('');
    setIsCopied(false); 
    setIsEditing(false); 
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(modalCode);
    setIsCopied(true); // Set copied state to true
  };

  const handleEditSnippet = () => {
    setIsEditing(true);
  };

  const handleUpdateSnippet = async (event) => {
    event.preventDefault()
    try {
      const { data } = await editSnippet({
        variables: {
          snippetID: snippetid,
          code: modalCode,
        },
      });
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCodeChange = (event) => {
    setModalCode(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="div">
            <h3 className="card text-center p-3 bg-success">My Snippets</h3>
          </div>
          <div className="row">
            {mySnippets ? (
              mySnippets.map((snippet) => (
                <div key={snippet._id} className="col-md-4 mb-4">
                  <div className="card bg-warning">
                    <div className="card-body">
                      <h5 className="card-title">{snippet.language}</h5>
                      <p className="card-text">{snippet.title}</p>
                      <p className="card-text">{snippet.description}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleViewCode(snippet.code,snippet._id)}
                      >
                        View Code
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(snippet._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Snippets Yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Code Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Snippet Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <textarea
              className="form-control"
              rows={10}
              value={modalCode}
              onChange={handleCodeChange}
            />
          ) : (
            <pre>{modalCode}</pre>
          )}
        </Modal.Body>
        <Modal.Footer>
  
          {!isEditing ? (
            <Button variant="secondary" onClick={handleEditSnippet}>
              Edit Code
            </Button>
          ) : (
            <Button variant="primary" onClick={handleUpdateSnippet}>
              Update Code
            </Button>
          )}

          <Button variant="primary" onClick={handleCopyCode}>
            {isCopied ? 'Copied' : 'Copy'}
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
