import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar, Feed, PinDetail, CreatePin, Search } from "../components";

const Pins = () => {
    const [search, setSearch] = useState('')

    return (
        <div>
            Pins
        </div>
    );
};

export default Pins;