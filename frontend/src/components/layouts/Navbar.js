import React from 'react';
import "./Navbar.css"


export default function Navbar() {


    return (
        <div class="top-nav">
        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
                <a class="navbar-brand" href="/home">Hotel Elite.</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link"  href="/cusreg">Register</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/cuslogin">Login</a>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
        </div>
    )

}
