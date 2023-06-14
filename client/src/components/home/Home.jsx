import React from 'react';
import './home.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import homeImage from '../../assets/homeimage-removebg-preview.png';

export default function Home() {
  return (
    <div className="">
      <div className="container homecontainer mt-5  ">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 ">
            <Card.Img src={homeImage} alt="Code Snippet Management" className="img-fluid" />
          </div>
          <div className="col-12 col-md-6 text-start mt-5 mb-5 ">
            <div className="">
              <div className="card-body">
                <h2 className="card-title text-center mb-3 text-success">Code Snippet Manager</h2>
                <p className="card-text">
                  Welcome to Code Snippet Manager, the ultimate tool for organizing and storing your code snippets. Whether you're a developer, designer, or hobbyist, our app will help you keep your code snippets organized and easily accessible.
                </p>
            
                <p className="card-text">
                  Start managing your code snippets today and experience the benefits of an organized and efficient coding workflow. Sign up or log in to get started!
                </p>
                <div className="text-center">
                <Button variant="primary" href="/signup" >Get Started</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
