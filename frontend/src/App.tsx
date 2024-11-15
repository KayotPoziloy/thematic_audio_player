import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
// import {DropdownMenu, DropdownMenuFavourites} from "./components/DropdownMenu";

function App() {
    return (
        <>
            <Router>
                <div className="bg-image vh-100"><img src="https://s3-alpha-sig.figma.com/img/aeb1/38cf/3db26d856eed749d1ad0865121cfd83e?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fbtBZKt0bVHe0qGEW2O26vcXfENt-VNiuy8R2OnXA6XxptM3rfPaAecm1ZyWgODkgN4LGwK2jf3FX9Sq2qtXLRCsFcHwJNgNmnB1zHzidLMN4dbUWgNFW5lwNXXXLPTBfL1zAiAD9d9XUyseqspbn-vRl3mB01lVfjTJmAHoe2umtt-4Ifn7iCpq2kgH8Z5s8B1tN-748qRFhKhyfCbImALJgN41RLPYpfQAqnoigkCzNR3d8cAmM8BH96UgqXp9K-m9zUSZ4PH8NudO-wxlj4TahXG76ANtTCz1X3SxJtTks9HLxKS2ggIJZPLYum7wBGpnqY7hVs9uceADBLfe-Q__" alt="фон"/></div>
                <div className="app d-flex flex-column vh-100">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </Router>
        </>
    );
}

export default App;
